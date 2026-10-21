import type { Room, Guest } from "../types/game";

type CheckInPanelProps = {
  room: Room;
  guest: Guest;
  onCheckIn: (guestId: string, roomNumber: number) => void;
};

function CheckInPanel({ room, guest, onCheckIn }: CheckInPanelProps) {
  return (
    <div className="flex gap-4 items-center">
      <p className="tracking-widest font-semibold uppercase">
        Room {room.roomNumber} / {room.roomType}
      </p>
      <button
        type="button"
        onClick={() => onCheckIn(guest._id, room.roomNumber)}
        className="cursor-pointer rounded-lg font-semibold uppercase backdrop-blur-md border border-cream/50 bg-mare/70 px-8 py-2 text-sm tracking-widest text-cream"
      >
        CHECK IN
      </button>
    </div>
  );
}

export default CheckInPanel;
