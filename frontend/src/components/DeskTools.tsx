import type { CheckInResult, Room, Guest } from "../types/game";
import CheckInPanel from "./CheckInPanel";
import { AnimatePresence, motion } from "motion/react";

type DeskToolsProps = {
  selectedRoom: Room | null;
  currentGuest: Guest;
  onCheckIn: (guestId: string, roomNumber: number) => void;
  checkInResult: CheckInResult | null;
  onOpenGuestLog: () => void;
};

function DeskTools({
  selectedRoom,
  currentGuest,
  onCheckIn,
  checkInResult,
  onOpenGuestLog,
}: DeskToolsProps) {
  return (
    <div className="absolute z-50 bottom-6 left-6 flex w-[calc(100%-3rem)] items-end justify-between">
      {/* Left tools */}
      <div className="flex h-14 items-center gap-2 rounded-md border border-cream/50 bg-ink/90 backdrop-blur-md px-4 text-cream">
        <button
          type="button"
          aria-label="Shift notes"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/notes.svg" alt="" className="size-5" />
        </button>

        <button
          type="button"
          onClick={onOpenGuestLog}
          aria-label="Guest log"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/log.svg" alt="" className="size-5" />
        </button>
      </div>
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
      <div className="flex gap-2 h-14 items-center rounded-md border border-cream/50 bg-ink/90 backdrop-blur-md px-4 text-cream">
        <img src="/icons/money.svg" alt="" className="size-5" />
        <span className="tracking-widest">240</span>
      </div>
    </div>
  );
}

export default DeskTools;
