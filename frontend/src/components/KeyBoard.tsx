import RoomKey from "./RoomKey";
import type { Room, RoomAssignment } from "../types/game";

type KeyBoardProps = {
  rooms: Room[];
  selectedRoom: Room | null;
  assignments: RoomAssignment[];
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>;
};

function KeyBoard({
  rooms,
  selectedRoom,
  assignments,
  setSelectedRoom,
}: KeyBoardProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {rooms.map((room) => {
        const isOccupied = assignments.some(
          (assignment) => assignment.roomNumber === room.roomNumber,
        );

        return (
          <RoomKey
            key={room._id}
            roomNumber={room.roomNumber}
            isSelected={selectedRoom?._id === room._id}
            isOccupied={isOccupied}
            onSelect={() => setSelectedRoom(room)}
          />
        );
      })}
    </div>
  );
}

export default KeyBoard;
