import { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";

import ScreenWarning from "./components/ScreenWarning";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { useGame } from "./hooks/useGame";

type GameScreen = "start" | "briefing" | "front-desk";

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
                onStartShift={() => setGameScreen("front-desk")}
              />
            )}

            {gameScreen === "front-desk" && scenario && (
              <FrontDesk
                scenario={scenario}
                rooms={rooms}
                startedAt={startedAt}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                assignments={assignments}
                onCheckIn={checkInGuest}
                currentGuestIndex={currentGuestIndex}
                checkInResult={checkInResult}
                onNextGuest={continueToNextGuest}
                onClockOut={handleClockOut}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
