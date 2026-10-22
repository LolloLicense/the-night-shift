import { useEffect, useState } from "react";
import { evaluateRoom } from "../game/evaluateRoom";
import type {
  CheckInResult,
  Player,
  Room,
  RoomAssignment,
  Scenario,
  SavedGame,
} from "../types/game";

export function useGame() {
  const savedGame = (() => {
    const saved = localStorage.getItem("night-shift-save");
    if (!saved) return null;

    return JSON.parse(saved) as SavedGame;
  })();

  const [player, setPlayer] = useState<Player | null>(() => {
    const savedPlayer = localStorage.getItem("night-shift-player");
    if (!savedPlayer) return null;
    return JSON.parse(savedPlayer) as Player;
  });

  const [scenario, setScenario] = useState<Scenario | null>(
    savedGame?.scenario ?? null,
  );
  const [rooms, setRooms] = useState<Room[]>(savedGame?.rooms ?? []);
  const [assignments, setAssignments] = useState<RoomAssignment[]>(
    savedGame?.assignments ?? [],
  );
  const [currentGuestIndex, setCurrentGuestIndex] = useState(
    savedGame?.currentGuestIndex ?? 0,
  );

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(
    null,
  );

  useEffect(() => {
    if (!scenario) return;

    const gameToSave: SavedGame = {
      scenario,
      rooms,
      assignments,
      currentGuestIndex,
    };

    localStorage.setItem("night-shift-save", JSON.stringify(gameToSave));
  }, [scenario, rooms, assignments, currentGuestIndex]);

  const createPlayer = (name: string) => {
    const newPlayer: Player = {
      name,
      completedNights: 0,
      totalEarnings: 0,
      highScore: 0,
    };
    setPlayer(newPlayer);
    localStorage.setItem("night-shift-player", JSON.stringify(newPlayer));
  };

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
    player,
    createPlayer,
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
