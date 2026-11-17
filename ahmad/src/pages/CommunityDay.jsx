import { Link } from "react-router-dom";
import {
  agenda,
  communityDayStart,
  links,
  partnerPerks,
  sponsorPerks,
} from "../data/content";
import { useCountdown, useTitle } from "../hooks";
import { ExternalLink } from "../components/Ui";

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function CommunityDay() {
  const count = useCountdown(communityDayStart);
  useTitle(
    "Community Day",
    "AWS Student Community Day Islamabad is 24 November 2026. Workshops, talks, swag, and registration."
  );

  return (
    <div className="page">
      <header className="day-hero">
        <div className="wrap day-hero-grid">
        <div>
          <p className="kicker">24 November 2026 · Islamabad</p>
          <h1>
            AWS Student
            <span> Community Day</span>
          </h1>
          <p className="lede">
            One day for students, developers, and people from industry. Workshops,
            a panel, booths, swag, and a participation certificate after you are
            checked in.
          </p>
          <p className="callout">
            The day was first set for 11 November 2026. It now runs on 24 November,
            in Islamabad.
          </p>
          {count.past ? (
            <p className="pass-live">Happening now.</p>
          ) : (
            <div className="count count-dark" aria-label="Time until Community Day">
              <span>
                {pad(count.days)}
                <small>Days</small>
              </span>
              <span>
                {pad(count.hours)}
                <small>Hours</small>
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
          <div className="hero-actions">
            <ExternalLink href={links.register} className="btn btn-light">
              Register
            </ExternalLink>
            <Link className="btn btn-ghost" to="/quests">
              Leaderboard and swag
            </Link>
          </div>
        </div>
        <figure className="poster">
          <img
            src="/images/poster-community-day.jpg"
            alt="Poster for AWS Student Community Day Islamabad, with the Faisal Mosque mark between ISLA and ABAD."
          />
        </figure>
        </div>
      </header>

      <section className="day-room" id="room">
        <div className="wrap">
          <header className="program-head">
            <div>
              <p className="kicker">In the room</p>
              <h2>What the day is for.</h2>
            </div>
            <p>
              Six reasons to be in the building. Hands first, then the people, then
              the proof you were there.
            </p>
          </header>
          <ol className="day-sheet">
            {[
              ["Workshops", "Hands-on blocks, not a slide you forget in the parking lot."],
              ["A panel", "People who already ship, taking questions from the room."],
              ["AWS, practiced", "Architecture, services, and the path off localhost."],
              ["Swag", "The leaderboard is public. The top of it leaves with something."],
              ["The hallway", "Students, developers, and industry in the same building."],
              ["A certificate", "Participation, after check-in is verified. Request it on this site."],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="day-run" id="run">
        <div className="wrap program-run">
          <header>
            <p className="kicker">Draft run of show</p>
            <h2>A draft day. Times move when the final grid is locked.</h2>
            <p>
              This schedule is a working shape so the page has a spine. Replace it
              with the locked agenda when speakers and rooms are final.
            </p>
          </header>
          <ol className="agenda">
            {agenda.map((item) => (
              <li key={item.time}>
                <time dateTime={item.time}>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap partner-grid">
          <article className="partner-card">
            <img
              src="/images/poster-sponsors.jpg"
              alt="Call for sponsors poster, an invitation rising out of a purple envelope."
              loading="lazy"
            />
            <div>
              <p className="kicker">Sponsors</p>
              <h2>Put a brand in the room.</h2>
              <ul>
                {sponsorPerks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <ExternalLink className="btn btn-light" href={links.sponsors}>Register as a sponsor</ExternalLink>
            </div>
          </article>
          <article className="partner-card">
            <img
              src="/images/poster-partners.jpg"
              alt="Call for community partners poster, two hands reaching toward each other above a QR code."
              loading="lazy"
            />
            <div>
              <p className="kicker">Community partners</p>
              <h2>Bring your community with you.</h2>
              <ul>
                {partnerPerks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <ExternalLink className="btn btn-light" href={links.partners}>Register as a partner</ExternalLink>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap register-band">
          <img
            src="/images/poster-register.jpg"
            alt="Poster that says registration is officially open, with a phone framing a QR code."
            loading="lazy"
          />
          <div>
            <p className="kicker">Seats</p>
            <h2>Registration is open.</h2>
            <p className="lede">
              Students, developers, community leads, and people from industry. The
              form lives on the registration link. The leaderboard and certificates on this
              site are the day-of layer, still in design.
            </p>
            <ExternalLink href={links.register} className="btn btn-light">
              Register through the form
            </ExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}
