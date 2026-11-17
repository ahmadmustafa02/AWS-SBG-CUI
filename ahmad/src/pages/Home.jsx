import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  communityDayStart,
  events,
  gallery,
  links,
  listedAttendees,
  pastCount,
  teamSize,
  tracks,
} from "../data/content";
import { useCountdown, useTitle } from "../hooks";
import { eventPath } from "../lib";
import { ArtSlot, IslamabadWord, LogoOutline, LogoStack, Skyline } from "../components/Marks";
import { ExternalLink } from "../components/Ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function pad(value) {
  return String(value).padStart(2, "0");
}

function DeskArt({ n, on = "dark" }) {
  const ink = on === "dark" ? "#c9b8ff" : "#312b52";
  const mid = on === "dark" ? "#8d86c4" : "#5b45d6";
  const deep = on === "dark" ? "#6a63a4" : "#3c3668";
  const props = { viewBox: "0 0 96 64", width: 92, height: 60, "aria-hidden": true };
  if (n === "01") {
    return (
      <svg {...props}>
        <path fill={deep} d="M6 50h58a14 14 0 0 0 2-27.8 20 20 0 0 0-38-7 16 16 0 0 0-26 10A12 12 0 0 0 6 50Z" />
        <path fill={ink} d="M34 44h48a10 10 0 0 0 1-19.8 15 15 0 0 0-28-5 11 11 0 0 0-20 7A9 9 0 0 0 34 44Z" />
      </svg>
    );
  }
  if (n === "02") {
    return (
      <svg {...props}>
        <circle cx="22" cy="40" r="12" fill={deep} />
        <circle cx="48" cy="18" r="12" fill={mid} />
        <circle cx="74" cy="42" r="12" fill={ink} />
      </svg>
    );
  }
  if (n === "03") {
    return (
      <svg {...props}>
        <rect x="10" y="28" width="14" height="26" rx="3" fill={deep} />
        <rect x="34" y="12" width="14" height="42" rx="3" fill={mid} />
        <rect x="58" y="20" width="14" height="34" rx="3" fill={ink} />
      </svg>
    );
  }
  if (n === "04") {
    return (
      <svg {...props}>
        <rect x="14" y="10" width="40" height="46" rx="3" fill={deep} transform="rotate(-8 34 33)" />
        <rect x="36" y="8" width="40" height="46" rx="3" fill={ink} />
        <path fill={mid} d="M46 18h20M46 26h16M46 34h18" stroke={mid} strokeWidth="3" />
      </svg>
    );
  }
  if (n === "05") {
    return (
      <svg {...props}>
        <rect x="16" y="8" width="64" height="48" rx="6" fill={deep} />
        <circle cx="48" cy="32" r="14" fill={ink} />
        <circle cx="48" cy="32" r="6" fill={mid} />
      </svg>
    );
  }
  if (n === "06") {
    return (
      <svg {...props}>
        <rect x="8" y="18" width="22" height="30" rx="6" fill={deep} />
        <rect x="36" y="10" width="22" height="38" rx="6" fill={mid} />
        <rect x="64" y="22" width="22" height="26" rx="6" fill={ink} />
      </svg>
    );
  }
  if (n === "07") {
    return (
      <svg {...props}>
        <rect x="8" y="28" width="18" height="26" rx="3" fill={deep} />
        <rect x="70" y="28" width="18" height="26" rx="3" fill={deep} />
        <path fill={ink} d="M26 36h44v8H26z" />
        <path fill={mid} d="M30 36c0-14 10-22 18-22s18 8 18 22H30z" />
      </svg>
    );
  }
  if (n === "08") {
    return (
      <svg {...props}>
        <rect x="18" y="8" width="6" height="48" rx="2" fill={deep} />
        <path fill={ink} d="M24 10h46l-10 12 10 12H24z" />
        <rect x="40" y="44" width="40" height="8" rx="2" fill={mid} />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <rect x="8" y="12" width="80" height="10" rx="3" fill={deep} />
      <rect x="8" y="28" width="52" height="10" rx="3" fill={mid} />
      <rect x="8" y="44" width="68" height="10" rx="3" fill={ink} />
    </svg>
  );
}

export default function Home() {
  const root = useRef(null);
  const count = useCountdown(communityDayStart);
  useTitle(
    "",
    "AWS Student Builder Group at COMSATS University Islamabad. Workshops, quizzes, and Student Community Day."
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".line-in", { yPercent: 110, filter: "blur(8px)", duration: 0.9, stagger: 0.08, clearProps: "filter" })
        .from(".hero-fade", { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, 0.28)
        .from(".pass-wrap", { autoAlpha: 0, duration: 0.7 }, 0.35);

      gsap.to(".skyline-wrap", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: root }
  );

  const featured = [...events].sort((a, b) => b.sort.localeCompare(a.sort)).slice(0, 4);
  const photos = gallery.slice(0, 4);
  const places = ["1st", "2nd", "3rd", "4th", "5th"];

  return (
    <div ref={root}>
      <section className="hero">
        <LogoOutline className="hero-ornament hero-ornament-a" />
        <LogoOutline className="hero-ornament hero-ornament-b" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker hero-fade">COMSATS University Islamabad</p>
            <h1 className="display">
              <span className="line">
                <span className="line-in">AWS Student</span>
              </span>
              <span className="line">
                <span className="line-in accent">Builder Group</span>
              </span>
            </h1>
            <div className="hero-fade">
              <IslamabadWord />
            </div>
            <p className="lede hero-fade">
              A student-led cloud community on campus. Workshops, quizzes, and build
              sessions for people who want AWS in their hands. Community Day is 24
              November.
            </p>
            <div className="hero-actions hero-fade">
              <Link className="btn btn-light" to="/events">
                Explore events
              </Link>
              <Link className="text-link" to="/team">
                Meet the team
              </Link>
            </div>
          </div>
          <div className="pass-wrap">
          <LogoStack />
          <div className="pass-flip">
          <article className="pass">
            <div className="pass-art" aria-hidden="true">
              <svg viewBox="0 0 240 96" fill="currentColor">
                <path d="M8 90V42h4v48H8zm220 0V42h4v48h-4zM18 90V36h3v54h-3zm198 0V36h3v54h-3z" />
                <path d="M28 90 48 28l20 62H28z" />
                <path d="M46 28h4L48 18l-2 10z" />
                <path d="M78 90V58h16v32H78zm22 0V46h10v44h-10zm16 0V62h22v28h-22zm28 0V50h12v40h-12zm18 0V64h26v26h-26z" />
                <path d="M168 90V40h8v50h-8zm14 0V28h18v62h-18zm6-62h6v-8h-6v8z" />
                <path d="M210 90V54h18v36h-18z" />
              </svg>
            </div>
            <div className="pass-body">
            <p className="pass-kicker">Featured event</p>
            <p className="pass-status">Registration open</p>
            <h2>AWS Student Community Day Islamabad 2026</h2>
            <dl className="pass-facts">
              <div>
                <dt>When</dt>
                <dd>Tue, 24 November 2026</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Islamabad (venue to be announced)</dd>
              </div>
            </dl>
            {count.past ? (
              <p className="pass-live">The day is here.</p>
            ) : (
              <div className="count" aria-label="Time until AWS Student Community Day">
                <span>
                  {pad(count.days)}
                  <small>Days</small>
                </span>
                <span>
                  {pad(count.hours)}
                  <small>Hrs</small>
                </span>
                <span>
                  {pad(count.minutes)}
                  <small>Min</small>
                </span>
                <span>
                  {pad(count.seconds)}
                  <small>Sec</small>
                </span>
              </div>
            )}
            <div className="pass-actions">
              <ExternalLink href={links.register}>Register now</ExternalLink>
              <Link className="text-link dark" to="/community-day">
                Event details
              </Link>
            </div>
            </div>
          </article>
          <div className="pass-back">
            <img
              src="/images/poster-community-day.jpg"
              alt="Poster for AWS Student Community Day Islamabad"
            />
          </div>
          </div>
          </div>
        </div>
        <div className="skyline-wrap">
          <Skyline />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, copy) => (
            <p key={copy}>
              <span>Cloud</span>
              <span>Artificial intelligence</span>
              <span>Data</span>
              <span>Security</span>
              <span>Architecture</span>
              <span>Quizzes</span>
              <span>Workshops</span>
              <span>Community Day</span>
              <span>Learn. Build. Grow.</span>
            </p>
          ))}
        </div>
      </div>

      <section className="section" id="about">
        <div className="wrap society">
          <div className="society-copy">
            <p className="kicker">The society</p>
            <h2>A campus group that builds on AWS.</h2>
            <p className="lede">
              Students at COMSATS University Islamabad run the workshops, quizzes, and
              build sessions.
            </p>
            <div className="society-term" role="group" aria-label="What members get">
              <p className="society-prompt">
                <span aria-hidden="true">$ </span>sbg members --get
              </p>
              <ul>
                <li>Hands-on sessions instead of slide marathons</li>
                <li>Peers who will debug alongside you</li>
                <li>Mentors who answer the awkward questions</li>
                <li>Events worth leaving your room for</li>
              </ul>
            </div>
            <p className="society-links">
              <ExternalLink className="text-link" href={links.program}>
                The AWS Student Builder program
              </ExternalLink>
            </p>
          </div>
          <figure className="society-photo">
            <img
              src="/images/kickoff-crowd.jpg"
              alt="Students facing the kickoff stage, purple balloons tied along the covered court."
              width="1200"
              height="800"
            />
            <figcaption>Community kickoff</figcaption>
          </figure>
          <dl className="society-stats">
            <div>
              <dt>Community Day</dt>
              <dd>24 Nov</dd>
            </div>
            <div>
              <dt>Events held</dt>
              <dd data-count={pastCount()}>{pastCount()}</dd>
            </div>
            <div>
              <dt>Attendees counted</dt>
              <dd data-count={listedAttendees()} data-suffix="+">
                {listedAttendees()}+
              </dd>
            </div>
            <div>
              <dt>On the team</dt>
              <dd data-count={teamSize()}>{teamSize()}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section has-ridge" id="tracks">
        <ArtSlot place="tracks" kind="ridge" />
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Where you fit</p>
            <h2>Code is three of the desks.</h2>
            <p className="lede">
              Cloud, artificial intelligence, and data build the work. Graphics, media,
              social, PR, marketing, and operations get it into the room.
            </p>
          </div>
          <div className="track-stage">
            <ol className="subject-board">
              {tracks.slice(0, 3).map((track) => (
                <li key={track.n}>
                  <span className="desk-art">
                    <DeskArt n={track.n} />
                  </span>
                  <span className="subject-num" aria-hidden="true">
                    {track.n}
                  </span>
                  <h3>{track.title}</h3>
                  <p>{track.text}</p>
                </li>
              ))}
            </ol>
            <div className="meet-board">
              <p className="meet-label">The other desks</p>
              <ol>
                {tracks.slice(3).map((track) => (
                  <li key={track.n}>
                    <span className="desk-art">
                      <DeskArt n={track.n} on="paper" />
                    </span>
                    <span>{track.n}</span>
                    <h3>{track.title}</h3>
                    <p>{track.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section has-ridge" id="sessions">
        <ArtSlot place="lead" kind="blocks" />
        <div className="wrap">
          <div className="section-head split">
            <div>
              <p className="kicker">The year</p>
              <h2>Events, newest first.</h2>
            </div>
            <Link className="text-link" to="/events">
              All events
            </Link>
          </div>
          <div className="home-sessions">
            {featured.map((event) => (
              <Link key={event.slug} className="mini-session" to={eventPath(event)}>
                <div className="mini-media">
                  {event.cover ? <img src={event.cover} alt="" /> : <span>Online</span>}
                </div>
                <p className="event-kicker">
                  {event.status === "upcoming" ? "Upcoming" : event.kicker}
                </p>
                <h3>{event.title}</h3>
                <p>{event.dateLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section board-band">
        <div className="wrap quest-tease">
          <div>
            <p className="kicker">Leaderboard · top 5</p>
            <h2>Show up. Score points. Take the swag.</h2>
            <p className="lede">
              Check in, visit a booth, answer a quiz, or post a photo. Every verified
              action scores, and the top of the board takes the swag.
            </p>
            <Link className="btn btn-light" to="/quests">
              Open the board
            </Link>
          </div>
          <div className="board-card">
            <ol className="podium">
              {places.map((place) => (
                <li key={place}>
                  <span>{place}</span>
                  <span className="slot" />
                  <em>—</em>
                </li>
              ))}
            </ol>
            <p className="board-note">
              No scores yet. They appear once Community Day check-in is verified.
            </p>
          </div>
        </div>
      </section>

      <section className="section has-ridge">
        <ArtSlot place="inset" kind="hills" />
        <div className="wrap">
          <div className="section-head split">
            <div>
              <p className="kicker">In the room</p>
              <h2>From the year so far.</h2>
            </div>
            <Link className="text-link" to="/gallery">
              Gallery
            </Link>
          </div>
          <div className="year-grid">
            {photos.map((photo, index) => (
              <figure key={photo.src}>
                <div className="shot">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section join-close" id="join-team">
        <div className="wrap cta-band">
          <div className="cta-copy">
            <p className="kicker">Join the team</p>
            <h2>Got curiosity? There is room on the team.</h2>
            <p className="lede">
              We recruit across tech, media, design, and operations. You do not need to
              be an expert. You need to want to become one.
            </p>
            <Link className="btn btn-light" to="/join">
              Become part of the team
            </Link>
          </div>
          <figure className="cta-frame">
            <img
              src="/images/executives.jpg?v=3"
              alt="The student team on the campus steps"
              width="1024"
              height="881"
            />
            <figcaption className="cta-chip">{teamSize()} students on the team</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
