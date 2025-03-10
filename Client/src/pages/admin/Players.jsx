

import { useState, useEffect } from "react";
import axios from "axios";


function Players() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]); // Store scores

  useEffect(() => {
    // Fetch players
    axios
      .get("http://localhost:3001/players")
      .then((response) => {
        console.log("Players API Response:", response.data);
        setPlayers(Array.isArray(response.data.players) ? response.data.players : []);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
        setPlayers([]);
      });

    // Fetch scores
    axios
      .get("http://localhost:3001/cal")
      .then((response) => {
        console.log("Scores API Response:", response.data);
        setScores(Array.isArray(response.data) ? response.data : []);
      })
      .catch((err) => {
        console.error("Error fetching scores:", err);
        setScores([]);
      });
  }, []);

  return (
    <div>
      <h2>Player List</h2>
      {players.length === 0 ? (
        <p>No players found</p>
      ) : (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              <strong>Name:</strong> {player.Name} <br />
              <strong>University:</strong> {player.University}
            </li>
          ))}
        </ul>
      )}

      <h2>Player Scores</h2>
      {scores.length === 0 ? (
        <p>No scores found</p>
      ) : (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              <strong>Points:</strong> {score.point} <br />
              <strong>Batting Strike Rate:</strong> {score.battingStrike} <br />
              <strong>Batting Average:</strong> {score.battingAvg} <br />
              <strong>Bowling Strike Rate:</strong> {score.bowlingStrike} <br />
              <strong>Economy:</strong> {score.Economy} <br />
              <strong>Value:</strong> {score.Value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Players;
