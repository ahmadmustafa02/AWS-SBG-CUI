"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared behaviour for flip cards (team members, speakers).
 * - Mouse: the card is flipped while the pointer is over it.
 * - Touch: tap to flip, tap again to flip back.
 * - Keyboard: Enter / Space on the card flips it, and focus follows.
 * Also reports whether the card is on screen, so decorations can pause.
 */
export function useFlipCard() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [inView, setInView] = useState(true);

  const cardRef = useRef<HTMLElement>(null);
  const frontBtn = useRef<HTMLButtonElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (pinned ? backBtn : frontBtn).current?.focus({ preventScroll: true });
  }, [pinned]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (e: React.MouseEvent) => {
    // With a mouse, hovering already flips the card; a mouse click must not
    // pin it open. Keyboard activation (detail 0) and touch taps do toggle.
    if (window.matchMedia("(hover: hover)").matches && e.detail !== 0) return;
    moveFocus.current = true;
    setPinned((v) => !v);
  };

  return {
    flipped: hovered || pinned,
    inView,
    cardRef,
    frontBtn,
    backBtn,
    toggle,
    hoverProps: {
      onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(true),
      onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(false),
    },
  };
}
