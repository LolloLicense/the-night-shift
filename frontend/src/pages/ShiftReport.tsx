type ShiftReportProps = {
  totalRevenue: number;
  totalTips: number;
  totalEarnings: number;
  happyGuests: number;
  unhappyGuests: number;
  totalGuests: number;
};

function ShiftReport({
  totalRevenue,
  totalTips,
  totalEarnings,
  happyGuests,
  unhappyGuests,
  totalGuests,
}: ShiftReportProps) {
  return (
    <section className="relative min-h-screen bg-[url('/images/night-brief.webp')] bg-cover bg-center">
      <div className="absolute top-[30%] left-1/2 w-96 -translate-x-1/2 text-ink">
        <h1 className="border-b-2 border-ruby pb-3 text-center font-display text-3xl font-bold uppercase">
          Shift Complete
        </h1>

        <p className="mt-2 text-center font-sans text-xs font-semibold tracking-widest uppercase">
          Night Report
        </p>

        <div className="mt-8 space-y-3 font-sans">
          <div className="flex justify-between">
            <span>Guests checked in</span>
            <span className="font-semibold">{totalGuests}</span>
          </div>

          <div className="flex justify-between">
            <span>Happy guests</span>
            <span className="font-semibold">{happyGuests}</span>
          </div>

          <div className="flex justify-between">
            <span>Unhappy guests</span>
            <span className="font-semibold">{unhappyGuests}</span>
          </div>
        </div>

        <div className="mt-6 border-t-2 border-ruby pt-5 font-sans">
          <div className="flex justify-between">
            <span>Room revenue</span>
            <span>${totalRevenue}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Tips</span>
            <span>${totalTips}</span>
          </div>

          <div className="mt-4 flex justify-between border-t border-ink/40 pt-4 font-display text-xl font-bold">
            <span>Total</span>
            <span>${totalEarnings}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShiftReport;
