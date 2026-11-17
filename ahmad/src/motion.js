import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT = [
  ".page-head > .kicker",
  ".page-head > h1",
  ".page-head > .lede",
  ".page-head > div:not(.ridge-slot)",
  ".gallery-head > div",
  ".section-head",
  ".society-copy",
  ".society-stats",
  ".subject-board li",
  ".meet-board li",
  ".quest-tease > div",
  ".cta-copy",
  ".person-card",
  ".roster-head",
  ".session-intro > div",
  ".session-count",
  ".event-row",
  ".program-head",
  ".program-run",
  ".day-sheet li",
  ".agenda li",
  ".partner-card",
  ".place",
  ".ticket",
].join(",");

const MEDIA = [".team-hero", ".society-photo", ".mini-session", ".year-grid figure", ".cta-frame", ".masonry figure", ".podium"].join(",");

function rise(nodes, withBlur) {
  const list = [...nodes];
  if (!list.length) return;
  gsap.set(list, { autoAlpha: 0, y: 22, filter: withBlur ? "blur(6px)" : "none" });
  ScrollTrigger.batch(list, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "filter,transform,opacity,visibility",
      });
    },
  });
}

function countUp(root) {
  root.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const pad = Number(el.dataset.pad || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const state = { n: 0 };
    const paint = () => {
      const value = pad ? String(Math.round(state.n)).padStart(pad, "0") : Math.round(state.n).toLocaleString();
      el.textContent = `${prefix}${value}${suffix}`;
    };
    paint();
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(state, { n: target, duration: 1.15, ease: "power2.out", onUpdate: paint });
      },
    });
  });
}

export function bindMotion(root) {
  if (!root) return null;
  return gsap.context(() => {
    rise(root.querySelectorAll(TEXT), true);
    rise(root.querySelectorAll(MEDIA), false);
    countUp(root);
  }, root);
}
