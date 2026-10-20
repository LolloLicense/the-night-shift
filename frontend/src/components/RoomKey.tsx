type RoomKeyProps = {
  roomNumber: number;
};

function RoomKey({ roomNumber }: RoomKeyProps) {
  return (
    <button
      type="button"
      className="group relative cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-105"
      aria-label={`Room ${roomNumber}`}
    >
      <img
        src="/images/room-key.png"
        alt=""
        className="w-24 drop-shadow-[0_3px_3px_rgba(0,0,0,0.25)] transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_10px_7px_rgba(0,0,0,0.45)]"
      />

      <span className="absolute top-[38%] left-[72%] -translate-x-1/2 text-lg italic font-semibold font-display text-ink">
        {roomNumber}
      </span>
    </button>
  );
}

export default RoomKey;
