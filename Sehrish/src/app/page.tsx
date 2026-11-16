import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { EventCard } from "@/components/EventCard";
import { EventActionButton, EventSpotlight, eventPrimaryAction, type EventAction } from "@/components/EventSpotlight";
import { Icon } from "@/components/Icon";
import { LeaderboardBoard } from "@/components/LeaderboardBoard";
import { Logo3D } from "@/components/Logo3D";
import { Splash } from "@/components/Splash";
import { LogoOrnament } from "@/components/LogoOrnament";
import { Pathways } from "@/components/Pathways";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredEvent, pastEvents, upcomingEvents } from "@/content/events";
import { FEATURES, PATHWAYS, SITE } from "@/content/site";
import styles from "./home.module.css";

export default function HomePage() {
  const featured = featuredEvent();
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const primary: EventAction = featured ? eventPrimaryAction(featured) : { href: "/events", label: "See events" };

  return (
    <>
      {/* Splash: the 3D logo assembles, the club name appears, then the site shows. */}
      <Splash nameWords={["AWS", "Student", "Builder", "Group"]} campus={SITE.university} />

      {/* ---------- Hero: identity + Community Day spotlight ---------- */}
      <section className={`band band--brand pixel-grid ${styles.hero}`}>
        <LogoOrnament size="34rem" left="-12rem" top="-10rem" duration={180} opacity={0.13} drift />
        <LogoOrnament size="14rem" right="38%" bottom="-5rem" duration={95} reverse opacity={0.1} />

        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">AWS Student Builder Group · CUI</span>
            <h1>
              Build what you <span className={styles.mark}>wish</span> existed.
            </h1>
            <p className={styles.heroLede}>
              A student community for cloud builders, curious minds, and people who would rather try it than just talk
              about it.
            </p>
            <div className="btn-row">
              <EventActionButton action={primary} />
              {FEATURES.findMyPhotos ? (
                <Link href="/photos" className="btn btn--secondary">
                  Find My Photos
                </Link>
              ) : (
                <a href="#about" className="btn btn--secondary">
                  Explore the community
                </a>
              )}
            </div>
          </div>

          <div className={styles.heroEvent}>
            <div className={styles.heroLogo}>
              <Logo3D />
            </div>
            {featured && <EventSpotlight event={featured} />}
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="band" aria-labelledby="about-title">
        <div className={`wrap ${styles.about}`}>
          <div>
            <span className="eyebrow">About the group</span>
            <h2 id="about-title">Not just learning AWS. Putting it to work.</h2>
          </div>
          <div className="prose">
            <p>
              <strong>{SITE.name}</strong> is run by students at {SITE.university}, for students. We learn cloud
              technology the practical way: pick something to build, get stuck, ask the person next to you, and ship
              it.
            </p>
            <p>
              Cloud is where we start, not where we stop. Sessions and projects reach into AI, security, analytics and
              plain good software, with mentors nearby for the parts the tutorials skip.
            </p>
            <div className={styles.terminal} role="group" aria-label="What members get">
              <p className={styles.prompt}>
                <span aria-hidden="true">$ </span>sbg members --get
              </p>
              <ul>
                <li>Hands-on sessions instead of slide marathons</li>
                <li>Peers who will debug alongside you</li>
                <li>Mentors who answer the awkward questions</li>
                <li>Events worth leaving your room for</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Pathways ---------- */}
      <section className={`band band--brand ${styles.paths}`} aria-labelledby="paths-title">
        <LogoOrnament size="18rem" right="-5rem" top="4rem" duration={110} opacity={0.12} />
        <div className="wrap">
          <SectionHeading eyebrow="Pick your path" title="Seven ways in. No wrong door." id="paths-title">
            Code is one route. So is a camera, a poster, or a spreadsheet that finally makes the event budget add up.
          </SectionHeading>
          <Pathways items={PATHWAYS} />
        </div>
      </section>

      {/* ---------- Events preview ---------- */}
      <section className="band" aria-labelledby="events-title">
        <div className="wrap">
          <SectionHeading eyebrow="Events" title="Your next checkpoint is on the calendar." id="events-title" />
          {upcoming.length > 0 ? (
            <div>
              {upcoming.slice(0, 3).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="lede">Nothing scheduled right now. New events show up here first.</p>
          )}
          <div className={styles.eventsFoot}>
            <p>
              {past.length > 0
                ? `${past.length} past ${past.length === 1 ? "event" : "events"} in the archive.`
                : "The past-events archive opens after our first event."}
            </p>
            <Link href="/events" className="text-link">
              All events
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Leaderboard preview ---------- */}
      <section className="band band--brand" aria-labelledby="board-title">
        <LogoOrnament size="22rem" left="-8rem" bottom="-9rem" duration={150} reverse opacity={0.12} drift />
        <div className={`wrap ${styles.board}`}>
          <div>
            <span className="eyebrow">Leaderboard · Top 5</span>
            <h2 id="board-title">A little friendly competition. A lot of learning.</h2>
            <p className={styles.boardText}>
              Check in, visit booths, answer quizzes, claim your certificate. Every verified action earns points, and
              the top of the board takes home swag.
            </p>
            <Link href="/leaderboard" className="btn btn--secondary">
              Full leaderboard &amp; quests
            </Link>
          </div>
          <LeaderboardBoard limit={5} />
        </div>
      </section>

      {/* ---------- Join ---------- */}
      <CtaSection
        eyebrow="Join the team"
        title="Got curiosity? There's room on the team."
        body="We recruit across tech, media, design and operations. You don't need to be an expert, you need to want to become one."
        href="/join"
        label="Apply to join"
      />
    </>
  );
}
