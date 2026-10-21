import { useState } from "react";
import ScreenWarning from "./components/ScreenWarning";
import FrontDesk from "./pages/FrontDesk";
import NightBriefing from "./pages/NightBriefing";
import StartScreen from "./pages/StartScreen";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import type { Room, Scenario } from "./types/game";

type GameScreen = "start" | "briefing" | "front-desk";

function App() {
  const [gameScreen, setGameScreen] = useState<GameScreen>("start");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  //API
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
      setGameScreen("briefing");
    } catch (error) {
      console.error(error);
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
            {gameScreen === "start" && <StartScreen onStart={startNight} />}

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
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
