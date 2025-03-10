import { useState, useEffect } from "react";
import axios from "axios";

function UserPlayers() {
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

  const handlePlayerClick = (playerName) => {
    alert(`Player: ${playerName} clicked!`);
    // Here, you can add further interactions, such as navigating to a detailed player profile
  };

  return (
    <div>
      <h2>Player List</h2>
      {players.length === 0 ? (
        <p>No players found</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td
                  className="border p-2 text-blue-600 cursor-pointer underline"
                  onClick={() => handlePlayerClick(player.Name)}
                >
                  {player.Name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Player Scores</h2>
      {scores.length === 0 ? (
        <p>No scores found</p>
      ) : (
        <table className="table-auto border-collapse w-full mt-4">
          <thead>
            <tr>
              <th className="border p-2 text-left">Points</th>
              <th className="border p-2 text-left">Batting Strike Rate</th>
              <th className="border p-2 text-left">Batting Average</th>
              <th className="border p-2 text-left">Bowling Strike Rate</th>
              <th className="border p-2 text-left">Economy</th>
              <th className="border p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td className="border p-2">{score.point}</td>
                <td className="border p-2">{score.battingStrike}</td>
                <td className="border p-2">{score.battingAvg}</td>
                <td className="border p-2">{score.bowlingStrike}</td>
                <td className="border p-2">{score.Economy}</td>
                <td className="border p-2">{score.Value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserPlayers;
