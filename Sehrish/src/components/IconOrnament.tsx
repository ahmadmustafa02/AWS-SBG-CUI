import type { CSSProperties } from "react";
import type { IconName } from "@/content/types";
import { Icon } from "./Icon";
import styles from "./LogoOrnament.module.css";

type Props = {
  icon: IconName;
  /** Pixel size of the symbol. */
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
  /** Starting tilt in degrees, so repeated symbols don't look stamped. */
  tilt?: number;
};

/**
 * A large line symbol (camera, cloud, ...) used as a slow-turning background
 * ornament, the same way LogoOrnament uses the club mark. Decorative only.
 */
export function IconOrnament({ icon, size, top, left, right, bottom, duration = 140, reverse, opacity = 0.14, tilt = 0 }: Props) {
  const style = {
    top,
    left,
    right,
    bottom,
    opacity,
    rotate: `${tilt}deg`,
    "--dur": `${duration}s`,
    "--dir": reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={styles.ornament} style={style} aria-hidden="true">
      <span className={`${styles.mark} ${styles.thin}`}>
        <Icon name={icon} size={size} />
      </span>
    </div>
  );
}
