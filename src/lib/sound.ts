// Procedural sound engine. One shared AudioContext, blips synthesized on the
// fly (no asset files). Mute is read through localStorage so every island and
// the global script agree without a shared React tree. The voice is an FM bell
// — bright, ringy, arcade-ish.

const MUTED_KEY = "arikko:sound-muted";
const CHANGE_EVENT = "arikko:sound-change";

const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0];

type Note = {
  freq: number;
  freqEnd?: number; // pitch glides here over the note (the "pop")
  duration?: number;
  gain?: number;
  offset?: number;
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private hoverMql: MediaQueryList | null = null;

  constructor() {
    if (typeof window === "undefined") return;

    this.hoverMql = window.matchMedia("(hover: hover) and (pointer: fine)");

    const unlock = () => this.ensureContext();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    window.addEventListener("storage", (e) => {
      if (e.key === MUTED_KEY) this.emit();
    });
  }

  isMuted(): boolean {
    try {
      const value = localStorage.getItem(MUTED_KEY);
      return value === null ? true : value === "true"; // off until opted in
    } catch {
      return true;
    }
  }

  setMuted(value: boolean) {
    try {
      localStorage.setItem(MUTED_KEY, String(value));
    } catch {}
    this.emit();
  }

  toggle() {
    const next = !this.isMuted();
    this.setMuted(next);
    if (!next) this.toggleOn();
  }

  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    window.addEventListener(CHANGE_EVENT, listener);
    return () => window.removeEventListener(CHANGE_EVENT, listener);
  }

  private emit() {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }

  private ensureContext(): AudioContext | null {
    if (this.ctx) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    }
    const Ctor =
      window.AudioContext || (window as unknown as any).webkitAudioContext;
    if (!Ctor) return null;

    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.16;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  private canHover(): boolean {
    return this.hoverMql?.matches ?? false;
  }

  // FM bell: sine carrier with a quick upward glide, a modulator for the
  // metallic tone, and a faint high partial for sparkle.
  private blip(at: number, n: Note) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;

    const { freq, freqEnd, duration = 0.08, gain = 0.4 } = n;
    const dur = Math.max(duration * 1.5, 0.13);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.linearRampToValueAtTime(gain, at + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    const car = ctx.createOscillator();
    car.type = "sine";
    car.frequency.setValueAtTime(freq * 0.94, at);
    car.frequency.exponentialRampToValueAtTime(
      freqEnd ?? freq,
      at + Math.min(0.04, dur),
    );

    const mod = ctx.createOscillator();
    mod.type = "sine";
    mod.frequency.value = freq * 2;
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(freq * 1.1, at);
    modGain.gain.exponentialRampToValueAtTime(1, at + dur);
    mod.connect(modGain).connect(car.frequency);

    const part = ctx.createOscillator();
    part.type = "square";
    part.frequency.value = freq * 3;
    const partGain = ctx.createGain();
    partGain.gain.value = 0.05;

    car.connect(env);
    part.connect(partGain).connect(env);
    env.connect(master);

    car.start(at);
    mod.start(at);
    part.start(at);
    car.stop(at + dur + 0.05);
    mod.stop(at + dur + 0.05);
    part.stop(at + dur + 0.05);
  }

  // resume() is async; checking state synchronously after it would drop the
  // first sound following a browser auto-suspend, so render inside the promise.
  // resume only settles inside a real gesture, keeping pre-gesture hovers quiet.
  private schedule(render: (now: number) => void) {
    if (this.isMuted()) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    if (ctx.state === "running") render(ctx.currentTime);
    else
      ctx
        .resume()
        .then(() => render(ctx.currentTime))
        .catch(() => {});
  }

  private seq(notes: Note[]) {
    this.schedule((now) => {
      for (const n of notes) this.blip(now + (n.offset ?? 0), n);
    });
  }

  handFold() {
    if (!this.canHover()) return;
    this.seq([
      { freq: 659.25, freqEnd: 494, duration: 0.07, gain: 0.3 },
      { freq: 440, duration: 0.08, gain: 0.26, offset: 0.05 },
    ]);
  }

  handUnfurl() {
    if (!this.canHover()) return;
    this.seq([
      { freq: 523.25, duration: 0.07, gain: 0.34 },
      { freq: 659.25, duration: 0.07, gain: 0.34, offset: 0.06 },
      { freq: 783.99, duration: 0.07, gain: 0.34, offset: 0.12 },
      { freq: 1046.5, duration: 0.09, gain: 0.36, offset: 0.18 },
      { freq: 1318.51, freqEnd: 880, duration: 0.12, gain: 0.4, offset: 0.22 },
    ]);
  }

  reveal() {
    this.seq([
      { freq: 659.25, duration: 0.06, gain: 0.32 },
      { freq: 880, duration: 0.06, gain: 0.32, offset: 0.05 },
      { freq: 1046.5, duration: 0.07, gain: 0.34, offset: 0.1 },
    ]);
  }

  // Pitch climbs the pentatonic by row index, so sweeping the list ratchets.
  detent(index: number) {
    if (!this.canHover()) return;
    const len = PENTATONIC.length;
    const octave = Math.pow(2, Math.floor(index / len));
    const freq = PENTATONIC[index % len] * octave;
    this.seq([{ freq, freqEnd: freq * 0.84, duration: 0.05, gain: 0.32 }]);
  }

  open() {
    this.seq([
      { freq: 523.25, duration: 0.06, gain: 0.32 },
      { freq: 783.99, duration: 0.08, gain: 0.34, offset: 0.05 },
    ]);
  }

  close() {
    this.seq([
      { freq: 783.99, duration: 0.06, gain: 0.32 },
      { freq: 523.25, duration: 0.08, gain: 0.3, offset: 0.05 },
    ]);
  }

  hoverTick() {
    if (!this.canHover()) return;
    this.seq([{ freq: 880, duration: 0.04, gain: 0.16 }]);
  }

  nav() {
    this.seq([
      { freq: 659.25, duration: 0.06, gain: 0.34 },
      { freq: 987.77, duration: 0.08, gain: 0.34, offset: 0.05 },
    ]);
  }

  toggleOn() {
    const ladder = [523.25, 659.25, 783.99, 1046.5];
    this.seq(
      ladder.map((freq, i) => ({
        freq,
        duration: 0.08,
        gain: 0.32,
        offset: i * 0.05,
      })),
    );
  }
}

export const sound = new SoundEngine();
