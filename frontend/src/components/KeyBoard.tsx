import RoomKey from "./RoomKey";

const rooms = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205];

function KeyBoard() {
  return (
    <div className="grid grid-cols-5 gap-3 mt-12">
      {rooms.map((room) => (
        <RoomKey key={room} roomNumber={room} />
      ))}
    </div>
  );
}

export default KeyBoard;
