type FiredProps = {
  unhappyGuests: number;
  nightsWorked: number;
  onStartOver: () => void;
};

function Fired({ unhappyGuests, nightsWorked, onStartOver }: FiredProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      {/* Front desk background */}
      <img
        src="/images/night-brief.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" />

      {/* Termination notice */}
      <section className="relative z-10 w-[min(90vw,580px)] px-14 py-12 text-ink">
        {/* Management header */}
        <div className="border-b border-ink/25 pb-5 text-center">
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
            Termination notice
          </p>

          <h1 className="mt-2 font-display text-5xl font-bold">
            You're fired.
          </h1>
        </div>

        {/* Copy */}
        <div className="mx-auto mt-4 max-w-sm text-center">
          <p className="font-sans text-sm tracking-widest text-center leading-6">
            Management has reviewed your performance.
            <br />
            They have concerns.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-2 border-y border-ink/20 py-5">
          <div className="border-r border-ink/20 text-center">
            <p className="font-display text-3xl font-bold">{nightsWorked}</p>

            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] uppercase opacity-80">
              Nights worked
            </p>
          </div>

          <div className="text-center">
            <p className="font-display text-3xl font-bold">{unhappyGuests}</p>

            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] uppercase opacity-80">
              Unhappy guests
            </p>
          </div>
        </div>

        {/* Final message */}
        <p className="mt-8 font-sans text-sm tracking-widest text-center">
          We'll pretend this never happened if you will. Start over. Night one
          is waiting.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={onStartOver}
          className="mx-auto mt-6 block cursor-pointer rounded-md bg-ruby px-6 py-3 font-sans text-xs font-semibold tracking-widest text-cream uppercase transition-transform hover:scale-105"
        >
          Start over
        </button>
      </section>
    </main>
  );
}

export default Fired;
