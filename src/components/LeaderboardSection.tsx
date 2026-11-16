"use client";

import { useState } from "react";
import { LeaderboardBoard } from "./LeaderboardBoard";
import styles from "@/app/inner.module.css";

/** Full leaderboard with the all-time / per-event filter. */
export function LeaderboardSection({ events }: { events: { id: string; title: string }[] }) {
  const [scope, setScope] = useState("all-time");

  return (
    <div>
      <div className={styles.toolbar}>
        <div className="field">
          <label htmlFor="scope">Show points for</label>
          <select id="scope" value={scope} onChange={(e) => setScope(e.target.value)}>
            <option value="all-time">All time</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <LeaderboardBoard scope={scope} />
    </div>
  );
}
