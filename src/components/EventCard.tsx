import Link from "next/link";
import { isPast } from "@/content/events";
import type { EventItem } from "@/content/types";
import { formatEventDate, REGISTRATION_LABEL } from "@/lib/format";
import { Icon } from "./Icon";
import styles from "./EventCard.module.css";

export function EventCard({ event, headingLevel: Heading = "h3" }: { event: EventItem; headingLevel?: "h2" | "h3" }) {
  const past = isPast(event);
  const start = event.startsAt ? new Date(event.startsAt) : undefined;
  const statusClass =
    event.registration === "open" ? "status--open" : event.registration === "coming-soon" ? "status--soon" : "status--closed";

  return (
    <article className={styles.card} data-featured={event.featured || undefined}>
      <div className={styles.date} aria-hidden="true">
        {start ? (
          <>
            <span className={styles.day}>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Asia/Karachi" }).format(start)}</span>
            <span className={styles.month}>{new Intl.DateTimeFormat("en-GB", { month: "short", year: "2-digit", timeZone: "Asia/Karachi" }).format(start)}</span>
          </>
        ) : (
          <>
            <span className={styles.day}>??</span>
            <span className={styles.month}>Date TBA</span>
          </>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={`status ${past ? "status--closed" : statusClass}`}>
            {past ? "Past event" : REGISTRATION_LABEL[event.registration]}
          </span>
          {event.featured && !past && <span className={`pixel ${styles.flag}`}>Featured</span>}
        </div>
        <Heading className={styles.title}>
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </Heading>
        <p className={styles.line}>
          {formatEventDate(event.startsAt) ?? "Date to be announced"}
          {event.venue && <> · {event.venue}</>}
        </p>
      </div>

      <span className={styles.arrow} aria-hidden="true">
        <Icon name="arrow" size={22} />
      </span>
    </article>
  );
}
