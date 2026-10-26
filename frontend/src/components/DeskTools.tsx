import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CheckInResult, Room, Guest } from "../types/game";
import CheckInPanel from "./CheckInPanel";

type DeskToolsProps = {
  selectedRoom: Room | null;
  currentGuest: Guest;
  onCheckIn: (guestId: string, roomNumber: number) => void;
  checkInResult: CheckInResult | null;
  onOpenGuestLog: () => void;
  onOpenBriefing: () => void;
  onOpenEmployeeFile: () => void;
  playerEarnings: number;
};

function DeskTools({
  selectedRoom,
  currentGuest,
  onCheckIn,
  checkInResult,
  onOpenGuestLog,
  onOpenBriefing,
  onOpenEmployeeFile,
  playerEarnings,
}: DeskToolsProps) {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="absolute bottom-6 left-6 z-50 flex w-[calc(100%-3rem)] items-end justify-between">
      {/* Left tools */}
      <div
        className="relative flex h-14 items-center gap-2 rounded-md border border-cream/50 bg-ink/90 px-4 text-cream backdrop-blur-md"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-md border border-cream/50 bg-ink/90 px-3 py-2 font-sans text-[10px] tracking-widest text-cream uppercase backdrop-blur-md"
            >
              {tooltip}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shift notes */}
        <button
          type="button"
          onClick={onOpenBriefing}
          onMouseEnter={() => setTooltip("Shift notes")}
          onFocus={() => setTooltip("Shift notes")}
          onBlur={() => setTooltip(null)}
          aria-label="Shift notes"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/notes.svg" alt="" className="size-5" />
        </button>

        {/* Guest log */}
        <button
          type="button"
          onClick={onOpenGuestLog}
          onMouseEnter={() => setTooltip("Guest log")}
          onFocus={() => setTooltip("Guest log")}
          onBlur={() => setTooltip(null)}
          aria-label="Guest log"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/log.svg" alt="" className="size-5" />
        </button>

        {/* Employee file */}
        <button
          type="button"
          onClick={onOpenEmployeeFile}
          onMouseEnter={() => setTooltip("Employee file")}
          onFocus={() => setTooltip("Employee file")}
          onBlur={() => setTooltip(null)}
          aria-label="Employee file"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/file.svg" alt="" className="size-5" />
        </button>
      </div>

      {/* Check in */}
      <AnimatePresence>
        {selectedRoom && !checkInResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex h-14 items-center gap-2 rounded-md border border-cream/50 bg-ink/90 px-4 text-cream backdrop-blur-md"
          >
            <CheckInPanel
              room={selectedRoom}
              guest={currentGuest}
              onCheckIn={onCheckIn}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cash */}
      <div className="flex h-14 items-center gap-2 rounded-md border border-cream/50 bg-ink/90 px-4 text-cream backdrop-blur-md">
        <img src="/icons/money.svg" alt="" className="size-5" />
        <span className="tracking-widest">{playerEarnings}</span>
      </div>
    </div>
  );
}

export default DeskTools;
