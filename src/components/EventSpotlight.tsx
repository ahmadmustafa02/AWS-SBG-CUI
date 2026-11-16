import Image from "next/image";
import Link from "next/link";
import { isPast } from "@/content/events";
import type { EventItem } from "@/content/types";
import { formatEventDate, formatEventTime, REGISTRATION_LABEL } from "@/lib/format";
import { Countdown } from "./Countdown";
import { EventFlipCard } from "./EventFlipCard";
import { Icon } from "./Icon";
import styles from "./EventSpotlight.module.css";

const STATUS_CLASS: Record<EventItem["registration"], string> = {
  open: "status--open",
  "coming-soon": "status--soon",
  closed: "status--closed",
  completed: "status--closed",
};

export type EventAction = { href: string; label: string; external?: boolean };

/** What the main button does, derived from the event's state. */
export function eventPrimaryAction(event: EventItem): EventAction {
  const base = `/events/${event.slug}`;
  if (isPast(event)) return { href: base, label: "See the recap" };
  if (event.registration === "open") {
    // An external sign-up form wins; otherwise the built-in two-step flow.
    if (event.registrationUrl) return { href: event.registrationUrl, label: "Register now", external: true };
    if (event.meetupEventUrl) return { href: `${base}/register`, label: "Register now" };
  }
  return { href: base, label: "Event details" };
}

/** Renders an EventAction as a button-styled link (new tab when external). */
export function EventActionButton({ action, className = "btn" }: { action: EventAction; className?: string }) {
  if (action.external) {
    return (
      <a href={action.href} className={className} target="_blank" rel="noopener noreferrer">
        {action.label} <Icon name="arrow" size={18} />
        <span className="visually-hidden"> (opens the registration form in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {action.label} <Icon name="arrow" size={18} />
    </Link>
  );
}

type Props = {
  event: EventItem;
  headingLevel?: "h2" | "h3";
  /** Hide the button when the surrounding layout already has the CTA. */
  showAction?: boolean;
};

/**
 * Featured-event panel, used in the landing hero and at the top of Events.
 * Every field is data-driven; unknown fields say so instead of guessing.
 */
export function EventSpotlight({ event, headingLevel: Heading = "h2", showAction = true }: Props) {
  const past = isPast(event);
  const date = formatEventDate(event.startsAt);
  const time = event.dateOnly ? undefined : formatEventTime(event.startsAt);
  const action = eventPrimaryAction(event);
  const detailsHref = `/events/${event.slug}`;
  const agenda = event.agenda?.slice(0, 3) ?? [];
  const speakers = event.speakers?.slice(0, 3) ?? [];

  // With a poster, the featured event is a flip card: poster on the front,
  // details and Register on the back.
  if (event.posterUrl) {
    return (
      <EventFlipCard
        id={event.id}
        title={event.title}
        posterUrl={event.posterUrl}
        statusLabel={past ? "Event completed" : REGISTRATION_LABEL[event.registration]}
        statusClass={past ? "status--closed" : STATUS_CLASS[event.registration]}
        date={date}
        time={time}
        venue={event.venue}
        countdownTo={past ? undefined : event.startsAt}
        detailsHref={detailsHref}
        action={action}
        headingLevel={Heading}
      />
    );
  }

  return (
    <article className={styles.panel} data-poster={Boolean(event.posterUrl)} aria-labelledby={`spot-${event.id}`}>
      <header className={styles.top}>
        <span className={`pixel ${styles.kicker}`}>Featured event</span>
        <span className={`status ${STATUS_CLASS[event.registration]}`}>{REGISTRATION_LABEL[event.registration]}</span>
      </header>

      <div className={styles.body}>
        {event.posterUrl && (
          <Link href={detailsHref} className={styles.poster} aria-label={`${event.title} poster: open event details`}>
            <Image src={event.posterUrl} alt={`Poster for ${event.title}`} width={1080} height={1350} sizes="(min-width: 62rem) 16rem, 60vw" priority />
          </Link>
        )}

        <div className={styles.content}>
          <Heading id={`spot-${event.id}`} className={styles.title}>
            {event.title}
          </Heading>
          <p className={styles.summary}>{event.summary}</p>

          <dl className={styles.facts}>
            <div>
              <dt>
                <Icon name="calendar" size={16} /> When
              </dt>
              <dd>
                {date ? (
                  <>
                    {date}
                    {time && <span className={styles.sub}> · {time}</span>}
                  </>
                ) : (
                  <span className={styles.tba}>Date to be announced</span>
                )}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={16} /> Where
              </dt>
              <dd>{event.venue ?? <span className={styles.tba}>Venue to be announced</span>}</dd>
            </div>
          </dl>

          {!past && <Countdown to={event.startsAt} />}

          {(agenda.length > 0 || speakers.length > 0) && (
            <div className={styles.preview}>
              {agenda.length > 0 && (
                <ul>
                  {agenda.map((item) => (
                    <li key={item.title}>
                      {item.time && <span className="mono">{item.time}</span>} {item.title}
                    </li>
                  ))}
                </ul>
              )}
              {speakers.length > 0 && <p>With {speakers.map((s) => s.name).join(", ")}.</p>}
            </div>
          )}

          {showAction && (
            <div className="btn-row">
              <EventActionButton action={action} />
              {action.href !== detailsHref && (
                <Link href={detailsHref} className="text-link">
                  Event details
                </Link>
              )}
            </div>
          )}

          {past && (
            <div className="btn-row">
              <Link href="/photos" className="btn btn--secondary btn--small">
                Find My Photos
              </Link>
              <Link href="/certificates" className="btn btn--secondary btn--small">
                Get your certificate
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
