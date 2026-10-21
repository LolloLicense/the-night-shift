import { useState } from "react";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import type { Scenario } from "./types/game";

type GameScreen = "start" | "briefing" | "front-desk";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>("start");
  const [scenario, setScenario] = useState<Scenario | null>(null);

  //API
  const startNight = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/scenarios/random/easy",
      );

      if (!response.ok) {
        throw new Error("Could not fetch scenario");
      }

      const data: Scenario = await response.json();

      setScenario(data);
      setGameScreen("briefing");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={gameScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: easeInOut }}
      >
        {gameScreen === "start" && <StartScreen onStart={startNight} />}

        {gameScreen === "briefing" && scenario && (
          <NightBriefing
            briefing={scenario.briefing}
            onStartShift={() => setGameScreen("front-desk")}
          />
        )}
        {gameScreen === "front-desk" && scenario && (
          <FrontDesk scenario={scenario} />
        )}
      </motion.main>
    </AnimatePresence>
  );
}

export default App;
