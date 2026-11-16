import type { EventItem } from "@/content/types";

const TZ = "Asia/Karachi";

export function formatEventDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(iso));
}

export function formatEventTime(iso?: string): string | undefined {
  if (!iso) return undefined;
  return (
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ }).format(
      new Date(iso),
    ) + " PKT"
  );
}

export const REGISTRATION_LABEL: Record<EventItem["registration"], string> = {
  "coming-soon": "Registration opens soon",
  open: "Registration open",
  closed: "Registration closed",
  completed: "Event completed",
};

/** Initials for the photo placeholder: first and last word, max two letters. */
export function initials(name: string): string {
  const words = name.replace(/^Sir\s+/i, "").trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function icsStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Builds an .ics file body. Only call with a confirmed start time. */
export function buildIcs(event: EventItem, url: string): string {
  const start = event.startsAt!;
  // Day confirmed but not the time: export an all-day entry.
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(start)).replace(/-/g, "");
  const end = event.endsAt ?? new Date(new Date(start).getTime() + 2 * 60 * 60 * 1000).toISOString();
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AWS SBG CUI//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@aws-sbg-cui`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    event.dateOnly ? `DTSTART;VALUE=DATE:${day}` : `DTSTART:${icsStamp(start)}`,
    event.dateOnly ? "" : `DTEND:${icsStamp(end)}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.summary)}`,
    event.venue ? `LOCATION:${esc(event.venue)}` : "",
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
