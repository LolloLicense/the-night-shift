type SettingsModalProps = {
  onClose: () => void;
};

function SettingsModal({ onClose }: SettingsModalProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink/80 backdrop-blur-sm">
      <div className="w-[clamp(320px,30vw,440px)] rounded-lg border border-cream/40 bg-ink/95 p-8 text-cream">
        <h2 className="border-b border-cream/30 pb-4 text-center font-display text-3xl font-bold uppercase">
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
      </div>
    </div>
  );
}

export default SettingsModal;
