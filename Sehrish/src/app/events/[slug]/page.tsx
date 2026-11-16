import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmbassadorFloat } from "@/components/AmbassadorFloat";
import { Countdown } from "@/components/Countdown";
import { EventActions } from "@/components/EventActions";
import { EventActionButton, eventPrimaryAction } from "@/components/EventSpotlight";
import { Icon } from "@/components/Icon";
import { LogoOrnament } from "@/components/LogoOrnament";
import { SpeakerCard } from "@/components/SpeakerCard";
import { eventBySlug, EVENTS, isPast } from "@/content/events";
import { FEATURES } from "@/content/site";
import { formatEventDate, formatEventTime, REGISTRATION_LABEL } from "@/lib/format";
import styles from "../../inner.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const event = eventBySlug((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventPage({ params }: Params) {
  const event = eventBySlug((await params).slug);
  if (!event) notFound();

  const past = isPast(event);
  const date = formatEventDate(event.startsAt);
  const time = event.dateOnly ? undefined : formatEventTime(event.startsAt);
  const action = eventPrimaryAction(event);
  const canRegister = !past && action.label === "Register now";
  const statusClass = past ? "status--closed" : event.registration === "open" ? "status--open" : event.registration === "coming-soon" ? "status--soon" : "status--closed";
  const speakers = event.speakers ?? [];
  const ambassadors = event.ambassadors ?? [];
  const collaborators = event.collaborators ?? [];

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="24rem" right="-8rem" top="-8rem" duration={150} opacity={0.13} />
        <div className="wrap">
          <Link href="/events" className="eyebrow" style={{ textDecoration: "none" }}>
            ← All events
          </Link>
          <h1>{event.title}</h1>
          <p className="lede">{event.summary}</p>
          {canRegister && (
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <EventActionButton action={action} />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Details ---------- */}
      <section className="band band--tight">
        <div className={`wrap ${styles.detailGrid}`}>
          <div>
            {past ? (
              <div className={styles.block}>
                <h2>Recap</h2>
                {event.recap ? <div className="prose"><p>{event.recap}</p></div> : <p>The recap is being written. Check back soon.</p>}
                <div className="btn-row">
                  {event.albumId && (
                    <Link href={`/photos?event=${event.id}`} className="btn btn--secondary">
                      Find My Photos
                    </Link>
                  )}
                  {event.certificatesAvailable && (
                    <Link href="/certificates" className="btn btn--secondary">
                      Claim your certificate
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <>
                {event.highlights?.length ? (
                  <div className={styles.block}>
                    <h2>What to expect</h2>
                    <p>
                      Whether you&apos;re just starting with the cloud or already building on AWS, this is a day to
                      learn, build and meet the people doing the same.
                    </p>
                    <ul className={styles.checks}>
                      {event.highlights.map((h) => (
                        <li key={h}>
                          <Icon name="check" />
                          <span>
                            <strong>{h}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className={styles.block}>
                  <h2>Agenda</h2>
                  {event.agenda?.length ? (
                    <ol className={styles.agenda}>
                      {event.agenda.map((a) => (
                        <li key={a.title}>
                          <span>{a.time ?? "TBA"}</span>
                          <span>
                            <strong>{a.title}</strong>
                            {a.speaker && <small>{a.speaker}</small>}
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>Details coming soon. The agenda is published here as soon as sessions are confirmed.</p>
                  )}
                </div>
              </>
            )}
          </div>

          <aside className={styles.panel} aria-label="Event details">
            {event.posterUrl ? (
              <Image
                src={event.posterUrl}
                alt={`Poster for ${event.title}`}
                width={1080}
                height={1350}
                sizes="(min-width: 60rem) 19rem, 90vw"
                className={styles.posterImg}
                priority
              />
            ) : event.bannerUrl ? (
              <Image src={event.bannerUrl} alt={`${event.title} banner`} width={1200} height={630} className={styles.posterImg} priority />
            ) : null}

            <span className={`status ${statusClass}`}>{past ? "Event completed" : REGISTRATION_LABEL[event.registration]}</span>
            <dl className={styles.facts} style={{ marginTop: 0 }}>
              <div>
                <dt>Date</dt>
                <dd>{date ?? "To be announced"}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{time ?? "To be announced"}</dd>
              </div>
              <div>
                <dt>{event.onlineUrl && !event.venue ? "Online" : "Venue"}</dt>
                <dd>
                  {event.venue ??
                    (event.onlineUrl ? (
                      <a className="text-link" href={event.onlineUrl} target="_blank" rel="noopener noreferrer">
                        Join link
                      </a>
                    ) : (
                      "To be announced"
                    ))}
                </dd>
              </div>
              {event.capacity && (
                <div>
                  <dt>Capacity</dt>
                  <dd>{event.capacity} seats</dd>
                </div>
              )}
            </dl>

            {!past && <Countdown to={event.startsAt} />}

            {!past &&
              (canRegister ? (
                <EventActionButton action={action} />
              ) : (
                <>
                  <button type="button" className="btn" disabled aria-describedby="reg-note">
                    <Icon name="lock" size={16} /> Register
                  </button>
                  <p id="reg-note">
                    {event.registration === "closed" ? "Registration for this event has closed." : "Registration isn't open yet."}
                  </p>
                </>
              ))}

            <EventActions event={event} />

            {!FEATURES.findMyPhotos && (
              <p>
                <Link href="/photos" className="text-link">
                  Find My Photos
                </Link>{" "}
                opens after the event.
              </p>
            )}
          </aside>
        </div>
      </section>

      {!past && (
        <>
          {/* ---------- Speakers: flip cards ---------- */}
          <section className="band band--brand" aria-labelledby="speakers-title">
            <LogoOrnament size="20rem" left="-7rem" bottom="-8rem" duration={150} reverse opacity={0.12} />
            <div className="wrap">
              <div className="section-heading">
                <span className="eyebrow">Speakers</span>
                <h2 id="speakers-title">The people on stage.</h2>
                {speakers.length > 0 && <p>Hover over a card, or tap it, for the talk, its time slot and the speaker&apos;s LinkedIn.</p>}
              </div>
              {speakers.length > 0 ? (
                <ul className={styles.cardRow}>
                  {speakers.map((s) => (
                    <li key={s.id}>
                      <SpeakerCard speaker={s} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.tba}>
                  <span className="pixel">To be announced</span>
                  We name speakers once each one is confirmed, not before. Their cards appear here.
                </p>
              )}
            </div>
          </section>

          {/* ---------- Campus ambassadors: floating name tags ---------- */}
          <section className="band band--tight" aria-labelledby="ambassadors-title">
            <div className="wrap">
              <div className="section-heading">
                <span className="eyebrow">Campus Ambassadors</span>
                <h2 id="ambassadors-title">Carrying the word across campuses.</h2>
              </div>
              {ambassadors.length === 0 && (
                <p className={styles.tba}>
                  <span className="pixel">To be announced</span>
                  Ambassadors and their universities will float through here once the list is final.
                </p>
              )}
            </div>
            {ambassadors.length > 0 && <AmbassadorFloat people={ambassadors} />}
          </section>

          {/* ---------- Collaborators ---------- */}
          <section className="band band--tight band--slate" aria-labelledby="collab-title">
            <div className="wrap">
              <div className="section-heading">
                <span className="eyebrow">Collaborators</span>
                <h2 id="collab-title">Built together with.</h2>
              </div>
              {collaborators.length > 0 ? (
                <ul className={styles.collabs}>
                  {collaborators.map((c) => {
                    const inner = c.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.logoUrl} alt={c.name} loading="lazy" />
                    ) : (
                      <strong>{c.name}</strong>
                    );
                    return (
                      <li key={c.name}>
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">
                            {inner}
                          </a>
                        ) : (
                          <span>{inner}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={styles.tba}>
                  <span className="pixel">To be announced</span>
                  Partner communities and organisations will be listed here as they are confirmed.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
