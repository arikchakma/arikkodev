type Triple = [number, number, number];

export type ColorSpace = "rgb" | "oklab" | "oklch";
export type Bezier = [number, number, number, number];

export function cubicBezier(bezier: Bezier, x: number) {
  const [x1, y1, x2, y2] = bezier;
  const at = (t: number, a: number, b: number) =>
    3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;

  let low = 0;
  let high = 1;
  for (let i = 0; i < 24; i++) {
    const t = (low + high) / 2;
    if (at(t, x1, x2) < x) {
      low = t;
    } else {
      high = t;
    }
  }

  return at((low + high) / 2, y1, y2);
}

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
  easing: Bezier,
  precision: number,
): string[] {
  const segments = colors.length - 1;
  const count = segments * precision + 1;

  return Array.from({ length: count }, (_, i) => {
    const eased = cubicBezier(easing, i / (count - 1));
    const position = Math.min(Math.max(eased, 0), 1) * segments;
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

export type MeshPoint = { x: number; y: number; color: string };

function meshFalloff(softness: number) {
  const spread = 0.05 + (0.3 * softness) / 100;
  return 1 / (2 * spread * spread);
}

function meshLab(
  labs: Triple[],
  points: MeshPoint[],
  falloff: number,
  aspect: number,
  x: number,
  y: number,
): Triple {
  const distances = points.map((point) => {
    const dx = (x - point.x) * aspect;
    const dy = y - point.y;
    return dx * dx + dy * dy;
  });
  const nearest = Math.min(...distances);

  let total = 0;
  let l = 0;
  let a = 0;
  let b = 0;
  for (let i = 0; i < points.length; i++) {
    const weight = Math.exp(-(distances[i] - nearest) * falloff);
    total += weight;
    l += labs[i][0] * weight;
    a += labs[i][1] * weight;
    b += labs[i][2] * weight;
  }

  return [l / total, a / total, b / total];
}

export function meshColor(
  points: MeshPoint[],
  softness: number,
  aspect: number,
  x: number,
  y: number,
): string {
  const labs = points.map((point) => rgbToOklab(hexToRgb(point.color)));
  const lab = meshLab(labs, points, meshFalloff(softness), aspect, x, y);
  return rgbToHex(oklabToRgb(lab));
}

export function drawMesh(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  points: MeshPoint[],
  softness: number,
) {
  const scale = Math.min(1, 1600 / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const labs = points.map((point) => rgbToOklab(hexToRgb(point.color)));
  const falloff = meshFalloff(softness);
  const aspect = width / height;

  const image = new ImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const lab = meshLab(
        labs,
        points,
        falloff,
        aspect,
        (x + 0.5) / w,
        (y + 0.5) / h,
      );
      const [r, g, b] = oklabToRgb(lab);
      const offset = (y * w + x) * 4;
      image.data[offset] = r * 255;
      image.data[offset + 1] = g * 255;
      image.data[offset + 2] = b * 255;
      image.data[offset + 3] = 255;
    }
  }

  if (scale === 1) {
    ctx.putImageData(image, 0, 0);
    return;
  }

  const field = document.createElement("canvas");
  field.width = w;
  field.height = h;
  field.getContext("2d")!.putImageData(image, 0, 0);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(field, 0, 0, width, height);
}

export function hexToHsl(hex: string): Triple {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l * 100];

  const s = d / (1 - Math.abs(2 * l - 1));
  const h =
    max === r
      ? ((g - b) / d) % 6
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s * 100, l * 100];
}

export function hslToHex(h: number, s: number, l: number): string {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    return l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return rgbToHex([channel(0), channel(8), channel(4)]);
}
