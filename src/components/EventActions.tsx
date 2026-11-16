"use client";

import { useState } from "react";
import type { EventItem } from "@/content/types";
import { buildIcs } from "@/lib/format";
import { Icon } from "./Icon";

/** Add-to-calendar and share. Calendar stays disabled until a date is confirmed. */
export function EventActions({ event }: { event: EventItem }) {
  const [copied, setCopied] = useState(false);
  const hasDate = Boolean(event.startsAt);

  const addToCalendar = () => {
    if (!event.startsAt) return;
    const blob = new Blob([buildIcs(event, window.location.href)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, url });
      } catch {
        /* user closed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked: the URL is still in the address bar */
    }
  };

  return (
    <div className="stack" style={{ "--stack": "0.6rem" } as React.CSSProperties}>
      <div className="btn-row">
        <button type="button" className="btn btn--secondary btn--small" onClick={addToCalendar} disabled={!hasDate} aria-describedby={hasDate ? undefined : "cal-note"}>
          <Icon name="calendar" size={16} /> Add to calendar
        </button>
        <button type="button" className="btn btn--secondary btn--small" onClick={share}>
          <Icon name="share" size={16} /> Share event
        </button>
      </div>
      {!hasDate && (
        <p id="cal-note" style={{ fontSize: "0.85rem" }}>
          Calendar export unlocks once the date is confirmed.
        </p>
      )}
      <p role="status" style={{ fontSize: "0.85rem", minHeight: "1.2em" }}>
        {copied ? "Link copied." : ""}
      </p>
    </div>
  );
}
