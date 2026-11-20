import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Slider } from "@base-ui/react/slider";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useHotkey } from "@tanstack/react-hotkeys";
import {
  Group,
  Panel,
  Separator,
  useDefaultLayout,
} from "react-resizable-panels";
import { useHistory } from "../../hooks/use-history";
import { cn } from "../../lib/classname";
import { clamp } from "../../lib/math";
import {
  drawGradient,
  drawMesh,
  getStops,
  hexToHsl,
  hslToHex,
  meshColor,
  type Bezier,
  type ColorSpace,
  type MeshPoint,
} from "../../lib/gradient";

const palettes = [
  ["#1d4ed8", "#f472b6", "#fde68a"],
  ["#0f172a", "#7c3aed", "#f0abfc"],
  ["#ff5f6d", "#ffc371"],
  ["#00c6ff", "#0072ff", "#1e1b4b"],
  ["#134e4a", "#34d399", "#ecfccb"],
  ["#fb7185", "#a855f7", "#3b82f6", "#22d3ee"],
];

const positions = [
  [0.2, 0.2],
  [0.8, 0.25],
  [0.75, 0.8],
  [0.25, 0.75],
  [0.5, 0.5],
  [0.5, 0.12],
  [0.88, 0.55],
  [0.12, 0.5],
];

const maxPoints = positions.length;

const easingPresets: Record<string, Bezier> = {
  Linear: [0, 0, 1, 1],
  In: [0.42, 0, 1, 1],
  Out: [0, 0, 0.58, 1],
  "In Out": [0.42, 0, 0.58, 1],
};

const easingOptions = Object.keys(easingPresets).map((name) => ({
  value: name,
  label: name,
}));

const types: { value: "linear" | "mesh"; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "mesh", label: "Mesh" },
];

const spaces: { value: ColorSpace; label: string }[] = [
  { value: "oklch", label: "Oklch" },
  { value: "oklab", label: "Oklab" },
  { value: "rgb", label: "RGB" },
];

const ratios = [
  { value: "1:1", label: "1:1 Post", w: 1, h: 1 },
  { value: "4:5", label: "4:5 Portrait", w: 4, h: 5 },
  { value: "9:16", label: "9:16 Story", w: 9, h: 16 },
  { value: "16:9", label: "16:9 Video", w: 16, h: 9 },
  { value: "1.91:1", label: "1.91:1 Link", w: 1.91, h: 1 },
  { value: "3:2", label: "3:2", w: 3, h: 2 },
  { value: "4:3", label: "4:3", w: 4, h: 3 },
  { value: "21:9", label: "21:9", w: 21, h: 9 },
];

const resolutions = [
  { value: "1080", label: "1080p", edge: 1920 },
  { value: "2k", label: "2K", edge: 2560 },
  { value: "4k", label: "4K", edge: 3840 },
  { value: "8k", label: "8K", edge: 7680 },
];

const formats = [
  { value: "png", label: "PNG" },
  { value: "jpg", label: "JPG" },
];

function withPositions(colors: string[], points: MeshPoint[] = []) {
  return colors.map((color, i) => {
    const [x, y] = positions[i];
    return { ...(points[i] ?? { x, y }), color };
  });
}

function fitRatio(ratio: { w: number; h: number }, edge: number) {
  return ratio.w >= ratio.h
    ? [edge, Math.round((edge * ratio.h) / ratio.w)]
    : [Math.round((edge * ratio.w) / ratio.h), edge];
}

function presetName(bezier: Bezier) {
  return Object.keys(easingPresets).find((name) =>
    easingPresets[name].every((value, i) => value === bezier[i]),
  );
}

function readSettings() {
  const params = new URLSearchParams(location.hash.slice(1));
  const colors = (params.get("colors") ?? "")
    .split(",")
    .filter((hex) => /^[0-9a-f]{6}$/i.test(hex))
    .map((hex) => `#${hex.toLowerCase()}`)
    .slice(0, maxPoints);
  const spots = (params.get("pos") ?? "")
    .split(",")
    .map((pair) => pair.split("-").map(Number));
  const curve = (params.get("easing") ?? "").split(",").map(Number);
  const precision = Number(params.get("precision"));
  const angle = Number(params.get("angle"));
  const softness = Number(params.get("softness"));

  function pick<T extends string>(key: string, options: { value: T }[]) {
    const value = params.get(key);
    return (
      options.find((option) => option.value === value)?.value ??
      options[0].value
    );
  }

  const points = withPositions(colors.length >= 2 ? colors : palettes[0]).map(
    (point, i) => {
      const [x, y] = spots[i] ?? [];
      return Number.isFinite(x) && Number.isFinite(y)
        ? { ...point, x: clamp(x / 100, [0, 1]), y: clamp(y / 100, [0, 1]) }
        : point;
    },
  );

  return {
    type: pick("type", types),
    points,
    space: pick("space", spaces),
    easing:
      curve.length === 4 && curve.every(Number.isFinite)
        ? (curve.map((value) => clamp(value, [0, 1])) as Bezier)
        : easingPresets.Linear,
    precision:
      params.has("precision") && Number.isInteger(precision)
        ? clamp(precision, [1, 20])
        : 8,
    angle:
      params.has("angle") && Number.isInteger(angle)
        ? clamp(angle, [0, 360])
        : 135,
    softness:
      params.has("softness") && Number.isInteger(softness)
        ? clamp(softness, [0, 100])
        : 50,
    ratio: pick("ratio", ratios),
    size: params.has("size") ? pick("size", resolutions) : "4k",
    format: pick("format", formats),
  };
}

const wideQuery = "(min-width: 768px)";

function subscribeToWidth(callback: () => void) {
  const query = matchMedia(wideQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

type Settings = ReturnType<typeof readSettings>;

type GradientGeneratorProps = {};

export function GradientGenerator(props: GradientGeneratorProps) {
  const {} = props;
  const [initial] = useState(readSettings);
  const timeline = useHistory<Settings>(initial);
  const {
    type,
    points,
    space,
    easing,
    precision,
    angle,
    softness,
    ratio: ratioValue,
    size: resolutionValue,
    format,
  } = timeline.present;
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isWide = useSyncExternalStore(
    subscribeToWidth,
    () => matchMedia(wideQuery).matches,
  );
  const orientation = isWide ? "horizontal" : "vertical";
  const layout = useDefaultLayout({
    id: `gradient-editor-${orientation}`,
    storage: localStorage,
  });

  useHotkey("Mod+Z", timeline.undo, { ignoreInputs: true });
  useHotkey("Mod+Shift+Z", timeline.redo, { ignoreInputs: true });
  useHotkey("Mod+Y", timeline.redo, { ignoreInputs: true });

  const isMesh = type === "mesh";
  const current = Math.min(selected, points.length - 1);
  const active = points[current];
  const [hue, saturation, lightness] = hexToHsl(active.color);
  const stops = getStops(
    points.map((point) => point.color),
    space,
    easing,
    precision,
  );
  const ratio = ratios.find((r) => r.value === ratioValue)!;
  const { edge } = resolutions.find((r) => r.value === resolutionValue)!;
  const [width, height] = fitRatio(ratio, edge);
  const [previewWidth, previewHeight] = fitRatio(ratio, 360);
  const background = `linear-gradient(${angle}deg, ${stops.join(", ")})`;
  const css = `background-image: linear-gradient(\n  ${angle}deg,\n  ${stops.join(",\n  ")}\n);`;

  useEffect(() => {
    const hash = [
      `type=${type}`,
      `colors=${points.map((point) => point.color.slice(1)).join(",")}`,
      `pos=${points.map((point) => `${Math.round(point.x * 100)}-${Math.round(point.y * 100)}`).join(",")}`,
      `space=${space}`,
      `easing=${easing.join(",")}`,
      `precision=${precision}`,
      `angle=${angle}`,
      `softness=${softness}`,
      `ratio=${ratioValue}`,
      `size=${resolutionValue}`,
      `format=${format}`,
    ].join("&");
    history.replaceState(null, "", `#${hash}`);
  }, [
    type,
    points,
    space,
    easing,
    precision,
    angle,
    softness,
    ratioValue,
    resolutionValue,
    format,
  ]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      drawMesh(ctx, previewWidth, previewHeight, points, softness);
    }
  }, [type, points, softness, previewWidth, previewHeight]);

  function update(change: Partial<Settings>) {
    timeline.set((previous) => ({ ...previous, ...change }));
  }

  function updatePoint(index: number, change: Partial<MeshPoint>) {
    timeline.set((previous) => ({
      ...previous,
      points: previous.points.map((point, i) =>
        i === index ? { ...point, ...change } : point,
      ),
    }));
  }

  function addPoint(point: MeshPoint) {
    if (points.length >= maxPoints) return;
    update({ points: [...points, point] });
    setSelected(points.length);
  }

  function removePoint(index: number) {
    if (points.length <= 2) return;
    update({ points: points.filter((_, i) => i !== index) });
    setSelected(
      clamp(current > index ? current - 1 : current, [0, points.length - 2]),
    );
  }

  function positionFrom(event: PointerEvent) {
    const rect = frameRef.current!.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, [0, 1]),
      y: clamp((event.clientY - rect.top) / rect.height, [0, 1]),
    };
  }

  function handleStagePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isMesh) return;
    const { x, y } = positionFrom(event);
    addPoint({
      x,
      y,
      color: meshColor(points, softness, ratio.w / ratio.h, x, y),
    });
  }

  function handlePointKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      removePoint(index);
      return;
    }

    const step = event.shiftKey ? 0.05 : 0.01;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[event.key];
    if (!move) return;

    event.preventDefault();
    const point = points[index];
    updatePoint(index, {
      x: clamp(point.x + move[0], [0, 1]),
      y: clamp(point.y + move[1], [0, 1]),
    });
  }

  function commitHex(value: string) {
    const hex = value.trim().replace(/^#?/, "#").toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(hex)) {
      updatePoint(current, { color: hex });
    }
  }

  async function copyCss() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    setError("");
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Your browser can’t draw this image. Try a lower resolution.");
      return;
    }

    if (isMesh) {
      drawMesh(ctx, width, height, points, softness);
    } else {
      drawGradient(ctx, width, height, angle, stops);
    }

    const mime = format === "png" ? "image/png" : "image/jpeg";
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("This size is too large for your browser. Try 4K or lower.");
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `gradient-${width}x${height}.${format}`;
        link.click();
        URL.revokeObjectURL(url);
      },
      mime,
      0.95,
    );
  }

  return (
    <div className="fixed inset-0 z-99 bg-[#0b0b0c] text-sm text-zinc-200 [color-scheme:dark]">
      <Group
        key={orientation}
        orientation={orientation}
        defaultLayout={layout.defaultLayout}
        onLayoutChanged={layout.onLayoutChanged}
        className="h-full"
      >
        <Panel id="stage" minSize={isWide ? 320 : "30"}>
          <div
            className="relative flex h-full flex-col"
            style={{
              backgroundImage:
                "radial-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="absolute top-3 left-3 z-10">
              <Segmented
                label="Gradient type"
                options={types}
                value={type}
                onChange={(value) => update({ type: value })}
              />
            </div>
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <div className="flex h-8 rounded-lg bg-white/5 p-0.5">
                <IconButton
                  label="Undo"
                  disabled={!timeline.canUndo}
                  onClick={timeline.undo}
                >
                  <UndoIcon />
                </IconButton>
                <IconButton
                  label="Redo"
                  disabled={!timeline.canRedo}
                  onClick={timeline.redo}
                >
                  <UndoIcon className="-scale-x-100" />
                </IconButton>
              </div>
              <span className="flex h-8 items-center rounded-lg bg-white/5 px-2.5 font-mono text-[11px] text-zinc-400 tabular-nums">
                {width} × {height}
              </span>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center px-6 pt-16 pb-3"
              style={{ containerType: "size" }}
            >
              <div
                ref={frameRef}
                onPointerDown={handleStagePointerDown}
                className={cn(
                  "relative rounded-xl shadow-2xl ring-1 shadow-black/50 ring-white/10",
                  isMesh && "cursor-crosshair touch-none",
                )}
                style={{
                  aspectRatio: `${ratio.w} / ${ratio.h}`,
                  width: `min(100cqw, ${ratio.w / ratio.h} * 100cqh)`,
                  backgroundImage: isMesh ? undefined : background,
                }}
              >
                {isMesh && (
                  <>
                    <canvas
                      ref={canvasRef}
                      width={previewWidth}
                      height={previewHeight}
                      className="absolute inset-0 size-full rounded-xl"
                    />
                    {points.map((point, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Point ${i + 1}, ${point.color}`}
                        onPointerDown={(event) => {
                          event.stopPropagation();
                          event.currentTarget.setPointerCapture(
                            event.pointerId,
                          );
                          setSelected(i);
                        }}
                        onPointerMove={(event) => {
                          if (
                            event.currentTarget.hasPointerCapture(
                              event.pointerId,
                            )
                          ) {
                            updatePoint(i, positionFrom(event));
                          }
                        }}
                        onFocus={() => setSelected(i)}
                        onKeyDown={(event) => handlePointKeyDown(event, i)}
                        className={cn(
                          "absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.5),0_2px_8px_rgb(0_0_0/0.4)] transition-[width,height] outline-none active:cursor-grabbing",
                          i === current && "size-6",
                        )}
                        style={{
                          left: `${point.x * 100}%`,
                          top: `${point.y * 100}%`,
                          backgroundColor: point.color,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <p className="pb-4 text-center font-mono text-[11px] text-zinc-500">
              {isMesh
                ? "Click to add a point, drag to move, Delete to remove"
                : `${stops.length} stops · ${angle}°`}
            </p>
          </div>
        </Panel>

        <Separator
          className={cn(
            "bg-white/[0.08] transition-colors data-[separator=active]:bg-white/50 data-[separator=hover]:bg-white/30",
            isWide ? "w-px" : "h-px",
          )}
        />

        <Panel
          id="sidebar"
          defaultSize={isWide ? 280 : "45"}
          minSize={isWide ? 260 : "25"}
          maxSize={isWide ? 560 : "70"}
          groupResizeBehavior="preserve-pixel-size"
        >
          <aside className="flex h-full flex-col bg-[#141416]">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Section title="Color">
                <ColorSlider
                  label="Hue"
                  value={hue}
                  max={360}
                  track={`linear-gradient(to right, ${[
                    0, 60, 120, 180, 240, 300, 360,
                  ]
                    .map((h) => `hsl(${h} ${saturation}% ${lightness}%)`)
                    .join(", ")})`}
                  onChange={(h) =>
                    updatePoint(current, {
                      color: hslToHex(h, saturation, lightness),
                    })
                  }
                />
                <ColorSlider
                  label="Saturation"
                  value={saturation}
                  max={100}
                  track={`linear-gradient(to right, hsl(${hue} 0% ${lightness}%), hsl(${hue} 100% ${lightness}%))`}
                  onChange={(s) =>
                    updatePoint(current, { color: hslToHex(hue, s, lightness) })
                  }
                />
                <ColorSlider
                  label="Lightness"
                  value={lightness}
                  max={100}
                  track={`linear-gradient(to right, hsl(${hue} ${saturation}% 0%), hsl(${hue} ${saturation}% 50%), hsl(${hue} ${saturation}% 100%))`}
                  onChange={(l) =>
                    updatePoint(current, {
                      color: hslToHex(hue, saturation, l),
                    })
                  }
                />
                <div className="flex gap-2">
                  <span
                    className="size-8 shrink-0 rounded-lg ring-1 ring-white/15 ring-inset"
                    style={{ backgroundColor: active.color }}
                  />
                  <input
                    key={`${current}-${active.color}`}
                    defaultValue={active.color}
                    aria-label="Hex color"
                    spellCheck={false}
                    onBlur={(event) => commitHex(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                    className="h-8 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2.5 font-mono text-xs text-zinc-200 uppercase outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  />
                </div>
              </Section>

              <Section
                title={isMesh ? "Points" : "Stops"}
                detail={`${points.length} / ${maxPoints}`}
                action={
                  points.length < maxPoints && (
                    <button
                      type="button"
                      onClick={() =>
                        addPoint({
                          x: positions[points.length][0],
                          y: positions[points.length][1],
                          color: active.color,
                        })
                      }
                      className="rounded-md px-1.5 py-0.5 text-[11px] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      Add
                    </button>
                  )
                }
              >
                <ul className="space-y-0.5">
                  {points.map((point, i) => (
                    <li
                      key={i}
                      className={cn(
                        "group flex items-center rounded-lg pr-1 transition-colors",
                        i === current
                          ? "bg-white/[0.08]"
                          : "hover:bg-white/[0.04]",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(i)}
                        className="flex h-8 min-w-0 flex-1 items-center gap-2.5 rounded-lg pl-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        <span
                          className={cn(
                            "size-4 shrink-0 rounded ring-1 ring-white/20",
                            i === current && "ring-[1.5px] ring-white",
                          )}
                          style={{ backgroundColor: point.color }}
                        />
                        <span className="font-mono text-xs uppercase">
                          {point.color}
                        </span>
                        {isMesh && (
                          <span className="ml-auto pr-1 font-mono text-[11px] text-zinc-600 tabular-nums">
                            {Math.round(point.x * 100)},{" "}
                            {Math.round(point.y * 100)}
                          </span>
                        )}
                      </button>
                      {points.length > 2 && (
                        <button
                          type="button"
                          aria-label={`Remove color ${i + 1}`}
                          onClick={() => removePoint(i)}
                          className={cn(
                            "w-5 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white focus-visible:opacity-100",
                            i === current && "opacity-100",
                          )}
                        >
                          ×
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </Section>

              {!isMesh && (
                <Section title="Easing">
                  <EasingCurve
                    value={easing}
                    stops={stops}
                    onChange={(value) => update({ easing: value })}
                  />
                </Section>
              )}

              <Section title="Blend">
                {isMesh ? (
                  <Range
                    label="Softness"
                    value={softness}
                    min={0}
                    max={100}
                    onChange={(value) => update({ softness: value })}
                  />
                ) : (
                  <>
                    <Segmented
                      label="Color space"
                      options={spaces}
                      value={space}
                      onChange={(value) => update({ space: value })}
                    />
                    <Range
                      label="Angle"
                      value={angle}
                      min={0}
                      max={360}
                      suffix="°"
                      onChange={(value) => update({ angle: value })}
                    />
                    <Range
                      label="Precision"
                      value={precision}
                      min={1}
                      max={20}
                      onChange={(value) => update({ precision: value })}
                    />
                  </>
                )}
                <div className="grid grid-cols-6 gap-1.5">
                  {palettes.map((palette) => (
                    <button
                      key={palette.join()}
                      type="button"
                      aria-label={`Use preset ${palette.join(", ")}`}
                      onClick={() => {
                        update({ points: withPositions(palette, points) });
                        setSelected(0);
                      }}
                      className="aspect-square rounded-lg ring-1 ring-white/10 transition-shadow ring-inset hover:ring-white/40"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${palette.join(", ")})`,
                      }}
                    />
                  ))}
                </div>
              </Section>
            </div>

            <footer className="flex flex-col gap-2.5 border-t border-white/[0.08] px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Ratio">
                  <Select
                    options={ratios}
                    value={ratioValue}
                    onChange={(value) => update({ ratio: value })}
                  />
                </Field>
                <Field label="Format">
                  <Segmented
                    label="Format"
                    options={formats}
                    value={format}
                    onChange={(value) => update({ format: value })}
                  />
                </Field>
              </div>
              <Field label="Size">
                <Segmented
                  label="Size"
                  options={resolutions}
                  value={resolutionValue}
                  onChange={(value) => update({ size: value })}
                />
              </Field>
              <div className="flex gap-2">
                {!isMesh && (
                  <button
                    type="button"
                    onClick={copyCss}
                    className="h-9 rounded-lg px-3 text-zinc-400 ring-1 ring-white/10 transition-colors ring-inset hover:bg-white/5 hover:text-white"
                  >
                    {copied ? "Copied" : "Copy CSS"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={download}
                  className="h-9 flex-1 rounded-lg bg-white font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Download {format.toUpperCase()}
                </button>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </footer>
          </aside>
        </Panel>
      </Group>
    </div>
  );
}

type Option<T extends string> = { value: T; label: string };

type SectionProps = {
  title: string;
  detail?: string;
  action?: ReactNode;
  children: ReactNode;
};

function Section(props: SectionProps) {
  const { title, detail, action, children } = props;

  return (
    <section className="flex flex-col gap-2.5 border-b border-white/[0.08] px-4 py-3.5">
      <div className="flex h-5 items-center justify-between">
        <h2 className="text-[11px] font-medium text-zinc-500">
          {title}
          {detail && (
            <span className="ml-1.5 font-mono text-zinc-600">{detail}</span>
          )}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

type FieldProps = {
  label: string;
  children: ReactNode;
};

function Field(props: FieldProps) {
  const { label, children } = props;

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <p className="text-[11px] font-medium text-zinc-500">{label}</p>
      {children}
    </div>
  );
}

type EasingCurveProps = {
  value: Bezier;
  stops: string[];
  onChange: (value: Bezier) => void;
};

function EasingCurve(props: EasingCurveProps) {
  const { value, stops, onChange } = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const [x1, y1, x2, y2] = value;
  const handles = [
    { anchor: [0, 100], point: [x1 * 100, (1 - y1) * 100] },
    { anchor: [100, 0], point: [x2 * 100, (1 - y2) * 100] },
  ];

  function moveHandle(index: number, event: PointerEvent) {
    const rect = svgRef.current!.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, [0, 1]);
    const y = clamp(1 - (event.clientY - rect.top) / rect.height, [0, 1]);
    const next = [...value] as Bezier;
    next[index * 2] = Math.round(x * 100) / 100;
    next[index * 2 + 1] = Math.round(y * 100) / 100;
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="rounded-lg bg-white/[0.03] p-3 ring-1 ring-white/[0.08] ring-inset">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          aria-label="Easing curve"
          className="mx-auto block aspect-square w-full max-w-56 touch-none overflow-visible"
        >
          <path
            d="M25 0V100M50 0V100M75 0V100M0 25H100M0 50H100M0 75H100M0 0H100V100H0Z"
            vectorEffect="non-scaling-stroke"
            className="fill-none stroke-white/[0.06]"
          />
          <path
            d="M0 100L100 0"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            className="fill-none stroke-white/15"
          />
          {handles.map(({ anchor, point }, i) => (
            <line
              key={i}
              x1={anchor[0]}
              y1={anchor[1]}
              x2={point[0]}
              y2={point[1]}
              vectorEffect="non-scaling-stroke"
              className="stroke-white/40"
            />
          ))}
          <path
            d={`M0 100C${handles[0].point} ${handles[1].point} 100 0`}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            className="fill-none stroke-white"
          />
          {handles.map(({ point }, i) => (
            <circle
              key={i}
              cx={point[0]}
              cy={point[1]}
              r={4.5}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              onPointerDown={(event) =>
                event.currentTarget.setPointerCapture(event.pointerId)
              }
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  moveHandle(i, event);
                }
              }}
              className="cursor-grab fill-[#141416] stroke-white hover:fill-white active:cursor-grabbing"
            />
          ))}
        </svg>
      </div>
      <div
        className="h-3.5 rounded ring-1 ring-white/10 ring-inset"
        style={{
          backgroundImage: `linear-gradient(to right, ${stops.join(", ")})`,
        }}
      />
      <Segmented
        label="Easing preset"
        options={easingOptions}
        value={presetName(value) ?? ""}
        onChange={(name) => onChange(easingPresets[name])}
      />
      <p className="text-center font-mono text-[11px] text-zinc-600 tabular-nums">
        cubic-bezier({value.map((n) => n.toFixed(2)).join(", ")})
      </p>
    </div>
  );
}

type SelectProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

function Select<T extends string>(props: SelectProps<T>) {
  const { options, value, onChange } = props;

  return (
    <BaseSelect.Root
      items={options}
      value={value}
      onValueChange={(next) => next && onChange(next)}
    >
      <BaseSelect.Trigger className="flex h-8 w-full cursor-default items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 pr-1.5 pl-2.5 text-zinc-200 outline-none select-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 data-popup-open:bg-white/10">
        <BaseSelect.Value className="truncate" />
        <BaseSelect.Icon className="text-zinc-500">
          <CaretUpDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="z-100 outline-none select-none"
          sideOffset={6}
        >
          <BaseSelect.Popup className="origin-[var(--transform-origin)] rounded-xl border border-white/10 bg-zinc-900 p-1 text-sm text-zinc-200 shadow-2xl shadow-black/60 transition-[scale,opacity] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)]">
            <BaseSelect.List className="max-h-[var(--available-height)] overflow-y-auto">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  className="grid cursor-default grid-cols-[0.875rem_1fr] items-center gap-2 rounded-md py-1.5 pr-3 pl-2 outline-none select-none data-highlighted:bg-white/10"
                >
                  <BaseSelect.ItemIndicator className="col-start-1">
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="col-start-2">
                    {option.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

type RangeProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
};

function Range(props: RangeProps) {
  const { label, value, min, max, suffix = "", onChange } = props;

  return (
    <Slider.Root
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      onValueChange={onChange}
    >
      <Slider.Control className="group relative h-8 w-full cursor-ew-resize touch-none overflow-hidden rounded-lg border border-white/10 bg-white/5 select-none hover:bg-white/[0.07]">
        <Slider.Track className="h-full w-full">
          <Slider.Indicator className="bg-white/10" />
          <Slider.Thumb
            aria-label={label}
            className="h-full w-px bg-white/0 outline-none group-hover:bg-white/60 has-[:focus-visible]:bg-white"
          />
        </Slider.Track>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-xs">
          <span className="text-zinc-400">{label}</span>
          <span className="font-mono text-[11px] text-zinc-200 tabular-nums">
            {value}
            {suffix}
          </span>
        </span>
      </Slider.Control>
    </Slider.Root>
  );
}

type SegmentedProps<T extends string> = {
  options: Option<T>[];
  value: T;
  label: string;
  onChange: (value: T) => void;
};

function Segmented<T extends string>(props: SegmentedProps<T>) {
  const { options, value, label, onChange } = props;

  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => next[0] && onChange(next[0])}
      className="flex h-8 w-full rounded-lg bg-white/5 p-0.5"
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          className="flex-1 rounded-md px-2.5 text-xs whitespace-nowrap text-zinc-400 transition-colors outline-none select-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 data-pressed:bg-white/15 data-pressed:text-white"
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

type ColorSliderProps = {
  label: string;
  value: number;
  max: number;
  track: string;
  onChange: (value: number) => void;
};

function ColorSlider(props: ColorSliderProps) {
  const { label, value, max, track, onChange } = props;

  return (
    <Slider.Root
      value={Math.round(value)}
      min={0}
      max={max}
      thumbAlignment="edge"
      onValueChange={onChange}
      className="flex items-center gap-3"
    >
      <span className="w-3 font-mono text-[11px] text-zinc-500">
        {label[0]}
      </span>
      <Slider.Control className="flex h-5 flex-1 cursor-pointer touch-none items-center select-none">
        <Slider.Track
          className="h-2 w-full rounded-full ring-1 ring-white/10"
          style={{ backgroundImage: track }}
        >
          <Slider.Thumb
            aria-label={label}
            className="size-3.5 rounded-full border-2 border-white shadow-md shadow-black/50 outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-white/40"
          />
        </Slider.Track>
      </Slider.Control>
      <span className="w-7 text-right font-mono text-[11px] text-zinc-300 tabular-nums">
        {Math.round(value)}
      </span>
    </Slider.Root>
  );
}

type IconButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

function IconButton(props: IconButtonProps) {
  const { label, disabled, onClick, children } = props;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex w-7 items-center justify-center rounded-md text-zinc-300 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:text-zinc-600"
    >
      {children}
    </button>
  );
}

type UndoIconProps = {
  className?: string;
};

function UndoIcon(props: UndoIconProps) {
  const { className } = props;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5.5 3.5 2.5 6.5l3 3" />
      <path d="M2.5 6.5H10a3.5 3.5 0 0 1 0 7H7" />
    </svg>
  );
}

function CaretUpDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
