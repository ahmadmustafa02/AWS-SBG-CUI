import { Link } from "react-router-dom";
import { eventPath, initials } from "../lib";
import { ArtSlot, IconArrow } from "./Marks";

export function PageHeader({ kicker, title, lede, art = "blocks", children }) {
  return (
    <header className={`page-head wrap${art ? " has-ridge" : ""}`}>
      {art ? <ArtSlot kind={art} /> : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </header>
  );
}

export function EventRow({ event }) {
  return (
    <Link className="event-row" to={eventPath(event)}>
      <div className="event-media">
        {event.cover ? (
          <img src={event.cover} alt="" />
        ) : (
          <div className="type-cover">
            <span>{event.format}</span>
          </div>
        )}
      </div>
      <div className="event-copy">
        <p className="event-kicker">{event.kicker}</p>
        <h2>{event.title}</h2>
        <p>{event.summary}</p>
      </div>
      <div className="event-meta">
        <strong>{event.dateLabel}</strong>
        <span>{event.venue}</span>
        {event.attendees ? <span>{event.attendees} attendees</span> : null}
        <span className="event-go">
          View <IconArrow />
        </span>
      </div>
    </Link>
  );
}

export function Avatar({ name }) {
  const hue = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 40;
  return (
    <span className="avatar" style={{ "--h": 250 + hue }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

export function PersonCard({ person, featured = false }) {
  return (
    <article className={featured ? "person is-featured" : "person"}>
      <Avatar name={person.name} />
      <div>
        <h3>{person.name}</h3>
        <p className="role">{person.role}</p>
        <p>{person.line}</p>
      </div>
    </article>
  );
}

export function SampleNote({ children }) {
  return (
    <p className="sample-note" role="note">
      {children}
    </p>
  );
}

export function ExternalLink({ href, children, className = "btn btn-ink" }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="sr"> (opens in a new tab)</span>
    </a>
  );
}

export function Field({ id, label, hint, error, required = false, children }) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p className="hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
