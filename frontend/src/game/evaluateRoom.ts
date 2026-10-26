import type { Guest, Room, RoomAssignment } from "../types/game";
import { ROOM_RATES, TIP_RULES } from "./gameRules";

function requestIsMet(
  request: string,
  room: Room,
  hasSmokingNeighbour: boolean,
  hasPetNeighbour: boolean,
) {
  switch (request) {
    case "quiet":
      return room.quiet;

    case "smoking":
      return room.smoking;

    case "pet-friendly":
      return room.petFriendly;

    case "first-floor":
      return room.roomNumber >= 100 && room.roomNumber < 200;

    case "second-floor":
      return room.roomNumber >= 200 && room.roomNumber < 300;

    case "near-lobby":
      return room.location === "near-lobby" || room.location === "mid";

    case "near-elevator":
      return room.location === "near-elevator" || room.location === "mid";

    case "away-from-elevator":
      return room.location === "away" || room.location === "mid";

    case "no-smoking-neighbours":
      return !hasSmokingNeighbour;

    case "no-pets-adjacent":
      return !hasPetNeighbour;

    default:
      return true;
  }
}

function getAdjacentRooms(room: Room, rooms: Room[]) {
  return rooms.filter(
    (otherRoom) =>
      otherRoom.roomNumber === room.roomNumber - 1 ||
      otherRoom.roomNumber === room.roomNumber + 1,
  );
}

function calculateRate(guest: Guest) {
  const nightlyRate = ROOM_RATES[guest.roomType as keyof typeof ROOM_RATES];

  return nightlyRate * guest.stay;
}

function calculateTip(
  requirementsMissed: string[],
  preferencesMet: string[],
  preferencesMissed: string[],
  downgrade: boolean,
) {
  if (requirementsMissed.length > 0 || downgrade) {
    return 0;
  }
  const preferenceTip = preferencesMet.length * TIP_RULES.perPreference;
  const allPreferencesMet =
    preferencesMet.length > 0 && preferencesMissed.length === 0;
  const bonus = allPreferencesMet ? TIP_RULES.allPreferencesBonus : 0;

  return preferenceTip + bonus;
}

export function evaluateRoom(
  guest: Guest,
  room: Room,
  assignments: RoomAssignment[],
  rooms: Room[],
  guests: Guest[],
) {
  // Room type
  const correctRoomType = guest.roomType === room.roomType;

  const upgrade = guest.roomType === "standard" && room.roomType === "superior";

  const downgrade =
    guest.roomType === "superior" && room.roomType === "standard";

  // Find occupied neighbouring rooms
  const adjacentRooms = getAdjacentRooms(room, rooms);

  const occupiedAdjacentRooms = adjacentRooms.filter((adjacentRoom) =>
    assignments.some(
      (assignment) => assignment.roomNumber === adjacentRoom.roomNumber,
    ),
  );

  // Find the guests staying in those rooms
  const adjacentGuests = occupiedAdjacentRooms
    .map((adjacentRoom) => {
      const assignment = assignments.find(
        (assignment) => assignment.roomNumber === adjacentRoom.roomNumber,
      );

      return guests.find((guest) => guest._id === assignment?.guestId);
    })
    .filter((guest): guest is Guest => guest !== undefined);

  // Neighbour conditions
  const hasSmokingNeighbour = adjacentGuests.some((guest) =>
    guest.requirements.includes("smoking"),
  );

  const hasPetNeighbour = adjacentGuests.some((guest) =>
    guest.requirements.includes("pet-friendly"),
  );

  // Requirements
  const requirementsMet = guest.requirements.filter((requirement) =>
    requestIsMet(requirement, room, hasSmokingNeighbour, hasPetNeighbour),
  );

  const requirementsMissed = guest.requirements.filter(
    (requirement) =>
      !requestIsMet(requirement, room, hasSmokingNeighbour, hasPetNeighbour),
  );

  // Preferences
  const preferencesMet = guest.preferences.filter((preference) =>
    requestIsMet(preference, room, hasSmokingNeighbour, hasPetNeighbour),
  );

  const preferencesMissed = guest.preferences.filter(
    (preference) =>
      !requestIsMet(preference, room, hasSmokingNeighbour, hasPetNeighbour),
  );

  const tip = calculateTip(
    requirementsMissed,
    preferencesMet,
    preferencesMissed,
    downgrade,
  );

  const rate = calculateRate(guest);

  return {
    correctRoomType,
    upgrade,
    downgrade,
    requirementsMet,
    requirementsMissed,
    preferencesMet,
    preferencesMissed,
    rate,
    tip,
  };
}
