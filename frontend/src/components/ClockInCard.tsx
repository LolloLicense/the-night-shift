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
    <div className="relative w-[clamp(380px,32vw,500px)]">
      {/* Paper */}
      <img
        src="/images/guestcard.webp"
        alt=""
        className="block w-full drop-shadow-2xl"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col px-[11%] pt-[10%] pb-[12%] text-ink">
        <div className="border-b-2 border-ruby pb-3 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase">
            Hotel Night Staff
          </p>

          <h2 className="mt-1 font-display text-3xl font-bold uppercase">
            Night Clerk
          </h2>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <label
            htmlFor="player-name"
            className="mb-2 text-xs font-bold tracking-[0.2em] uppercase"
          >
            Employee name
          </label>

          <input
            id="player-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleClockIn();
              }
            }}
            maxLength={20}
            autoComplete="off"
            autoFocus
            placeholder="Enter your name"
            className="w-full border-0 border-b-2 border-ruby bg-transparent px-1 py-2 font-display text-2xl font-bold uppercase outline-none placeholder:text-ink/30"
          />
        </div>

        <button
          type="button"
          onClick={handleClockIn}
          disabled={!name.trim()}
          className="cursor-pointer mb-6 rounded-lg bg-ruby px-8 py-3 text-sm font-semibold tracking-widest text-cream uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clock in
        </button>
      </div>
    </div>
  );
}

export default ClockInCard;
