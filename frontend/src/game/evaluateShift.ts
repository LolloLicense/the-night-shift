import { evaluateRoom } from "./evaluateRoom";
import type { Guest, Room, RoomAssignment } from "../types/game";

// Requirements that always make a guest unhappy if missed
const CRITICAL_REQUIREMENTS = ["smoking", "pet-friendly"];

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

  const unhappyGuests = results.filter((result) => {
    // A downgrade always makes the guest unhappy
    if (result.downgrade) {
      return true;
    }

    // Missing a critical requirement always makes the guest unhappy
    const missedCriticalRequirement = result.requirementsMissed.some(
      (requirement) => CRITICAL_REQUIREMENTS.includes(requirement),
    );

    if (missedCriticalRequirement) {
      return true;
    }

    // One missed regular requirement is tolerated.
    // Two or more makes the guest unhappy.
    return result.requirementsMissed.length >= 2;
  }).length;

  const happyGuests = results.length - unhappyGuests;

  return {
    results,
    totalRevenue,
    totalTips,
    totalEarnings: totalRevenue + totalTips,
    happyGuests,
    unhappyGuests,
  };
}
