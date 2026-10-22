import { evaluateRoom } from "./evaluateRoom";
import type { Guest, Room, RoomAssignment } from "../types/game";

export function evaluateShift(
  guests: Guest[],
  rooms: Room[],
  assignments: RoomAssignment[],
) {
  const results = assignments
    .map((assignment) => {
      const guest = guests.find((guest) => guest._id === assignment.guestId);

      const room = rooms.find(
        (room) => room.roomNumber === assignment.roomNumber,
      );

      if (!guest || !room) {
        return null;
      }

      const evaluation = evaluateRoom(guest, room, assignments, rooms, guests);

      return {
        guestId: guest._id,
        guestName: guest.name,
        roomNumber: room.roomNumber,
        ...evaluation,
      };
    })
    .filter((result) => result !== null);

  const totalRevenue = results.reduce(
    (total, result) => total + result.rate,
    0,
  );

  const totalTips = results.reduce((total, result) => total + result.tip, 0);

  const happyGuests = results.filter(
    (result) => result.requirementsMissed.length === 0 && !result.downgrade,
  ).length;

  const unhappyGuests = results.length - happyGuests;

  return {
    results,
    totalRevenue,
    totalTips,
    totalEarnings: totalRevenue + totalTips,
    happyGuests,
    unhappyGuests,
  };
}
