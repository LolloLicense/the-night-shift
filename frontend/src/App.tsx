import { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import ScreenWarning from "./components/ScreenWarning";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { useGame } from "./hooks/useGame";
import ShiftReport from "./pages/ShiftReport";

type GameScreen = "start" | "briefing" | "front-desk" | "shift-report";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>(() => {
    const savedGame = localStorage.getItem("night-shift-save");
    return savedGame ? "front-desk" : "start";
  });

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
    clockOut,
  } = useGame();

  const handleStartNight = async (name: string) => {
    clockInPlayer(name);

    const started = await startNight();

    if (started) {
      setGameScreen("briefing");
    }
  };

  const handleClockOut = () => {
    clockOut();
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
            {gameScreen === "start" && (
              <StartScreen players={players} onStart={handleStartNight} />
            )}

            {gameScreen === "briefing" && scenario && (
              <NightBriefing
                briefing={scenario.briefing}
                playerName={player?.name ?? ""}
                onContinue={() => setGameScreen("front-desk")}
              />
            )}

            {gameScreen === "front-desk" && scenario && (
              <FrontDesk
                scenario={scenario}
                rooms={rooms}
                startedAt={startedAt}
                playerName={player?.name ?? ""}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                assignments={assignments}
                onCheckIn={checkInGuest}
                currentGuestIndex={currentGuestIndex}
                checkInResult={checkInResult}
                onNextGuest={handleNextGuest}
                onClockOut={handleClockOut}
              />
            )}
            {/* SHIFT REPORT */}
            {gameScreen === "shift-report" && shiftResult && (
              <ShiftReport
                totalRevenue={shiftResult.totalRevenue}
                totalTips={shiftResult.totalTips}
                totalEarnings={shiftResult.totalEarnings}
                happyGuests={shiftResult.happyGuests}
                unhappyGuests={shiftResult.unhappyGuests}
                totalGuests={shiftResult.results.length}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
