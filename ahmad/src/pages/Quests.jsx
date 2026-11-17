import { leaderboard, quests } from "../data/content";
import { useTitle } from "../hooks";
import { SampleNote } from "../components/Ui";
import { initials } from "../lib";

const places = ["First", "Second", "Third"];

export default function Quests() {
  const max = leaderboard[0]?.points || 1;
  const total = quests.reduce((sum, quest) => sum + quest.points, 0);
  const podium = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  useTitle(
    "Leaderboard",
    "Sample leaderboard and quests for AWS Student Community Day Islamabad."
  );

  return (
    <div className="page quest-page">
      <div className="quest-stage">
      <header className="page-head">
        <div className="wrap quest-hero">
          <div>
            <p className="kicker">Leaderboard</p>
            <h1>Show up. The board can see you.</h1>
            <p className="lede">
              Points for sessions, booths, photos, quizzes, labs, and a post that tags
              AWS. Swag goes to the top. This season is a sample, drawn so the board
              can be judged before it is wired up.
            </p>
            <SampleNote>
              Sample season. These names and scores are not real standings. Nobody has
              earned these points, and nothing here is being counted yet.
            </SampleNote>
          </div>
          <div className="quest-stats">
            <article>
              <strong data-count={quests.length} data-pad="2">
                {String(quests.length).padStart(2, "0")}
              </strong>
              <span>ways to score</span>
            </article>
            <article>
              <strong data-count={total}>{total}</strong>
              <span>pts if you clear the card</span>
            </article>
            <article>
              <strong>Swag</strong>
              <span>for whoever finishes on top</span>
            </article>
          </div>
        </div>
      </header>

      <section className="wrap quest-block">
        <div className="section-head">
          <p className="kicker">Sample board</p>
          <h2>The top of the room.</h2>
        </div>
        <ol className="stage">
          {podium.map((row, index) => (
            <li key={row.name} className={`place place-${index + 1}`}>
              <span className="place-rank" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="place-mark" aria-hidden="true">
                {initials(row.name)}
              </span>
              <p className="place-label">{places[index]}</p>
              <strong>{row.name}</strong>
              <em>
                <span data-count={row.points}>{row.points}</span>
                <small> pts</small>
              </em>
              <span className="chips">
                {row.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
            </li>
          ))}
        </ol>

        <ol className="ladder" start={4}>
          {rest.map((row, index) => (
            <li key={row.name}>
              <span className="rank">{index + 4}</span>
              <div className="who">
                <strong>{row.name}</strong>
                <span>{row.tags.join(" · ")}</span>
                <span
                  className="meter"
                  style={{ "--w": `${Math.round((row.points / max) * 100)}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="points">
                <span data-count={row.points}>{row.points}</span>
                <small> pts</small>
              </span>
            </li>
          ))}
        </ol>

        <p className="you-ticket">
          <span className="place-mark" aria-hidden="true">
            12
          </span>
          <span>
            <strong>Sample you</strong>
            <small>Rank 12 on this drawing. Not a real player.</small>
          </span>
          <b>
            420<small> pts</small>
          </b>
        </p>
      </section>

      <section className="wrap quest-block">
        <div className="section-head">
          <p className="kicker">The card</p>
          <h2>Six ways onto the board.</h2>
        </div>
        <ul className="quest-deck">
          {quests.map((quest, index) => (
            <li key={quest.id} className={`ticket ticket-${quest.id}`}>
              <div className="ticket-body">
                <span className="ticket-no">0{index + 1}</span>
                <h3>{quest.title}</h3>
                <p>{quest.detail}</p>
              </div>
              <strong data-count={quest.points} data-prefix="+">
                +{quest.points}
              </strong>
            </li>
          ))}
        </ul>
        <p className="swag-line">
          <span>Top of the board</span>
          takes the swag. The exact pieces get announced at Community Day, not on this
          preview.
        </p>
      </section>
      </div>
    </div>
  );
}
