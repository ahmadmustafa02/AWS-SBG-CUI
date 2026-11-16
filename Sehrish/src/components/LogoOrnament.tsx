import type { CSSProperties } from "react";
import { LogoMark } from "./LogoMark";
import styles from "./LogoOrnament.module.css";

type Props = {
  /** CSS length, e.g. "22rem". */
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** Seconds per full turn. Vary this between ornaments. */
  duration?: number;
  reverse?: boolean;
  /** Lets the ornament drift a little with page scroll (where supported). */
  drift?: boolean;
  opacity?: number;
};

/**
 * Large, low-opacity outline of the club mark used as a background ornament.
 * Purely decorative: hidden from assistive tech, never intercepts pointer
 * events, and sits behind band content.
 */
export function LogoOrnament({ size, top, left, right, bottom, duration = 120, reverse, drift, opacity = 0.16 }: Props) {
  const style = {
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    opacity,
    "--dur": `${duration}s`,
    "--dir": reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={`${styles.ornament} ${drift ? styles.drift : ""}`} style={style} aria-hidden="true">
      <LogoMark size="100%" variant="outline" className={styles.mark} color="currentColor" />
    </div>
  );
}
