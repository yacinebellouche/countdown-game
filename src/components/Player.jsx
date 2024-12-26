import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setPlayerName] = useState("Player");

  function hundleClick() {
    setPlayerName(playerName.current.value);
    playerName.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "Player Name"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={hundleClick}>Set Name</button>
      </p>
    </section>
  );
}
