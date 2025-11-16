import React from "react";

const MOCK_LEADERBOARD = [
  { id: 1, username: "busta_josh", reviews: 19 },
  { id: 2, username: "BayBouLou", reviews: 15 },
  { id: 3, username: "bidetBoy67",  reviews: 12 },
  { id: 4, username: "toilet_queen", reviews: 9 },
  { id: 5, username: "the_mcgill_pisser", reviews: 7 },
  {id: 6, username: "minnows", reviews: 1}
];

export default function LeaderboardPage({ onBack }) {
  return (
    <div className="leaderboard-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to map
      </button>

      <h2 className="leaderboard-heading">Leaderboard</h2>
      <p className="leaderboard-subtitle">
        Top Toilet Watchers this week 🚽
      </p>

      <ol className="leaderboard-list">
        {MOCK_LEADERBOARD.map((u, index) => (
          <li
            key={u.id}
            className={
              "leaderboard-row" +
              (index === 0
                ? " leaderboard-row--gold"
                : index === 1
                ? " leaderboard-row--silver"
                : index === 2
                ? " leaderboard-row--bronze"
                : "")
            }
          >
            <span className="leaderboard-rank">{index + 1}</span>
            <span className="leaderboard-name">{u.username}</span>
            <span className="leaderboard-reviews">
              {u.reviews} reviews
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
