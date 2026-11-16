/**
 * The club mark, traced cell-for-cell from the supplied logo file
 * (public/brand/logo-source.jpeg): a 9×9 pixel grid, colour #AD5CFF.
 * This is a 1:1 vector of the approved artwork, not a redesign — if the team
 * supplies an official SVG, swap it in here and everything else follows.
 */
const GRID = [
  "..#.#.#..",
  "..#####..",
  "##.....##",
  ".#.....#.",
  "##.....##",
  ".#.....#.",
  "##.....##",
  "..#####..",
  "..#.#.#..",
];

export const LOGO_CELLS: [number, number][] = GRID.flatMap((row, y) =>
  [...row].flatMap((c, x) => (c === "#" ? [[x, y] as [number, number]] : [])),
);

type Props = {
  size?: number | string;
  /** "solid" is the real mark. "outline" is the low-key ornament treatment. */
  variant?: "solid" | "outline";
  title?: string;
  className?: string;
  color?: string;
};

export function LogoMark({ size = 32, variant = "solid", title, className, color = "var(--color-logo)" }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 9 9"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      shapeRendering="crispEdges"
    >
      {LOGO_CELLS.map(([x, y]) =>
        variant === "solid" ? (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />
        ) : (
          <rect
            key={`${x}-${y}`}
            x={x + 0.06}
            y={y + 0.06}
            width="0.88"
            height="0.88"
            fill="none"
            stroke={color}
            strokeWidth="0.05"
          />
        ),
      )}
    </svg>
  );
}
