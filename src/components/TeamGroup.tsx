import type { TeamGroupName, TeamMember } from "@/content/types";
import { TeamCard } from "./TeamCard";
import styles from "./TeamGroup.module.css";

type Props = {
  name: TeamGroupName;
  anchor: string;
  heading: string;
  note: string;
  members: TeamMember[];
};

const VARIANT: Record<TeamGroupName, string> = {
  "Faculty Advisor": "advisor",
  Mentors: "mentors",
  "Core Team": "core",
  Executives: "executives",
};

export function TeamGroup({ name, anchor, heading, note, members }: Props) {
  return (
    <section id={anchor} className={styles.group} data-variant={VARIANT[name]} aria-labelledby={`${anchor}-title`}>
      <header className={styles.head}>
        <h2 id={`${anchor}-title`}>{heading}</h2>
        <p>{note}</p>
      </header>
      <ul className={styles.grid}>
        {members.map((m) => (
          <li key={m.id}>
            <TeamCard member={m} />
          </li>
        ))}
      </ul>
    </section>
  );
}
