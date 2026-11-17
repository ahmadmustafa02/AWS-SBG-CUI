import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

const CELLS = GRID.flatMap((row, y) =>
  [...row].flatMap((cell, x) => (cell === "#" ? [[x, y]] : [])),
);

let playedThisLoad = false;

export default function Splash() {
  const root = useRef(null);
  const [phase, setPhase] = useState(() => (playedThisLoad ? "done" : "show"));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (playedThisLoad || reduce) {
      setPhase("done");
      return undefined;
    }

    const rootEl = root.current;
    if (!rootEl) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      playedThisLoad = true;
      setPhase("done");
      document.body.style.overflow = previous;
    };

    const ctx = gsap.context(() => {
      const cells = rootEl.querySelectorAll(".splash-cell");
      const words = rootEl.querySelectorAll(".splash-word");
      gsap.set(cells, {
        x: () => gsap.utils.random(-220, 220),
        y: () => gsap.utils.random(-160, 160),
        scale: 0.35,
        autoAlpha: 0,
      });
      gsap.set(words, { y: 18, autoAlpha: 0 });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(cells, {
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.95,
        stagger: { each: 0.028, from: "center" },
        ease: "power3.out",
      });
      tl.to(words, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" }, "-=0.15");
      tl.to(rootEl, { autoAlpha: 0, scale: 1.04, duration: 0.55, ease: "power2.in" }, "+=0.85");
    }, rootEl);

    const skip = () => {
      ctx.revert();
      finish();
    };
    const onKey = (event) => {
      if (event.key === "Escape") skip();
    };
    rootEl.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);

    return () => {
      ctx.revert();
      rootEl.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="splash" ref={root} role="dialog" aria-label="Intro">
      <div className="splash-mark" aria-hidden="true">
        {CELLS.map(([x, y]) => (
          <span
            key={`${x}-${y}`}
            className="splash-cell"
            style={{ gridColumn: x + 1, gridRow: y + 1 }}
          />
        ))}
      </div>
      <p className="splash-name">
        <span className="splash-word">AWS </span>
        <span className="splash-word">Student </span>
        <span className="splash-word">Builder </span>
        <span className="splash-word">Group</span>
      </p>
      <p className="splash-campus splash-word">COMSATS Islamabad</p>
    </div>
  );
}
