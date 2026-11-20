import { useEffect, useState, type ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Slider } from "@base-ui/react/slider";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { BackArrowIcon } from "../icons/BackArrowIcon";
import { clamp } from "../../lib/math";
import {
  drawGradient,
  getStops,
  type ColorSpace,
  type Easing,
} from "../../lib/gradient";

const palettes = [
  ["#1d4ed8", "#f472b6", "#fde68a"],
  ["#0f172a", "#7c3aed", "#f0abfc"],
  ["#ff5f6d", "#ffc371"],
  ["#00c6ff", "#0072ff", "#1e1b4b"],
  ["#134e4a", "#34d399", "#ecfccb"],
  ["#fb7185", "#a855f7", "#3b82f6", "#22d3ee"],
];

const spaces: { value: ColorSpace; label: string }[] = [
  { value: "oklch", label: "Oklch" },
  { value: "oklab", label: "Oklab" },
  { value: "rgb", label: "RGB" },
];

const easingOptions: { value: Easing; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "easeIn", label: "Ease In" },
  { value: "easeOut", label: "Ease Out" },
  { value: "easeInOut", label: "Ease In Out" },
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

function readSettings() {
  const params = new URLSearchParams(location.hash.slice(1));
  const colors = (params.get("colors") ?? "")
    .split(",")
    .filter((hex) => /^[0-9a-f]{6}$/i.test(hex))
    .map((hex) => `#${hex.toLowerCase()}`);
  const precision = Number(params.get("precision"));
  const angle = Number(params.get("angle"));

  function pick<T extends string>(key: string, options: { value: T }[]) {
    const value = params.get(key);
    return (
      options.find((option) => option.value === value)?.value ??
      options[0].value
    );
  }

  return {
    colors: colors.length >= 2 ? colors.slice(0, 5) : palettes[0],
    space: pick("space", spaces),
    easing: pick("easing", easingOptions),
    precision:
      params.has("precision") && Number.isInteger(precision)
        ? clamp(precision, [1, 20])
        : 8,
    angle:
      params.has("angle") && Number.isInteger(angle)
        ? clamp(angle, [0, 360])
        : 135,
    ratio: pick("ratio", ratios),
    size: params.has("size") ? pick("size", resolutions) : "4k",
    format: pick("format", formats),
  };
}

type GradientGeneratorProps = {};

export function GradientGenerator(props: GradientGeneratorProps) {
  const {} = props;
  const [initial] = useState(readSettings);
  const [colors, setColors] = useState(initial.colors);
  const [space, setSpace] = useState<ColorSpace>(initial.space);
  const [easing, setEasing] = useState<Easing>(initial.easing);
  const [precision, setPrecision] = useState(initial.precision);
  const [angle, setAngle] = useState(initial.angle);
  const [ratioValue, setRatioValue] = useState(initial.ratio);
  const [resolutionValue, setResolutionValue] = useState(initial.size);
  const [format, setFormat] = useState(initial.format);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const stops = getStops(colors, space, easing, precision);
  const ratio = ratios.find((r) => r.value === ratioValue)!;
  const { edge } = resolutions.find((r) => r.value === resolutionValue)!;
  const width = Math.round(
    ratio.w >= ratio.h ? edge : (edge * ratio.w) / ratio.h,
  );
  const height = Math.round(
    ratio.w >= ratio.h ? (edge * ratio.h) / ratio.w : edge,
  );
  const background = `linear-gradient(${angle}deg, ${stops.join(", ")})`;
  const css = `background-image: linear-gradient(\n  ${angle}deg,\n  ${stops.join(",\n  ")}\n);`;

  useEffect(() => {
    const hash = [
      `colors=${colors.map((color) => color.slice(1)).join(",")}`,
      `space=${space}`,
      `easing=${easing}`,
      `precision=${precision}`,
      `angle=${angle}`,
      `ratio=${ratioValue}`,
      `size=${resolutionValue}`,
      `format=${format}`,
    ].join("&");
    history.replaceState(null, "", `#${hash}`);
  }, [
    colors,
    space,
    easing,
    precision,
    angle,
    ratioValue,
    resolutionValue,
    format,
  ]);

  function updateColor(index: number, value: string) {
    setColors(colors.map((color, i) => (i === index ? value : color)));
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

    drawGradient(ctx, width, height, angle, stops);
    const type = format === "png" ? "image/png" : "image/jpeg";
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
      type,
      0.95,
    );
  }
  return (
    <div className="fixed inset-0 z-99 flex flex-col bg-[#0b0b0c] text-sm text-zinc-200 [color-scheme:dark]">
      <header className="flex items-center justify-between gap-4 px-5 py-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-white"
        >
          <BackArrowIcon />
          Index
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyCss}
            className="rounded-lg px-3 py-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {copied ? "Copied" : "Copy CSS"}
          </button>
          <button
            type="button"
            onClick={download}
            className="rounded-lg bg-white px-3 py-1.5 font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Download {format.toUpperCase()}
          </button>
        </div>
      </header>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-6 py-4"
        style={{ containerType: "size" }}
      >
        <div
          className="rounded-xl shadow-2xl ring-1 shadow-black/50 ring-white/10"
          style={{
            aspectRatio: `${ratio.w} / ${ratio.h}`,
            width: `min(100cqw, ${ratio.w / ratio.h} * 100cqh)`,
            backgroundImage: background,
          }}
        />
      </div>

      <p className="text-center font-mono text-xs text-zinc-500">
        {width} × {height}
      </p>
      {error && <p className="mt-1 text-center text-red-400">{error}</p>}

      <div className="mx-auto my-5 flex max-w-[calc(100%-2rem)] flex-wrap items-start justify-center gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 shadow-2xl backdrop-blur">
        <Control label="Presets">
          <div className="flex items-center gap-1.5">
            {palettes.map((palette) => (
              <button
                key={palette.join()}
                type="button"
                aria-label={`Use preset ${palette.join(", ")}`}
                onClick={() => setColors(palette)}
                className="size-5 rounded-full ring-1 ring-white/15 transition-transform hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${palette.join(", ")})`,
                }}
              />
            ))}
          </div>
        </Control>

        <Control label="Colors">
          <div className="flex items-center gap-1.5">
            {colors.map((color, i) => (
              <div key={i} className="group relative">
                <input
                  type="color"
                  value={color}
                  aria-label={`Color ${i + 1}`}
                  onChange={(event) => updateColor(i, event.target.value)}
                  className="block size-6 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 ring-1 ring-white/15 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                />
                {colors.length > 2 && (
                  <button
                    type="button"
                    aria-label={`Remove color ${i + 1}`}
                    onClick={() => setColors(colors.filter((_, j) => j !== i))}
                    className="absolute -top-1.5 -right-1.5 hidden size-3.5 items-center justify-center rounded-full bg-zinc-700 text-[10px] leading-none text-white group-hover:flex focus-visible:flex"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {colors.length < 5 && (
              <button
                type="button"
                aria-label="Add color"
                onClick={() =>
                  setColors([...colors, colors[colors.length - 1]])
                }
                className="flex size-6 items-center justify-center rounded-full border border-dashed border-white/25 text-zinc-400 transition-colors hover:border-white/50 hover:text-white"
              >
                +
              </button>
            )}
          </div>
        </Control>

        <Control label="Space">
          <Select options={spaces} value={space} onChange={setSpace} />
        </Control>

        <Control label="Easing">
          <Select options={easingOptions} value={easing} onChange={setEasing} />
        </Control>

        <Control label="Precision">
          <Range
            value={precision}
            min={1}
            max={20}
            label="Precision"
            onChange={setPrecision}
          />
        </Control>

        <Control label="Angle">
          <Range
            value={angle}
            min={0}
            max={360}
            suffix="°"
            label="Angle"
            onChange={setAngle}
          />
        </Control>

        <Control label="Ratio">
          <Select
            options={ratios}
            value={ratioValue}
            onChange={setRatioValue}
          />
        </Control>

        <Control label="Size">
          <Segmented
            label="Size"
            options={resolutions}
            value={resolutionValue}
            onChange={setResolutionValue}
          />
        </Control>

        <Control label="Format">
          <Segmented
            label="Format"
            options={formats}
            value={format}
            onChange={setFormat}
          />
        </Control>
      </div>
    </div>
  );
}

type Option<T extends string> = { value: T; label: string };

type ControlProps = {
  label: string;
  children: ReactNode;
};

function Control(props: ControlProps) {
  const { label, children } = props;

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] leading-4 font-medium text-zinc-500">{label}</p>
      <div className="relative flex h-8 items-center">{children}</div>
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
      <BaseSelect.Trigger className="flex h-8 min-w-28 cursor-default items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 pr-1.5 pl-2.5 text-zinc-200 outline-none select-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30 data-popup-open:bg-white/10">
        <BaseSelect.Value />
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
  value: number;
  min: number;
  max: number;
  suffix?: string;
  label: string;
  onChange: (value: number) => void;
};

function Range(props: RangeProps) {
  const { value, min, max, suffix = "", label, onChange } = props;

  return (
    <Slider.Root
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      onValueChange={onChange}
    >
      <Slider.Control className="group relative h-8 w-28 cursor-ew-resize touch-none overflow-hidden rounded-lg border border-white/10 bg-white/5 select-none hover:bg-white/10">
        <Slider.Track className="h-full w-full">
          <Slider.Indicator className="bg-white/15" />
          <Slider.Thumb
            aria-label={label}
            className="h-full w-px bg-white/0 outline-none group-hover:bg-white/60 has-[:focus-visible]:bg-white"
          />
        </Slider.Track>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-zinc-200 tabular-nums">
          {value}
          {suffix}
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
      className="flex h-8 rounded-lg bg-white/5 p-0.5"
    >
      {options.map((option) => (
        <Toggle
          key={option.value}
          value={option.value}
          className="rounded-md px-2.5 text-xs text-zinc-400 transition-colors outline-none select-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 data-pressed:bg-white/15 data-pressed:text-white"
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
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
