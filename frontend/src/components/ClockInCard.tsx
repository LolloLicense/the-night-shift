import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Player } from "../types/game";

type ClockInCardProps = {
  players: Player[];
  onClockIn: (name: string) => void;
};

function ClockInCard({ players, onClockIn }: ClockInCardProps) {
  const [name, setName] = useState("");
  const [showPlayers, setShowPlayers] = useState(false);

  const handleClockIn = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    setShowPlayers(false);
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

          <div className="relative">
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setShowPlayers(true);
              }}
              onFocus={() => setShowPlayers(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClockIn();
                }
              }}
              maxLength={20}
              autoComplete="off"
              placeholder="Enter your name"
              className="w-full border-0 border-b-2 border-ruby bg-transparent px-1 py-2 font-display text-2xl font-bold uppercase outline-none placeholder:text-ink/30"
            />

            <AnimatePresence>
              {showPlayers && players.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-md border border-ink/20 bg-cream shadow-lg"
                >
                  {players.map((player) => (
                    <button
                      key={player.name}
                      type="button"
                      onClick={() => {
                        setName(player.name);
                        setShowPlayers(false);
                      }}
                      className="block w-full cursor-pointer px-4 py-2 text-left font-display font-bold border-b border-ruby/40 uppercase transition-colors hover:bg-ruby/10"
                    >
                      {player.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
