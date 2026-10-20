type NightBriefingProps = {
  onStartShift: () => void;
};
function NightBriefing({ onStartShift }: NightBriefingProps) {
  return (
    <section className="relative min-h-screen bg-[url('/images/night-brief.webp')] bg-cover bg-center">
      <div className="absolute top-[25%] left-1/2 w-96 -translate-x-1/2 text-ink">
        <h1 className="font-display text-xl">To whoever's on tonight,</h1>

        <div className="mt-5 space-y-4 font-sans text-sm leading-6">
          <p>
            Quiet one tonight. Six guests expected.
            <br />
            At least, that&apos;s what the book says.
          </p>

          <p>
            A few of them have made rather specific requests. Do your best to
            keep everyone happy. The happier the guest, the better the tip.
          </p>

          <p>
            And please check the guest log before handing out keys. Last time we
            had two strangers almost sharing 203.
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
