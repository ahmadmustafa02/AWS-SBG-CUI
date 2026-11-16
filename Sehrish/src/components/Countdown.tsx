"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

/**
 * Renders only for a confirmed, future start time. Before hydration, with no
 * date, or once the moment has passed it renders nothing — never a negative
 * or placeholder countdown.
 */
export function Countdown({ to }: { to?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!to || now === null) return null;
  const target = new Date(to).getTime();
  if (Number.isNaN(target) || target <= now) return null;

  const total = Math.floor((target - now) / 1000);
  const parts = [
    { label: "days", value: Math.floor(total / 86400) },
    { label: "hrs", value: Math.floor((total % 86400) / 3600) },
    { label: "min", value: Math.floor((total % 3600) / 60) },
    { label: "sec", value: total % 60 },
  ];

  return (
    <div
      className={styles.countdown}
      role="timer"
      aria-label={`Starts in ${parts[0].value} days, ${parts[1].value} hours and ${parts[2].value} minutes`}
    >
      {parts.map((p) => (
        <div key={p.label} className={styles.unit} aria-hidden="true">
          <span className={styles.value}>{String(p.value).padStart(2, "0")}</span>
          <span className={styles.label}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}
