function DeskTools() {
  return (
    <div className="absolute bottom-6 left-6 flex w-[calc(100%-3rem)] items-end justify-between">
      {/* Left tools */}
      <div className="flex h-14 items-center gap-2 rounded-md border border-cream/50 bg-ink/90 px-4 text-cream">
        <button
          type="button"
          aria-label="Shift notes"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/notes.svg" alt="" className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Guest log"
          className="flex size-10 cursor-pointer items-center justify-center"
        >
          <img src="/icons/log.svg" alt="" className="size-5" />
        </button>
      </div>

      {/* Cash */}
      <div className="flex gap-2 h-14 items-center rounded-md border border-cream/50 bg-ink/90 px-4 text-cream">
        <img src="/icons/money.svg" alt="" className="size-5" />
        <span>240</span>
      </div>
    </div>
  );
}

export default DeskTools;
