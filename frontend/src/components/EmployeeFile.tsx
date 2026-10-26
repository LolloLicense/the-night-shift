import { motion } from "motion/react";
import type { Player } from "../types/game";

type EmployeeFileProps = {
  player: Player;
};

function EmployeeFile({ player }: EmployeeFileProps) {
  const nextReview =
    player.completedNights < 5
      ? "Night 5"
      : player.completedNights < 10
        ? "Night 10"
        : player.completedNights < 15
          ? "Night 15"
          : "Final Review · Night 20";

  const managementNote =
    player.totalUnhappyGuests === 0
      ? "Suspiciously competent."
      : player.totalUnhappyGuests < 5
        ? "Acceptable. For now."
        : player.totalUnhappyGuests < 10
          ? "A pattern is emerging."
          : "Jury is still out";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-ink/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        exit={{ opacity: 0, y: 20, rotate: -2 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md text-ink"
      >
        {/* Paper background */}
        <img
          src="/images/guestcard.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
        />

        {/* Content */}
        <div className="relative z-10 px-10 py-9">
          {/* Header */}
          <div className="border-b border-ink/40 pb-4 text-center">
            <p className="pt-4 font-sans text-[10px] tracking-[0.25em] uppercase">
              The Night Shift Hotel
            </p>

            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] text-ink/60 uppercase">
              Management Office
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold uppercase">
              Employee File
            </h2>
          </div>

          {/* Employee */}
          <div className="mt-4">
            <p className="font-sans text-[9px] tracking-[0.2em] text-ink/80 uppercase">
              Employee
            </p>

            <p className="font-display text-2xl font-bold">{player.name}</p>

            <p className="font-sans text-xs tracking-widest text-ink/80 uppercase">
              Night Clerk
            </p>
          </div>

          {/* Performance */}
          <div className="mt-2 border-y border-ink/30 py-4">
            <p className="mb-4 font-sans text-[9px] font-semibold tracking-[0.2em] uppercase">
              Performance Record
            </p>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between">
                <span className="text-ink/80">Nights worked</span>

                <span className="font-semibold">
                  {player.completedNights} / 20
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink/80">Happy guests</span>

                <span className="font-semibold">
                  {player.totalHappyGuests ?? 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink/80">Unhappy guests</span>

                <span className="font-semibold">
                  {player.totalUnhappyGuests}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink/80">Tips earned</span>

                <span className="font-semibold">${player.totalEarnings}</span>
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="mt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] text-ink/80 uppercase">
                  Next review
                </p>

                <p className="mt-1 font-display text-xl font-bold">
                  {nextReview}
                </p>
              </div>
            </div>
          </div>

          {/* Management note */}
          <div className="mt-2">
            <p className="font-sans text-[9px] tracking-[0.2em] text-ink/80 uppercase">
              Management Note
            </p>

            <p className="mt-2 pb-6 font-display text-lg italic">
              {managementNote}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EmployeeFile;
