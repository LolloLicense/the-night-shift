import { useState } from "react";

type ClockInCardProps = {
  onClockIn: (name: string) => void;
};

function ClockInCard({ onClockIn }: ClockInCardProps) {
  const [name, setName] = useState("");

  const handleClockIn = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    onClockIn(trimmedName);
  };

  return (
    <div>
      <p>Hotel Night Staff</p>

      <h2>Night Clerk</h2>

      <label htmlFor="player-name">Name</label>

      <input
        id="player-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={20}
        autoComplete="off"
      />

      <button type="button" onClick={handleClockIn} disabled={!name.trim()}>
        Clock in
      </button>
    </div>
  );
}

export default ClockInCard;
