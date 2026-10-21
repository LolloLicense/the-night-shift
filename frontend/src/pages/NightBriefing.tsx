type NightBriefingProps = {
  briefing: string;
  onStartShift: () => void;
};
function NightBriefing({ briefing, onStartShift }: NightBriefingProps) {
  return (
    <section className="relative min-h-screen bg-[url('/images/night-brief.webp')] bg-cover bg-center">
      <div className="absolute top-[25%] left-1/2 w-96 -translate-x-1/2 text-ink">
        <h1 className="font-display text-xl">To whoever's on tonight,</h1>

        <div className="mt-5 space-y-4 font-sans text-sm leading-6">
          <p>{briefing}</p>

          <p>
            Check their requests before handing out keys. Keep them happy and
            they might make it worth your while.
          </p>

          <p>
            And use the guest log. I&apos;d rather not explain another double
            booking.
          </p>
        </div>

        <div className="mt-6 font-display italic">
          <p>Good luck, dont call me</p>
          <p>Boss man</p>
        </div>

        <button
          type="button"
          onClick={onStartShift}
          className="mt-8 cursor-pointer rounded-md bg-ruby px-6 py-3 font-sans font-semibold text-xs tracking-widest text-cream uppercase"
        >
          Start shift
        </button>
      </div>
    </section>
  );
}

export default NightBriefing;
