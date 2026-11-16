import type { CSSProperties } from "react";
import { LogoMark } from "./LogoMark";
import styles from "./Logo3D.module.css";

const LAYERS = 7;

/**
 * The hero's "3D" moment: the club mark extruded with stacked CSS layers and
 * swayed with a transform. No WebGL, no library, nothing to download — so it
 * costs nothing on phones. With reduced motion it holds a static tilt.
 * A heavier React Three Fiber scene can replace this later as progressive
 * enhancement; the page does not depend on it.
 */
export function Logo3D() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.model}>
        {Array.from({ length: LAYERS }, (_, i) => {
          const front = i === LAYERS - 1;
          return (
            <div key={i} className={styles.layer} style={{ "--z": i } as CSSProperties}>
              <LogoMark size="100%" color={front ? "var(--color-logo)" : "var(--color-brand-700)"} />
            </div>
          );
        })}
      </div>
      <div className={styles.shadow} />
    </div>
  );
}
