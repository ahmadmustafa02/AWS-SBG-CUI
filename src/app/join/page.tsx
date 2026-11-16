import type { Metadata } from "next";
import { JoinForm } from "@/components/JoinForm";
import { LogoOrnament } from "@/components/LogoOrnament";
import { StateBlock } from "@/components/StateBlock";
import { RECRUITMENT } from "@/content/site";
import { apiConfigured } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Join the Team",
  description: "Apply to join AWS Student Builder Group CUI.",
};

export default function JoinPage() {
  const deadlinePassed = RECRUITMENT.deadline ? new Date(RECRUITMENT.deadline).getTime() < Date.now() : false;
  const open = RECRUITMENT.open && !deadlinePassed;

  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="22rem" right="-6rem" top="-7rem" duration={130} reverse opacity={0.13} />
        <div className="wrap">
          <span className="eyebrow">Become a part of the team</span>
          <h1>Got curiosity? There&apos;s room on the team.</h1>
          <p className="lede">
            Tell us who you are and where you&apos;d like to pitch in. Skill matters less than showing up and wanting
            to learn.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className={`wrap ${styles.split}`}>
          <aside className={styles.side}>
            <span className={`status ${open ? "status--open" : "status--closed"}`}>
              {open ? "Applications open" : "Applications closed"}
            </span>
            <dl className={styles.facts}>
              <div>
                <dt>Deadline</dt>
                <dd>{RECRUITMENT.deadline ? formatEventDate(RECRUITMENT.deadline) : "To be announced"}</dd>
              </div>
              <div>
                <dt>Teams recruiting</dt>
                <dd>{RECRUITMENT.teams.join(" · ")}</dd>
              </div>
              <div>
                <dt>What happens next</dt>
                <dd>The core team reviews applications after the deadline and contacts shortlisted applicants.</dd>
              </div>
            </dl>
            {!apiConfigured && open && (
              <p className={styles.fine}>
                Heads up: the application service is not connected yet. You can fill in the form, but it cannot be
                submitted for now.
              </p>
            )}
          </aside>

          <div>
            {open ? (
              <JoinForm teams={RECRUITMENT.teams} />
            ) : (
              <StateBlock kind="empty" title="Recruitment is closed for now">
                We open applications once per cycle. Follow the group on LinkedIn to hear when the next round starts.
              </StateBlock>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
