import type { CSSProperties } from "react";
import type { Ambassador } from "@/content/types";
import styles from "./AmbassadorFloat.module.css";

const SPEEDS = [44, 58, 36];
const MIN_PER_LANE = 8;

/**
 * Campus ambassadors as name tags floating sideways, each with its university.
 * Up to three lanes, alternating direction. Screen readers get a plain list;
 * the moving lanes are decorative copies. Reduced motion: lanes hold still.
 */
export function AmbassadorFloat({ people }: { people: Ambassador[] }) {
  const laneCount = Math.min(3, Math.max(1, Math.ceil(people.length / 5)));
  const lanes = Array.from({ length: laneCount }, (_, lane) => {
    const own = people.filter((_, i) => i % laneCount === lane);
    // Repeat a short lane so it always fills the width before looping.
    const filled: Ambassador[] = [];
    while (filled.length < MIN_PER_LANE) filled.push(...own);
    return filled;
  });

  return (
    <div className={styles.field}>
      <ul className="visually-hidden">
        {people.map((p) => (
          <li key={`${p.name}-${p.university}`}>
            {p.name}, {p.university}
          </li>
        ))}
      </ul>

      {lanes.map((row, laneIndex) => (
        <div key={laneIndex} className={styles.lane} aria-hidden="true">
          <div
            className={styles.track}
            style={{ "--dur": `${SPEEDS[laneIndex]}s`, "--dir": laneIndex % 2 ? "reverse" : "normal" } as CSSProperties}
          >
            {[...row, ...row].map((p, i) => (
              <div key={i} className={styles.tag} style={{ "--bob": `${5 + ((i * 7 + laneIndex * 3) % 5)}s` } as CSSProperties}>
                <span className={styles.dot} />
                <span className={styles.text}>
                  <strong>{p.name}</strong>
                  <span>{p.university}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
