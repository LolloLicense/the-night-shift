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

const getSavedGame = (): SavedGame | null => {
  const saved = localStorage.getItem("night-shift-save");

  if (!saved) return null;

  return JSON.parse(saved) as SavedGame;
};

export function useGame() {
  const [savedGame] = useState<SavedGame | null>(getSavedGame);

  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem("night-shift-players");

    if (!savedPlayers) return [];

    return JSON.parse(savedPlayers) as Player[];
  });

  const [player, setPlayer] = useState<Player | null>(null);

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

  const [startedAt, setStartedAt] = useState(
    savedGame?.startedAt ?? Date.now(),
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
      startedAt,
    };

    localStorage.setItem("night-shift-save", JSON.stringify(gameToSave));
  }, [scenario, rooms, assignments, currentGuestIndex, startedAt]);

  const clockInPlayer = (name: string) => {
    const trimmedName = name.trim();

    const existingPlayer = players.find(
      (player) => player.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (existingPlayer) {
      setPlayer(existingPlayer);
      return;
    }

    const newPlayer: Player = {
      name: trimmedName,
      completedNights: 0,
      totalEarnings: 0,
      highScore: 0,
    };

    const updatedPlayers = [...players, newPlayer];

    setPlayers(updatedPlayers);
    setPlayer(newPlayer);

    localStorage.setItem("night-shift-players", JSON.stringify(updatedPlayers));
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

      // Start a new shift at 12:00 AM
      setStartedAt(Date.now());

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

  const clockOut = () => {
    localStorage.removeItem("night-shift-save");

    setScenario(null);
    setRooms([]);
    setAssignments([]);
    setCurrentGuestIndex(0);
    setSelectedRoom(null);
    setCheckInResult(null);
  };

  return {
    player,
    players,
    clockInPlayer,
    scenario,
    rooms,
    startedAt,
    selectedRoom,
    setSelectedRoom,
    assignments,
    currentGuestIndex,
    checkInResult,
    startNight,
    checkInGuest,
    continueToNextGuest,
    clockOut,
  };
}
