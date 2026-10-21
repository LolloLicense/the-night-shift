import type { Guest, Room, RoomAssignment } from "../types/game";

type GuestLogProps = {
  rooms: Room[];
  assignments: RoomAssignment[];
  guests: Guest[];
};

function GuestLog({ rooms, assignments, guests }: GuestLogProps) {
  const firstFloor = rooms.filter(
    (room) => room.roomNumber >= 100 && room.roomNumber < 200,
  );

  const secondFloor = rooms.filter(
    (room) => room.roomNumber >= 200 && room.roomNumber < 300,
  );

  const getGuestForRoom = (roomNumber: number) => {
    const assignment = assignments.find(
      (assignment) => assignment.roomNumber === roomNumber,
    );

    if (!assignment) return null;

    return guests.find((guest) => guest._id === assignment.guestId);
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-ink/60 backdrop-blur-sm">
      <div className="relative">
        <img src="/images/guest-log.png" alt="" className="block w-full" />

        <div className="absolute inset-0 grid grid-cols-2 px-[10%] py-[7%] text-ink">
          {/* First floor */}
          <div className="pr-[10%]">
            <h2 className="mb-2 text-center font-display text-2xl font-bold uppercase">
              First floor
            </h2>

            <div className="flex flex-col">
              {firstFloor.map((room) => (
                <div key={room._id} className="border-b-2 border-ruby py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-bold">
                        {room.roomNumber}
                      </h3>
                      {getGuestForRoom(room.roomNumber) && (
                        <span className="text-s font-bold font-display uppercase">
                          {getGuestForRoom(room.roomNumber)?.name}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold tracking-wider uppercase">
                      {room.roomType}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider font-semibold">
                    {room.location.replaceAll("-", " ")}
                    {room.quiet && " · Quiet"}
                    {room.smoking && " · Smoking"}
                    {room.petFriendly && " · Pet friendly"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Second floor */}
          <div className="pl-[10%]">
            <h2 className="mb-2 text-center font-display text-2xl font-bold uppercase">
              Second floor
            </h2>

            <div className="flex flex-col">
              {secondFloor.map((room) => (
                <div key={room._id} className="border-b-2 border-ruby py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-bold">
                        {room.roomNumber}
                      </h3>
                      {getGuestForRoom(room.roomNumber) && (
                        <span className="text-s font-bold font-display uppercase">
                          {getGuestForRoom(room.roomNumber)?.name}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold tracking-wider uppercase">
                      {room.roomType}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider font-semibold">
                    {room.location.replaceAll("-", " ")}
                    {room.quiet && " · Quiet"}
                    {room.smoking && " · Smoking"}
                    {room.petFriendly && " · Pet friendly"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestLog;
