"use client";

import Image from "next/image";
import Link from "next/link";
import { Countdown } from "./Countdown";
import { Icon } from "./Icon";
import { useFlipCard } from "./useFlipCard";
import styles from "./EventFlipCard.module.css";

type Props = {
  id: string;
  title: string;
  posterUrl: string;
  statusLabel: string;
  statusClass: string;
  date?: string;
  time?: string;
  venue?: string;
  /** ISO start, for the countdown. Omit for past events. */
  countdownTo?: string;
  detailsHref: string;
  action: { href: string; label: string; external?: boolean };
  headingLevel?: "h2" | "h3";
};

/**
 * Featured event as a flip card. Front: the poster and nothing else.
 * Back: date, venue, countdown and the Register button.
 * Hover flips it with a mouse; tap or Enter flips it otherwise.
 */
export function EventFlipCard({ id, title, posterUrl, statusLabel, statusClass, date, time, venue, countdownTo, detailsHref, action, headingLevel: Heading = "h2" }: Props) {
  const { flipped, cardRef, frontBtn, backBtn, toggle, hoverProps } = useFlipCard();

  return (
    <article ref={cardRef} className={styles.card} data-flipped={flipped} aria-labelledby={`spot-${id}`} {...hoverProps}>
      <div className={styles.inner}>
        {/* ---------- Front: just the poster ---------- */}
        <div className={`${styles.face} ${styles.front}`} inert={flipped}>
          <Image src={posterUrl} alt={`Poster for ${title}`} fill sizes="(min-width: 40rem) 22rem, 90vw" priority />
          <button ref={frontBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={false}>
            <span className="visually-hidden">Show details and registration for {title}</span>
          </button>
        </div>

        {/* ---------- Back: details and Register ---------- */}
        <div className={`${styles.face} ${styles.back}`} inert={!flipped}>
          <div className={styles.top}>
            <span className={`pixel ${styles.kicker}`}>Featured event</span>
            <span className={`status ${statusClass}`}>{statusLabel}</span>
          </div>

          <Heading id={`spot-${id}`} className={styles.title}>
            {title}
          </Heading>

          <dl className={styles.facts}>
            <div>
              <dt>
                <Icon name="calendar" size={15} /> When
              </dt>
              <dd>
                {date ?? "Date to be announced"}
                {time && <> · {time}</>}
              </dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={15} /> Where
              </dt>
              <dd>{venue ?? "Venue to be announced"}</dd>
            </div>
          </dl>

          {countdownTo && <Countdown to={countdownTo} />}

          <div className={styles.actions}>
            {action.external ? (
              <a href={action.href} className="btn" target="_blank" rel="noopener noreferrer">
                {action.label} <Icon name="arrow" size={18} />
                <span className="visually-hidden"> (opens the registration form in a new tab)</span>
              </a>
            ) : (
              <Link href={action.href} className="btn">
                {action.label} <Icon name="arrow" size={18} />
              </Link>
            )}
            {action.href !== detailsHref && (
              <Link href={detailsHref} className="text-link">
                Event details
              </Link>
            )}
          </div>

          <button ref={backBtn} type="button" className={styles.flip} onClick={toggle} aria-expanded={true}>
            <span className="visually-hidden">Show the poster for {title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
