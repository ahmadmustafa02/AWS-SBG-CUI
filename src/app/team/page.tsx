import type { Metadata } from "next";
import { LogoOrnament } from "@/components/LogoOrnament";
import { TeamGroup } from "@/components/TeamGroup";
import { assertRosterComplete, membersIn, TEAM_GROUPS } from "@/content/team";
import styles from "./team.module.css";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The faculty advisor, mentors, core team and executives behind AWS Student Builder Group CUI.",
};

export default function TeamPage() {
  // Fails the build if anyone is missing, duplicated or in the wrong group.
  assertRosterComplete();

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="24rem" right="-7rem" top="-8rem" duration={150} opacity={0.13} />
        <div className="wrap">
          <span className="eyebrow">Our Team</span>
          <h1>The people behind the builds.</h1>
          <p className="lede">
            Hover over a card, or tap it, to read each person's intro.
          </p>
        </div>
      </section>

      <nav className={styles.jump} aria-label="Team sections">
        <ul className="wrap">
          {TEAM_GROUPS.map((g) => (
            <li key={g.anchor}>
              <a href={`#${g.anchor}`}>
                {g.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`band band--tight ${styles.groups}`}>
        <div className="wrap">
          {TEAM_GROUPS.map((g) => (
            <TeamGroup key={g.anchor} {...g} members={membersIn(g.name)} />
          ))}
          <p className={styles.archive}>
            <span className="pixel">Past teams</span> An archive by year opens here once this cohort hands over.
          </p>
        </div>
      </div>
    </>
  );
}
