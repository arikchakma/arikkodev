type Triple = [number, number, number];

export type ColorSpace = "rgb" | "oklab" | "oklch";
export type Easing = "linear" | "easeIn" | "easeOut" | "easeInOut";

export const easings: Record<Easing, (t: number) => number> = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - (1 - t) * (1 - t),
  easeInOut: (t) => t * t * (3 - 2 * t),
};

function hexToRgb(hex: string): Triple {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function rgbToHex(rgb: Triple): string {
  const channels = rgb.map((c) => {
    const byte = Math.round(Math.min(Math.max(c, 0), 1) * 255);
    return byte.toString(16).padStart(2, "0");
  });
  return `#${channels.join("")}`;
}

function toLinear(c: number) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function toGamma(c: number) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
}

function rgbToOklab(rgb: Triple): Triple {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb(lab: Triple): Triple {
  const [L, a, b] = lab;
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    toGamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mix(from: string, to: string, t: number, space: ColorSpace): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  if (space === "rgb") {
    return rgbToHex([
      lerp(a[0], b[0], t),
      lerp(a[1], b[1], t),
      lerp(a[2], b[2], t),
    ]);
  }

  const [l1, a1, b1] = rgbToOklab(a);
  const [l2, a2, b2] = rgbToOklab(b);
  if (space === "oklab") {
    return rgbToHex(
      oklabToRgb([lerp(l1, l2, t), lerp(a1, a2, t), lerp(b1, b2, t)]),
    );
  }

  const c1 = Math.hypot(a1, b1);
  const c2 = Math.hypot(a2, b2);
  let h1 = c1 < 1e-4 ? Math.atan2(b2, a2) : Math.atan2(b1, a1);
  const h2 = c2 < 1e-4 ? h1 : Math.atan2(b2, a2);
  if (c1 < 1e-4 && c2 < 1e-4) h1 = 0;

  let dh = h2 - h1;
  if (dh > Math.PI) dh -= 2 * Math.PI;
  if (dh < -Math.PI) dh += 2 * Math.PI;

  const c = lerp(c1, c2, t);
  const h = h1 + dh * t;
  return rgbToHex(
    oklabToRgb([lerp(l1, l2, t), c * Math.cos(h), c * Math.sin(h)]),
  );
}

export function getStops(
  colors: string[],
  space: ColorSpace,
  easing: Easing,
  precision: number,
): string[] {
  const segments = colors.length - 1;
  const count = segments * precision + 1;

  return Array.from({ length: count }, (_, i) => {
    const position = easings[easing](i / (count - 1)) * segments;
    const index = Math.min(Math.floor(position), segments - 1);
    return mix(colors[index], colors[index + 1], position - index, space);
  });
}

export function drawGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  angle: number,
  stops: string[],
) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const half = (Math.abs(width * dx) + Math.abs(height * dy)) / 2;
  const cx = width / 2;
  const cy = height / 2;

  const gradient = ctx.createLinearGradient(
    cx - dx * half,
    cy - dy * half,
    cx + dx * half,
    cy + dy * half,
  );
  stops.forEach((stop, i) =>
    gradient.addColorStop(i / (stops.length - 1), stop),
  );

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}
