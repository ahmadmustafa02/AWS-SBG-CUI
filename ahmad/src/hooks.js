import { useEffect, useState } from "react";

export function useTitle(title, description) {
  useEffect(() => {
    document.title = title
      ? `${title} · AWS SBG CUI`
      : "AWS Student Builder Group · COMSATS Islamabad";
    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);
}

export function useCountdown(targetIso) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = new Date(targetIso).getTime() - now;
  if (Number.isNaN(diff) || diff <= 0) {
    return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const total = Math.floor(diff / 1000);
  return {
    past: false,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
