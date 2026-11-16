import type { CSSProperties } from "react";
import type { Pathway } from "@/content/types";
import { Icon } from "./Icon";
import styles from "./Pathways.module.css";

/** Each lane: where in the list it starts, its speed, direction and vertical bob. */
const LANES = [
  { offset: 0, seconds: 46, reverse: false },
  { offset: 3, seconds: 62, reverse: true },
  { offset: 5, seconds: 38, reverse: false },
  { offset: 1, seconds: 54, reverse: true },
];

function rotate<T>(items: T[], by: number): T[] {
  const n = by % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

/**
 * The club's domains as tiles floating sideways across four lanes. Lanes move
 * at different speeds and in opposite directions, and every tile bobs on its
 * own rhythm, so the field never lines up twice. Hover or focus pauses a lane.
 *
 * Screen readers get one plain list; the moving lanes are decorative copies.
 * With reduced motion the lanes hold still and can be scrolled by hand.
 */
export function Pathways({ items }: { items: Pathway[] }) {
  return (
    <div className={styles.field}>
      <ul className="visually-hidden">
        {items.map((p) => (
          <li key={p.id}>
            {p.name}: {p.blurb}
          </li>
        ))}
      </ul>

      {LANES.map((lane, laneIndex) => {
        const row = rotate(items, lane.offset);
        return (
          <div key={laneIndex} className={styles.lane} aria-hidden="true">
            <div
              className={styles.track}
              style={{ "--dur": `${lane.seconds}s`, "--dir": lane.reverse ? "reverse" : "normal" } as CSSProperties}
            >
              {/* Two copies back to back make the loop seamless. */}
              {[...row, ...row].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className={styles.tile}
                  style={{ "--bob": `${5 + ((i * 7 + laneIndex * 3) % 5)}s`, "--lift": `${6 + ((i * 5 + laneIndex) % 4) * 4}px` } as CSSProperties}
                >
                  <span className={styles.icon}>
                    <Icon name={p.icon} size={22} />
                  </span>
                  <span className={styles.text}>
                    <strong>{p.name}</strong>
                    <span>{p.blurb}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
