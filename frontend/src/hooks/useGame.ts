import { useEffect, useState } from "react";
import { evaluateRoom } from "../game/evaluateRoom";
import { evaluateShift } from "../game/evaluateShift";
import type {
  CheckInResult,
  Player,
  Room,
  RoomAssignment,
  Scenario,
  SavedGame,
} from "../types/game";
const API_URL = import.meta.env.VITE_API_URL;

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

  const [player, setPlayer] = useState<Player | null>(() => {
    if (!savedGame?.playerName) return null;

    return (
      players.find(
        (player) =>
          player.name.toLowerCase() === savedGame.playerName.toLowerCase(),
      ) ?? null
    );
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

  const [startedAt, setStartedAt] = useState(
    savedGame?.startedAt ?? Date.now(),
  );

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(
    null,
  );

  const [shiftResult, setShiftResult] = useState<ReturnType<
    typeof evaluateShift
  > | null>(null);

  useEffect(() => {
    if (!scenario || !player) return;

    const gameToSave: SavedGame = {
      playerName: player.name,
      scenario,
      rooms,
      assignments,
      currentGuestIndex,
      startedAt,
    };

    localStorage.setItem("night-shift-save", JSON.stringify(gameToSave));
  }, [scenario, rooms, assignments, currentGuestIndex, startedAt, player]);

  const clockInPlayer = (name: string) => {
    const trimmedName = name.trim();

    const existingPlayer = players.find(
      (player) => player.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (existingPlayer) {
      const normalizedPlayer: Player = {
        ...existingPlayer,
        totalHappyGuests: existingPlayer.totalHappyGuests ?? 0,
      };

      setPlayer(normalizedPlayer);

      return normalizedPlayer;
    }

    const newPlayer: Player = {
      name: trimmedName,
      completedNights: 0,
      totalEarnings: 0,
      totalHappyGuests: 0,
      totalUnhappyGuests: 0,
      playedScenarioIds: [],
    };

    const updatedPlayers = [...players, newPlayer];

    setPlayers(updatedPlayers);
    setPlayer(newPlayer);

    localStorage.setItem("night-shift-players", JSON.stringify(updatedPlayers));

    return newPlayer;
  };

  const startNight = async (playerToUse?: Player) => {
    const activePlayer = playerToUse ?? player;

    if (activePlayer && activePlayer.playedScenarioIds.length >= 20) {
      return false;
    }

    try {
      const excludedIds = activePlayer?.playedScenarioIds ?? [];

      const scenarioUrl =
        excludedIds.length > 0
          ? `${API_URL}/api/scenarios/random/easy?exclude=${excludedIds.join(",")}`
          : `${API_URL}/api/scenarios/random/easy`;

      const [scenarioResponse, roomsResponse] = await Promise.all([
        fetch(scenarioUrl),
        fetch(`${API_URL}/api/rooms`),
      ]);

      if (!scenarioResponse.ok || !roomsResponse.ok) {
        throw new Error("Could not start night");
      }

      const scenarioData: Scenario = await scenarioResponse.json();
      const roomsData: Room[] = await roomsResponse.json();

      setScenario(scenarioData);
      setRooms(roomsData);

      // Start a new shift
      setStartedAt(Date.now());

      // Reset game state when a new night starts
      setSelectedRoom(null);
      setAssignments([]);
      setCurrentGuestIndex(0);
      setCheckInResult(null);
      setShiftResult(null);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const checkInGuest = (guestId: string, roomNumber: number) => {
    if (!scenario) return;

    const roomIsOccupied = assignments.some(
      (assignment) => assignment.roomNumber === roomNumber,
    );

    if (roomIsOccupied) return;

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
      const result = evaluateShift(scenario.guests, rooms, assignments);

      console.log("SHIFT COMPLETE:", result);

      setShiftResult(result);

      return true;
    }

    setCurrentGuestIndex((current) => current + 1);
    setSelectedRoom(null);
    setCheckInResult(null);

    return false;
  };

  const completeShift = () => {
    if (!player || !shiftResult) return;

    const updatedPlayer: Player = {
      ...player,

      completedNights: player.completedNights + 1,

      totalEarnings: player.totalEarnings + shiftResult.totalTips,

      totalHappyGuests:
        (player.totalHappyGuests ?? 0) + shiftResult.happyGuests,

      totalUnhappyGuests: player.totalUnhappyGuests + shiftResult.unhappyGuests,

      playedScenarioIds: scenario
        ? [...player.playedScenarioIds, scenario._id]
        : player.playedScenarioIds,
    };

    const isFired =
      (updatedPlayer.completedNights === 5 &&
        updatedPlayer.totalUnhappyGuests >= 15) ||
      (updatedPlayer.completedNights === 10 &&
        updatedPlayer.totalUnhappyGuests >= 27) ||
      (updatedPlayer.completedNights === 15 &&
        updatedPlayer.totalUnhappyGuests >= 40);

    const updatedPlayers = players.map((savedPlayer) =>
      savedPlayer.name.toLowerCase() === player.name.toLowerCase()
        ? updatedPlayer
        : savedPlayer,
    );

    setPlayer(updatedPlayer);
    setPlayers(updatedPlayers);

    localStorage.setItem("night-shift-players", JSON.stringify(updatedPlayers));

    localStorage.removeItem("night-shift-save");

    if (isFired) {
      return {
        status: "fired",
        player: updatedPlayer,
      };
    }

    if (updatedPlayer.playedScenarioIds.length >= 20) {
      return {
        status: "game-complete",
        player: updatedPlayer,
      };
    }

    return {
      status: "continue",
      player: updatedPlayer,
    };
  };

  const resetPlayer = () => {
    if (!player) return;

    const resetPlayer: Player = {
      ...player,
      completedNights: 0,
      totalEarnings: 0,
      totalHappyGuests: 0,
      totalUnhappyGuests: 0,
      playedScenarioIds: [],
    };

    const updatedPlayers = players.map((savedPlayer) =>
      savedPlayer.name.toLowerCase() === player.name.toLowerCase()
        ? resetPlayer
        : savedPlayer,
    );

    setPlayer(resetPlayer);
    setPlayers(updatedPlayers);

    localStorage.setItem("night-shift-players", JSON.stringify(updatedPlayers));

    localStorage.removeItem("night-shift-save");

    setScenario(null);
    setRooms([]);
    setAssignments([]);
    setCurrentGuestIndex(0);
    setSelectedRoom(null);
    setCheckInResult(null);
    setShiftResult(null);
  };

  const clockOut = () => {
    localStorage.removeItem("night-shift-save");

    setScenario(null);
    setRooms([]);
    setAssignments([]);
    setCurrentGuestIndex(0);
    setSelectedRoom(null);
    setCheckInResult(null);
    setShiftResult(null);
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
    shiftResult,
    startNight,
    checkInGuest,
    continueToNextGuest,
    completeShift,
    resetPlayer,
    clockOut,
  };
}
