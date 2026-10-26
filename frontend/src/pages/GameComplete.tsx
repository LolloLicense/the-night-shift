type GameCompleteProps = {
  nightsWorked: number;
  totalEarnings: number;
  onClockOut: () => void;
};

function GameComplete({
  nightsWorked,
  totalEarnings,
  onClockOut,
}: GameCompleteProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      <img
        src="/images/night-brief.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <section className="relative z-10 w-[min(90vw,600px)] px-14 py-12 text-ink -rotate-1">
        {/* Management header */}
        <div className="border-b border-ink/25 pb-3 text-center">
          <p className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase">
            The Night Shift Hotel
          </p>

          <p className="mt-2 font-sans text-[9px] tracking-[0.25em] uppercase">
            Management Office
          </p>
        </div>

        {/* Title */}
        <div className="mt-4 text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-80">
            Performance review
          </p>

          <h1 className="mt-2 font-display text-5xl font-bold">
            Better than expected.
          </h1>
        </div>

        {/* Copy */}
        <div className="mx-auto mt-4 max-w-sm text-center">
          <p className="text-center font-sans text-sm leading-6 tracking-widest">
            Management has reviewed your performance.
            <br />
            <strong>For once, they have ZERO concerns.</strong>
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-2 border-y border-ink/20 py-3">
          <div className="border-r border-ink/20 text-center">
            <p className="font-display text-3xl font-bold">{nightsWorked}</p>

            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] uppercase opacity-80">
              Nights worked
            </p>
          </div>

          <div className="text-center">
            <p className="font-display text-3xl font-bold">${totalEarnings}</p>

            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] uppercase opacity-80">
              Tips earned
            </p>
          </div>
        </div>

        {/* Final message */}
        <div className="mt-4 text-center">
          <p className="mt-1 font-sans text-sm leading-6 tracking-widest">
            For now, you've worked every shift we've got.
            <br />
            Clock out. Get some sleep.
            <br />
            Management will call when V2 needs you.
          </p>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={onClockOut}
          className="mx-auto mt-4 block cursor-pointer rounded-md bg-ruby px-6 py-3 font-sans text-xs font-semibold tracking-widest text-cream uppercase transition-transform hover:scale-105"
        >
          Clock out
        </button>
      </section>
    </main>
  );
}

export default GameComplete;
