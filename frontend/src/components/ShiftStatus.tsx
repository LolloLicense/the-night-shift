import { useEffect, useState } from "react";

type ShiftStatusProps = {
  startedAt: number;
  nightNumber: number;
};

function ShiftStatus({ startedAt, nightNumber }: ShiftStatusProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const elapsedMilliseconds = currentTime - startedAt;
  const elapsedMinutes = Math.floor(elapsedMilliseconds / 60_000);

  const hours = Math.floor(elapsedMinutes / 60) % 24;
  const minutes = elapsedMinutes % 60;

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  const time = `${displayHour}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return (
    <div className="flex items-center gap-3 rounded-md border border-cream/50 bg-ink/90 px-4 py-2 text-cream">
      <span className="text-s font-semibold tracking-widest">
        NIGHT {String(nightNumber).padStart(2, "0")}
      </span>

      <span className="text-s font-semibold tracking-widest">{time}</span>
    </div>
  );
}

export default ShiftStatus;
