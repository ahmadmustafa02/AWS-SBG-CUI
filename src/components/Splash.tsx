"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo3D } from "./Logo3D";
import styles from "./Splash.module.css";

const LogoScene = dynamic(() => import("./LogoScene"), { ssr: false });

/** True once the splash has played. Resets on every full page load, so the splash
 *  plays each time the site is opened or refreshed, but not when you click back
 *  to Home from another page. */
let playedThisLoad = false;
/** Only if the 3D scene never reports back (script blocked): carry on anyway.
 *  Long on purpose, so the name never appears before the logo has joined. */
const SAFETY_MS = 9000;
/** How long the finished logo and name stay up before the site is revealed. */
const HOLD_MS = 1700;
const LEAVE_MS = 650;

function canRun3D(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 4) <= 2 || (nav.deviceMemory ?? 4) <= 1) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type Phase = "boot" | "showing" | "leaving" | "done";

/**
 * Splash screen for the landing page: the logo's blocks fly in and join in
 * the centre, the club name appears, then the splash lifts to show the site.
 * About four seconds; a click, a tap or Escape skips it.
 */
export function Splash({ nameWords, campus }: { nameWords: string[]; campus: string }) {
  const [phase, setPhase] = useState<Phase>(() => (playedThisLoad ? "done" : "boot"));
  const [mode, setMode] = useState<"3d" | "static" | null>(null);
  const [assembled, setAssembled] = useState(false);
  const timers = useRef<number[]>([]);

  const leave = useCallback(() => {
    setPhase((p) => (p === "done" ? p : "leaving"));
    playedThisLoad = true;
    timers.current.push(window.setTimeout(() => setPhase("done"), LEAVE_MS));
  }, []);

  const reveal = useCallback(() => {
    setAssembled((was) => {
      if (!was) timers.current.push(window.setTimeout(leave, HOLD_MS));
      return true;
    });
  }, [leave]);

  const toStatic = useCallback(() => {
    setMode("static");
    setPhase((p) => (p === "boot" ? "showing" : p));
    reveal();
  }, [reveal]);

  useEffect(() => {
    if (playedThisLoad || document.documentElement.dataset.splash === "skip") {
      setPhase("done");
      return;
    }
    if (canRun3D()) {
      setMode("3d");
      setPhase("showing");
      timers.current.push(window.setTimeout(reveal, SAFETY_MS));
    } else {
      toStatic();
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && leave();
    document.addEventListener("keydown", onKey);
    const pending = timers.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, [leave, reveal, toStatic]);

  // Keep the page from scrolling underneath while the splash is up.
  useEffect(() => {
    if (phase === "done" || phase === "boot") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      <noscript>
        <style>{`.${styles.splash}{display:none!important}`}</style>
      </noscript>
      <div
        className={styles.splash}
        data-assembled={assembled}
        data-leaving={phase === "leaving"}
        role="dialog"
        aria-label="Intro animation"
        onClick={leave}
      >
        <div className={styles.stage} aria-hidden="true">
          {mode === "3d" && <LogoScene onAssembled={reveal} onFail={toStatic} />}
          {mode === "static" && (
            <div className={styles.static}>
              <Logo3D />
            </div>
          )}
        </div>

        <p className={styles.name}>
          {nameWords.map((word, i) => (
            <span key={word} style={{ "--i": i } as React.CSSProperties}>
              {word}{" "}
            </span>
          ))}
        </p>
        <p className={`pixel ${styles.campus}`} style={{ "--i": nameWords.length } as React.CSSProperties}>
          {campus}
        </p>
      </div>
    </>
  );
}
