type RoomKeyProps = {
  roomNumber: number;
  isSelected: boolean;
  isOccupied: boolean;
  onSelect: () => void;
};

function RoomKey({
  roomNumber,
  isSelected,
  isOccupied,
  onSelect,
}: RoomKeyProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isOccupied}
      className={`group relative transition-transform duration-200 ease-out ${
        isOccupied
          ? "cursor-not-allowed opacity-40"
          : isSelected
            ? "-translate-y-2 scale-105 cursor-pointer"
            : "cursor-pointer hover:-translate-y-2 hover:scale-105"
      }`}
    >
      <img
        src="/images/room-key.png"
        alt=""
        className="w-23 drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)] transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_10px_7px_rgba(0,0,0,0.45)]"
      />

      <span className="absolute top-[38%] left-[73%] -translate-x-1/2 text-lg italic font-semibold font-display text-ink">
        {roomNumber}
      </span>
    </button>
  );
}

export default RoomKey;
