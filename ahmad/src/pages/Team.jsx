import { Link } from "react-router-dom";
import { advisor, core, departments, mentors } from "../data/content";
import { useTitle } from "../hooks";
import { initials } from "../lib";

function LinkedIn({ href, name }) {
  if (!href) return null;
  return (
    <a
      className="person-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`LinkedIn profile of ${name}`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5zM8.2 10.1H6.5V17h1.7v-6.9zM7.35 6.7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM17.5 17h-1.7v-3.4c0-.9-.3-1.5-1.1-1.5-.6 0-1 .4-1.1 1.2-.1.2-.1.6-.1.9V17H12v-6.9h1.6v.9c.3-.5 1-1.1 2.1-1.1 1.5 0 2.8 1 2.8 3.2V17z"
        />
      </svg>
    </a>
  );
}

function Portrait({ person }) {
  if (person.photo) {
    return <img src={person.photo} alt="" />;
  }
  return (
    <span className="name-mark" aria-hidden="true">
      {initials(person.name)}
    </span>
  );
}

function PersonCard({ person }) {
  return (
    <article className="person-card">
      <div className="person-photo">
        <Portrait person={person} />
        <LinkedIn href={person.linkedin} name={person.name} />
      </div>
      <div className="person-body">
        <h3>{person.name}</h3>
        <p className="person-role">{person.role}</p>
      </div>
    </article>
  );
}

export default function Team() {
  useTitle(
    "Team",
    "Faculty advisor, mentors, core team, and executive leads of AWS Student Builder Group at COMSATS Islamabad."
  );

  const executives = departments.flatMap((dept) => dept.people);

  return (
    <div className="page">
      <div className="roster-stage">
        <section className="section roster" id="faculty">
          <span className="roster-mark" aria-hidden="true">01</span>
          <div className="wrap">
            <header className="roster-head">
              <h2>Faculty Advisor</h2>
              <p>The steady hand on campus. The society’s work sits with his guidance.</p>
            </header>
            <div className="person-grid">
              <PersonCard person={advisor} />
            </div>
          </div>
        </section>

        <section className="section roster" id="mentors">
          <span className="roster-mark" aria-hidden="true">02</span>
          <div className="wrap">
            <header className="roster-head">
              <h2>Mentors</h2>
              <p>The people we ask when the docs run out.</p>
            </header>
            <div className="person-grid">
              {mentors.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </section>

        <section className="section roster" id="core">
          <span className="roster-mark" aria-hidden="true">06</span>
          <div className="wrap">
            <header className="roster-head">
              <h2>Core Team</h2>
              <p>Sets the direction and keeps every part of the society moving.</p>
            </header>
            <div className="person-grid">
              {core.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </section>

        <section className="section roster" id="executives">
          <span className="roster-mark" aria-hidden="true">18</span>
          <div className="wrap">
            <header className="roster-head">
              <h2>Executives — Leads & Co-Leads</h2>
              <p>Each person runs a desk. The role on the card is the desk.</p>
            </header>
            <div className="person-grid">
              {executives.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
            <p className="roster-action">
              <Link className="btn btn-light" to="/join">
                Apply to the team
              </Link>
            </p>
          </div>
        </section>

        <header className="page-head wrap team-intro">
          <div>
            <p className="kicker">Team</p>
            <h1>The people who keep the society moving.</h1>
            <p className="lede">
              A faculty advisor, mentors, the core team, and the leads who run each desk.
            </p>
            <dl className="team-counts">
              <div>
                <dt>Advisor</dt>
                <dd>01</dd>
              </div>
              <div>
                <dt>Mentors</dt>
                <dd data-count={mentors.length} data-pad="2">
                  {String(mentors.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt>Core</dt>
                <dd data-count={core.length} data-pad="2">
                  {String(core.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt>Executives</dt>
                <dd data-count={executives.length} data-pad="2">
                  {String(executives.length).padStart(2, "0")}
                </dd>
              </div>
            </dl>
          </div>
          <figure className="team-hero">
            <img
              src="/images/executives-team.jpg"
              alt="The executive team of AWS SBG CUI on the campus steps, with Executive AWS CUI across the photo."
              width="1024"
              height="902"
            />
            <figcaption>Executives, on the campus steps.</figcaption>
          </figure>
        </header>
      </div>
    </div>
  );
}
