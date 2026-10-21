import type { Room } from "../types/game";

type CheckInPanelProps = {
  room: Room;
};

function CheckInPanel({ room }: CheckInPanelProps) {
  return (
    <div className="flex gap-4 items-center">
      <p className="tracking-widest font-semibold uppercase">
        Room {room.roomNumber}
      </p>
      <button className="cursor-pointer rounded-lg font-semibold uppercase backdrop-blur-md border border-cream/50 bg-mare/70 px-8 py-2 text-sm tracking-widest text-cream">
        CHECK IN
      </button>
    </div>
  );
}

export default CheckInPanel;
