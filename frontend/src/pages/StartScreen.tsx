import { useState } from "react";
import ClockInCard from "../components/ClockInCard";

type StartScreenProps = {
  onStart: (name: string) => void;
};

function StartScreen({ onStart }: StartScreenProps) {
  const [showClockIn, setShowClockIn] = useState(false);
  return (
    <section className="relative min-h-screen bg-[url('/images/night-shift-start.webp')] bg-cover bg-center">
      <div className="absolute top-1/5 left-1/5 flex flex-col items-start">
        <div className="flex w-full max-w-96 flex-col items-start">
          <img
            src="/images/night-shift-logo.png"
            alt="The Night Shift"
            className="w-114"
          />
          <div className="flex flex-col gap-4 mt-10 ml-10">
            <p className="text-cream  text-xl max-w-52 mb-4 uppercase font-extralight">
              Check them in. Read the room. Make it count.
            </p>
            <button
              type="button"
              onClick={() => setShowClockIn(true)}
              className="cursor-pointer rounded-lg uppercase font-semibold bg-ruby px-8 py-3 text-sm tracking-widest text-cream"
            >
              Start night
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg font-semibold uppercase backdrop-blur-md border border-cream/50 bg-ink/40 px-8 py-3 text-sm tracking-widest text-cream"
            >
              How to play
            </button>
          </div>
        </div>
      </div>
      {showClockIn && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/70 backdrop-blur-sm">
          <ClockInCard
            onClockIn={(name) => {
              onStart(name);
            }}
          />
        </div>
      )}
    </section>
  );
}

export default StartScreen;
