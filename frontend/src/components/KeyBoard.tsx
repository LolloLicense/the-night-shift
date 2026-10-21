import RoomKey from "./RoomKey";
import type { Room } from "../types/game";

type KeyBoardProps = {
  rooms: Room[];
  selectedRoom: Room | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>;
};

function KeyBoard({ rooms, selectedRoom, setSelectedRoom }: KeyBoardProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {rooms.map((room) => (
        <RoomKey
          key={room._id}
          roomNumber={room.roomNumber}
          isSelected={selectedRoom?._id === room._id}
          onSelect={() => setSelectedRoom(room)}
        />
      ))}
    </div>
  );
}

export default KeyBoard;
