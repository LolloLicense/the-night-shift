import { useState } from "react";

type SettingsModalProps = {
  onClose: () => void;
  onClockOut: () => void;
};

function SettingsModal({ onClose, onClockOut }: SettingsModalProps) {
  const [showClockOutWarning, setShowClockOutWarning] = useState(false);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink/80 backdrop-blur-sm">
      <div className="w-[clamp(320px,30vw,440px)] rounded-lg border border-cream/40 bg-ink/95 p-8 text-cream">
        {showClockOutWarning ? (
          <>
            <h2 className="border-b border-ruby pb-4 text-center font-display text-3xl font-bold uppercase">
              Clock out?
            </h2>

            <div className="mt-6">
              <p className="text-center font-display text-xl font-bold">
                Your shift isn't over yet.
              </p>

              <p className="mt-2 text-center text-sm text-cream/70">
                Clocking out now will abandon your current shift and all
                progress will be lost.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowClockOutWarning(false)}
                  className="flex-1 cursor-pointer rounded-lg border border-cream/50 px-4 py-3 text-sm font-semibold tracking-widest uppercase"
                >
                  Stay
                </button>

                <button
                  type="button"
                  onClick={onClockOut}
                  className="flex-1 cursor-pointer rounded-lg bg-ruby px-4 py-3 text-sm font-semibold tracking-widest uppercase"
                >
                  Clock out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="border-b border-ruby pb-4 text-center font-display text-3xl font-bold uppercase">
              Settings
            </h2>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className="cursor-pointer rounded-lg border border-cream/50 px-8 py-3 text-sm font-semibold tracking-widest uppercase"
              >
                How to play
              </button>

              <button
                type="button"
                onClick={() => setShowClockOutWarning(true)}
                className="cursor-pointer rounded-lg bg-ruby px-8 py-3 text-sm font-semibold tracking-widest uppercase"
              >
                Clock out
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-3 cursor-pointer text-xs font-semibold tracking-widest text-cream/70 uppercase"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SettingsModal;
