import React from "react";
import "./PostVoting.css";

function PostVoting({ results, candidates }) {
  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);

  const sortedCandidates = candidates
    .map((c) => ({
      ...c,
      votes: results[c.id] || 0,
    }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="phase-container results-container">
      <h2>Resultados Finales de la Votación</h2>
      <p>Gracias por participar. Su voto ha sido registrado con éxito.</p>
      <ul className="results-list">
        {sortedCandidates.map((c) => {
          const percentage = totalVotes > 0 ? (c.votes / totalVotes) * 100 : 0;
          return (
            <li key={c.id}>
              <div className="result-info">
                <span>
                  <strong>{c.name}</strong> ({c.party})
                </span>
                <span>
                  {c.votes} votos ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostVoting;