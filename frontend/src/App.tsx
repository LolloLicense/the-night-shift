import { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import ScreenWarning from "./components/ScreenWarning";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { useGame } from "./hooks/useGame";
import ShiftReport from "./pages/ShiftReport";
import Fired from "./pages/Fired";
import GameComplete from "./pages/GameComplete";
import HowToPlay from "./pages/HowToPlay";

type GameScreen =
  | "start"
  | "briefing"
  | "front-desk"
  | "shift-report"
  | "fired"
  | "game-complete";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>(() => {
    const savedGame = localStorage.getItem("night-shift-save");

    return savedGame ? "front-desk" : "start";
  });

  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  const {
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
    clockOut,
    resetPlayer,
  } = useGame();

  const handleStartNight = async (name: string) => {
    const activePlayer = clockInPlayer(name);

    const started = await startNight(activePlayer);

    if (started) {
      setGameScreen("briefing");
    }
  };

  const handleClockOut = () => {
    clockOut();
    setGameScreen("start");
  };

  const handleCompleteShift = async () => {
    const result = completeShift();

    if (!result) return;

    if (result.status === "fired") {
      setGameScreen("fired");
      return;
    }

    if (result.status === "game-complete") {
      setGameScreen("game-complete");
      return;
    }

    const started = await startNight(result.player);

    if (started) {
      setGameScreen("briefing");
    }
  };

  const handleGameCompleteClockOut = () => {
    resetPlayer();
    setGameScreen("start");
  };

  const handleStartOver = () => {
    resetPlayer();
    setGameScreen("start");
  };

  const handleNextGuest = () => {
    const shiftComplete = continueToNextGuest();

    if (shiftComplete) {
      setGameScreen("shift-report");
    }
  };

  return (
    <>
      {/* Smaller than 1040px */}
      <div className="min-[1040px]:hidden">
        <ScreenWarning />
      </div>

      {/* 1040px and wider */}
      <div className="hidden min-[1040px]:block">
        <AnimatePresence mode="wait">
          <motion.main
            key={gameScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: easeInOut }}
          >
            {/* START */}
            {gameScreen === "start" && (
              <StartScreen
                players={players}
                onStart={handleStartNight}
                onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
              />
            )}

            {/* NIGHT BRIEFING */}
            {gameScreen === "briefing" && scenario && (
              <NightBriefing
                briefing={scenario.briefing}
                playerName={player?.name ?? ""}
                onContinue={() => setGameScreen("front-desk")}
              />
            )}

            {/* FRONT DESK */}
            {gameScreen === "front-desk" && scenario && player && (
              <FrontDesk
                player={player}
                scenario={scenario}
                rooms={rooms}
                startedAt={startedAt}
                nightNumber={player.completedNights + 1}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                assignments={assignments}
                onCheckIn={checkInGuest}
                onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
                currentGuestIndex={currentGuestIndex}
                checkInResult={checkInResult}
                onNextGuest={handleNextGuest}
                onClockOut={handleClockOut}
              />
            )}

            {/* SHIFT REPORT */}
            {gameScreen === "shift-report" && shiftResult && player && (
              <ShiftReport
                totalRevenue={shiftResult.totalRevenue}
                totalTips={shiftResult.totalTips}
                totalEarnings={shiftResult.totalEarnings}
                happyGuests={shiftResult.happyGuests}
                unhappyGuests={shiftResult.unhappyGuests}
                totalGuests={shiftResult.results.length}
                nightNumber={player.completedNights + 1}
                onNextShift={handleCompleteShift}
              />
            )}

            {/* FIRED */}
            {gameScreen === "fired" && player && (
              <Fired
                unhappyGuests={player.totalUnhappyGuests}
                nightsWorked={player.completedNights}
                onStartOver={handleStartOver}
              />
            )}

            {/* GAME COMPLETE */}
            {gameScreen === "game-complete" && player && (
              <GameComplete
                nightsWorked={player.completedNights}
                totalEarnings={player.totalEarnings}
                onClockOut={handleGameCompleteClockOut}
              />
            )}
          </motion.main>
        </AnimatePresence>
        <AnimatePresence>
          {isHowToPlayOpen && (
            <HowToPlay onClose={() => setIsHowToPlayOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
