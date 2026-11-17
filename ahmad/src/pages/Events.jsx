import { useMemo, useState } from "react";
import { events } from "../data/content";
import { useTitle } from "../hooks";
import { EventRow } from "../components/Ui";

const filters = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

export default function Events() {
  const [filter, setFilter] = useState("all");
  useTitle(
    "Events",
    "Workshops, quizzes, and Community Day from AWS Student Builder Group at COMSATS Islamabad."
  );

  const groups = useMemo(() => {
    const list = events.filter((event) => filter === "all" || event.status === filter);
    const upcoming = list
      .filter((event) => event.status === "upcoming")
      .sort((a, b) => a.sort.localeCompare(b.sort));
    const dated = list
      .filter((event) => event.status === "past" && event.date)
      .sort((a, b) => b.sort.localeCompare(a.sort));
    const undated = list
      .filter((event) => event.status === "past" && !event.date)
      .sort((a, b) => b.sort.localeCompare(a.sort));
    return [
      { id: "upcoming", title: "Coming up", items: upcoming },
      { id: "past", title: "Already held", items: dated },
      { id: "undated", title: "Held in 2026 · exact day not on the listing", items: undated },
    ].filter((group) => group.items.length);
  }, [filter]);

  const showing = groups.reduce((sum, group) => sum + group.items.length, 0);
  const coming = groups.find((group) => group.id === "upcoming")?.items.length || 0;
  const held = showing - coming;

  return (
    <div className="page session-page">
      <header className="session-hero">
        <div className="wrap session-intro">
          <div>
            <p className="kicker">Events</p>
            <h1>What the society has actually run.</h1>
            <p className="lede">
              Community Day is next. Behind it is a year of kickoff, orientation, workshops, and a
              180-question quiz at Tech Fest.
            </p>
            <div className="filters" role="group" aria-label="Filter events">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="chip"
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <aside className="session-count" aria-label="Events on this page">
            <p>
              <strong>{String(coming).padStart(2, "0")}</strong>
              <span>Coming up</span>
            </p>
            <p>
              <strong>{String(held).padStart(2, "0")}</strong>
              <span>Already held</span>
            </p>
            <p>
              <strong>{String(showing).padStart(2, "0")}</strong>
              <span>Showing</span>
            </p>
          </aside>
        </div>
      </header>

      <div className="wrap session-body">
        {groups.map((group) => (
          <section key={group.id} className="event-group">
            <h2>{group.title}</h2>
            <div className={group.id === "upcoming" ? "session-feature" : "session-grid"}>
              {group.items.map((event) => (
                <EventRow key={event.slug} event={event} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
