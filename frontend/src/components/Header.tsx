import ShiftStatus from "./ShiftStatus";

type HeaderProps = {
  startedAt: number;
  nightNumber: number;
  onOpenSettings: () => void;
};

function Header({ startedAt, nightNumber, onOpenSettings }: HeaderProps) {
  return (
    <header className="absolute z-50 top-0 left-0 flex w-full items-start justify-between p-6">
      <ShiftStatus startedAt={startedAt} nightNumber={nightNumber} />

      <button
        type="button"
        onClick={onOpenSettings}
        aria-label="Open settings"
        className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-ruby"
      >
        <img src="/icons/settings.svg" alt="" className="size-5" />
      </button>
    </header>
  );
}

export default Header;
