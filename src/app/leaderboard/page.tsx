import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { LeaderboardSection } from "@/components/LeaderboardSection";
import { LogoOrnament } from "@/components/LogoOrnament";
import { StateBlock } from "@/components/StateBlock";
import { EVENTS } from "@/content/events";
import { FEATURES, QUESTS } from "@/content/site";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Leaderboard & Quests",
  description: "Points, quests and rankings for AWS Student Builder Group CUI events.",
};

export default function LeaderboardPage() {
  return (
    <>
      <section className="band band--brand pixel-grid page-head">
        <LogoOrnament size="24rem" left="-8rem" top="-9rem" duration={160} reverse opacity={0.12} />
        <div className="wrap">
          <span className="eyebrow">Leaderboard &amp; quests</span>
          <h1>A little friendly competition. A lot of learning.</h1>
          <p className="lede">
            Points come only from things we can verify: a scan, a quiz answer, an approved upload. No honour system, no
            arguments.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap">
          <div className={styles.block}>
            <h2>Leaderboard</h2>
            <LeaderboardSection events={EVENTS.map((e) => ({ id: e.id, title: e.title }))} />
          </div>

          <div className={styles.block} id="quests">
            <h2>Quests</h2>
            <p>
              Every quest, what it&apos;s worth, and how it&apos;s checked. Values can change before an event; this
              table is always the current one.
            </p>
            <div className="table-scroll">
              <table className="table">
                <caption className="visually-hidden">Active quests and the points each one awards</caption>
                <thead>
                  <tr>
                    <th scope="col">Quest</th>
                    <th scope="col">Verified by</th>
                    <th scope="col">Points</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Your status</th>
                  </tr>
                </thead>
                <tbody>
                  {QUESTS.map((q) => (
                    <tr key={q.id}>
                      <td>
                        <strong>{q.action}</strong>
                      </td>
                      <td>{q.verifiedBy}</td>
                      <td className="num">+{q.points}</td>
                      <td>{q.limit}</td>
                      <td>
                        <span className="status status--closed">{FEATURES.accounts ? "Not started" : "Sign-in required"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!FEATURES.accounts && (
              <p className={styles.fine}>
                Personal quest status (not started, pending review, done), points history and badges appear here once
                student accounts are live.
              </p>
            )}
          </div>

          <div className={styles.block}>
            <h2>The rules</h2>
            <ul className={styles.checks}>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Verified actions only.</strong> Booth codes rotate or are scanned by staff, so a photo of a
                  QR code earns nothing.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>One account per university email.</strong> Duplicates are merged or removed.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>The board freezes at a published cut-off.</strong> Ties go to whoever reached the score
                  first.
                </span>
              </li>
              <li>
                <Icon name="check" />
                <span>
                  <strong>Manual adjustments are logged.</strong> If an admin changes points, the reason is recorded.
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>Swag</h2>
            <StateBlock kind="coming-soon" title="Swag rules are on their way">
              The organizers will publish how many winners there are, what they win and the cut-off time before each
              event. Winners are confirmed by an admin before anything is announced.
            </StateBlock>
          </div>
        </div>
      </section>
    </>
  );
}
