import { Link, Navigate, useParams } from "react-router-dom";
import { events } from "../data/content";
import { useTitle } from "../hooks";
import { eventPath } from "../lib";
import { ArtSlot } from "../components/Marks";

export default function EventDetail() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  useTitle(event?.title || "Event", event?.summary);

  if (!event) return <Navigate to="/events" replace />;
  if (event.slug === "community-day") return <Navigate to="/community-day" replace />;

  const more = events.filter((item) => item.slug !== event.slug).slice(0, 3);

  return (
    <article className="page">
      <header className="page-head wrap has-ridge">
        <ArtSlot kind="lane" />
        <p className="kicker">
          <Link to="/events">Events</Link>
          <span aria-hidden="true"> / </span>
          {event.kicker}
        </p>
        <h1>{event.title}</h1>
        <p className="lede">{event.summary}</p>
        <dl className="meta-row">
          <div>
            <dt>When</dt>
            <dd>
              {event.dateLabel}
              {event.time ? ` · ${event.time}` : ""}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{event.venue}</dd>
          </div>
          {event.host ? (
            <div>
              <dt>Host</dt>
              <dd>{event.host}</dd>
            </div>
          ) : null}
          {event.attendees ? (
            <div>
              <dt>Attendees</dt>
              <dd>{event.attendees}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      {event.cover ? (
        <div className="wrap">
          <figure className="cover-frame">
            <img src={event.cover} alt={event.coverAlt || ""} />
          </figure>
        </div>
      ) : null}

      <div className="wrap detail-grid">
        <div className="prose">
          {event.dateNote ? <p className="callout">{event.dateNote}</p> : null}
          {event.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {event.topics?.length ? (
            <>
              <h2>Topics</h2>
              <ul className="pill-list">
                {event.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </>
          ) : null}
          {event.expect?.length ? (
            <>
              <h2>What was on the table</h2>
              <ul>
                {event.expect.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          {event.links?.length ? (
            <p className="about-links">
              {event.links.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <span className="sr"> (opens in a new tab)</span>
                </a>
              ))}
            </p>
          ) : null}
        </div>
        {event.winners?.length ? (
          <aside className="winner-card">
            <p className="kicker">Tech Fest board</p>
            <h2>Placed</h2>
            <ol>
              {event.winners.map((winner) => (
                <li key={winner.name}>
                  <span>{winner.place}</span>
                  <strong>{winner.name}</strong>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>

      {event.photos?.length > 1 ? (
        <div className="wrap page-block">
          <h2 className="block-title">Photographs</h2>
          <div className="photo-grid">
            {event.photos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      <div className="wrap page-block">
        <h2 className="block-title">More from the year</h2>
        <div className="home-sessions">
          {more.map((item) => (
            <Link key={item.slug} className="mini-session" to={eventPath(item)}>
              <p className="event-kicker">{item.dateLabel}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
