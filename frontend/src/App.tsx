import { useState } from "react";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { AnimatePresence, easeInOut, motion } from "motion/react";

type GameScreen = "start" | "briefing" | "front-desk";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>("start");
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={gameScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: easeInOut }}
      >
        {gameScreen === "start" && (
          <StartScreen onStart={() => setGameScreen("briefing")} />
        )}

        {gameScreen === "briefing" && (
          <NightBriefing onStartShift={() => setGameScreen("front-desk")} />
        )}
        {gameScreen === "front-desk" && <FrontDesk />}
      </motion.main>
    </AnimatePresence>
  );
}

export default App;
