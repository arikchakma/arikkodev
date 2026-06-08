const GRID_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='100%' height='100%' fill='oklch(98.5% 0 0)'/><path d='M 10,0 V 20 M 0,10 H 20' stroke-width='0.5' stroke='#EEEEEE' fill='none'/></svg>";

export const gridBackdrop = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRID_SVG)}")`,
  backgroundSize: "20px 20px",
};

export function gridDelay(index: number, columns: number) {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const rows = Math.ceil(16 / columns);
  const dx = col - (columns - 1) / 2;
  const dy = row - rows;
  return Math.hypot(dx, dy) * 0.05;
}
