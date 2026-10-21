import { useState } from "react";
import { evaluateRoom } from "../game/evaluateRoom";
import type {
  CheckInResult,
  Room,
  RoomAssignment,
  Scenario,
} from "../types/game";

export function useGame() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [assignments, setAssignments] = useState<RoomAssignment[]>([]);
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(
    null,
  );

  const startNight = async () => {
    try {
      const [scenarioResponse, roomsResponse] = await Promise.all([
        fetch("http://localhost:3000/api/scenarios/random/easy"),
        fetch("http://localhost:3000/api/rooms"),
      ]);

      if (!scenarioResponse.ok || !roomsResponse.ok) {
        throw new Error("Could not start night");
      }

      const scenarioData: Scenario = await scenarioResponse.json();
      const roomsData: Room[] = await roomsResponse.json();

      setScenario(scenarioData);
      setRooms(roomsData);

      // Reset game state when a new night starts
      setSelectedRoom(null);
      setAssignments([]);
      setCurrentGuestIndex(0);
      setCheckInResult(null);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkInGuest = (guestId: string, roomNumber: number) => {
    if (!scenario) return;

    const guest = scenario.guests.find((guest) => guest._id === guestId);
    const room = rooms.find((room) => room.roomNumber === roomNumber);

    if (!guest || !room) return;

    const evaluation = evaluateRoom(
      guest,
      room,
      assignments,
      rooms,
      scenario.guests,
    );

    const newAssignment: RoomAssignment = {
      guestId,
      roomNumber,
    };

    setAssignments((current) => [...current, newAssignment]);

    setCheckInResult({
      guestId,
      roomNumber,
      ...evaluation,
    });
  };

  const continueToNextGuest = () => {
    if (!scenario) return;

    const isLastGuest = currentGuestIndex === scenario.guests.length - 1;

    if (isLastGuest) {
      // Shift Complete bygger vi senare
      return;
    }

    setCurrentGuestIndex((current) => current + 1);
    setSelectedRoom(null);
    setCheckInResult(null);
  };

  return {
    scenario,
    rooms,
    selectedRoom,
    setSelectedRoom,
    assignments,
    currentGuestIndex,
    checkInResult,
    startNight,
    checkInGuest,
    continueToNextGuest,
  };
}
