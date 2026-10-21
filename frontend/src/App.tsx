import { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";

import ScreenWarning from "./components/ScreenWarning";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { useGame } from "./hooks/useGame";

type GameScreen = "start" | "briefing" | "front-desk";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>("start");

  const {
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
  } = useGame();

  const handleStartNight = async () => {
    const started = await startNight();

    if (started) {
      setGameScreen("briefing");
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
              <StartScreen onStart={handleStartNight} />
            )}

            {gameScreen === "briefing" && scenario && (
              <NightBriefing
                briefing={scenario.briefing}
                onStartShift={() => setGameScreen("front-desk")}
              />
            )}

            {gameScreen === "front-desk" && scenario && (
              <FrontDesk
                scenario={scenario}
                rooms={rooms}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                assignments={assignments}
                onCheckIn={checkInGuest}
                currentGuestIndex={currentGuestIndex}
                checkInResult={checkInResult}
                onNextGuest={continueToNextGuest}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
