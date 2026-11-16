"use client";

import { useEffect, useState } from "react";
import type { Leaderboard } from "@/content/types";
import { apiConfigured, fetchLeaderboard } from "@/lib/api";
import { StateBlock } from "./StateBlock";
import styles from "./LeaderboardBoard.module.css";

type Props = {
  /** "all-time" or an event id. */
  scope?: string;
  /** Show only the top N (landing preview uses 5). */
  limit?: number;
};

type State =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; board: Leaderboard };

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th"];

/**
 * Leaderboard rows from the API. With no API, or no verified scores yet, it
 * shows empty scoreboard slots — never invented names or points.
 */
export function LeaderboardBoard({ scope = "all-time", limit }: Props) {
  const [state, setState] = useState<State>(apiConfigured ? { kind: "loading" } : { kind: "ready", board: { entries: [] } });

  useEffect(() => {
    if (!apiConfigured) return;
    let cancelled = false;
    setState({ kind: "loading" });
    fetchLeaderboard(scope)
      .then((board) => !cancelled && setState({ kind: "ready", board }))
      .catch(() => !cancelled && setState({ kind: "error" }));
    return () => {
      cancelled = true;
    };
  }, [scope]);

  if (state.kind === "loading") {
    return <StateBlock kind="loading" title="Fetching the scoreboard" />;
  }
  if (state.kind === "error") {
    return (
      <StateBlock kind="error" title="The scoreboard didn't load">
        Check your connection and refresh. Your points are safe either way.
      </StateBlock>
    );
  }

  const entries = limit ? state.board.entries.slice(0, limit) : state.board.entries;

  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <ol className={styles.slots} aria-hidden="true">
          {ORDINALS.map((o) => (
            <li key={o}>
              <span className={styles.rank}>{o}</span>
              <span className={styles.blank} />
              <span className={styles.points}>---</span>
            </li>
          ))}
        </ol>
        <p className={styles.emptyText}>
          <strong>No scores on the board yet.</strong> Points appear here once check-ins and quests are verified at an
          event.
        </p>
      </div>
    );
  }

  return (
    <div>
      {state.board.frozenAt && (
        <p className={`notice ${styles.frozen}`}>
          <span aria-hidden="true">❄</span>
          <span>
            <strong>Leaderboard frozen</strong>
            Scores were locked at the published cut-off:{" "}
            {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" }).format(
              new Date(state.board.frozenAt),
            )}{" "}
            PKT.
          </span>
        </p>
      )}
      <div className="table-scroll">
        <table className="table">
          <caption className="visually-hidden">Leaderboard: rank, name, university and points</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">University</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={`${e.rank}-${e.name}`}>
                <td className="num">{e.rank}</td>
                <td>
                  <strong>{e.name}</strong>
                </td>
                <td>{e.university}</td>
                <td className="num">{e.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
