"use client";

import { useRef, useState } from "react";
import type { EventItem } from "@/content/types";
import { EventCard } from "./EventCard";
import { StateBlock } from "./StateBlock";
import styles from "./EventTabs.module.css";

const TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
] as const;
type TabId = (typeof TABS)[number]["id"];

/** Upcoming / Past tabs following the WAI-ARIA tabs pattern (arrow keys, Home, End). */
export function EventTabs({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  const [active, setActive] = useState<TabId>("upcoming");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(TABS[next].id);
    refs.current[TABS[next].id]?.focus();
  };

  const lists: Record<TabId, EventItem[]> = { upcoming, past };

  return (
    <div>
      <div role="tablist" aria-label="Events" className={styles.tabs} onKeyDown={onKeyDown}>
        {TABS.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(t.id)}
          >
            {t.label} <span className="pixel">{lists[t.id].length}</span>
          </button>
        ))}
      </div>

      {TABS.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id} tabIndex={0} className={styles.panel}>
          {lists[t.id].length > 0 ? (
            lists[t.id].map((e) => <EventCard key={e.id} event={e} headingLevel="h2" />)
          ) : t.id === "upcoming" ? (
            <StateBlock kind="empty" title="No upcoming events right now">
              New events are announced here and on our Meetup page first.
            </StateBlock>
          ) : (
            <StateBlock kind="empty" title="The archive starts after our first event">
              Recaps, photo albums and certificate links for finished events will collect here.
            </StateBlock>
          )}
        </div>
      ))}
    </div>
  );
}
