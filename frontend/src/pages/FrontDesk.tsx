import { useState, type Dispatch, type SetStateAction } from "react";
import NightBriefing from "./NightBriefing";
import DeskTools from "../components/DeskTools";
import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";
import type {
  CheckInResult,
  Room,
  Scenario,
  RoomAssignment,
} from "../types/game";
import CheckInResultModal from "../components/CheckInResultModal";
import GuestLog from "../components/GuestLog";
import SettingsModal from "../components/SettingsModal";

type FrontDeskProps = {
  playerName: string;
  scenario: Scenario;
  rooms: Room[];
  startedAt: number;
  selectedRoom: Room | null;
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
  assignments: RoomAssignment[];
  onCheckIn: (guestId: string, roomNumber: number) => void;
  currentGuestIndex: number;
  checkInResult: CheckInResult | null;
  onNextGuest: () => void;
  onClockOut: () => void;
};

function FrontDesk({
  playerName,
  rooms,
  startedAt,
  scenario,
  selectedRoom,
  setSelectedRoom,
  assignments,
  onCheckIn,
  currentGuestIndex,
  checkInResult,
  onNextGuest,
  onClockOut,
}: FrontDeskProps) {
  const [isGuestLogOpen, setIsGuestLogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const currentGuest = scenario.guests[currentGuestIndex];

  return (
    <section className="h-screen overflow-hidden">
      <div className="relative h-full w-full overflow-hidden">
        {/* Background */}
        <img
          src="/images/front-desk.webp"
          alt=""
          className="block h-full w-full object-cover"
        />

        {/* UI */}
        <Header
          startedAt={startedAt}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <div className="absolute top-1/3 left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-[3vw]">
          <KeyBoard
            rooms={rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />

          <div className="w-82">
            <GuestCard guest={currentGuest} />
          </div>
        </div>

        <DeskTools
          selectedRoom={selectedRoom}
          currentGuest={currentGuest}
          onCheckIn={onCheckIn}
          checkInResult={checkInResult}
          onOpenGuestLog={() => setIsGuestLogOpen((current) => !current)}
          onOpenBriefing={() => setIsBriefingOpen(true)}
        />
        {isGuestLogOpen && (
          <GuestLog
            rooms={rooms}
            assignments={assignments}
            guests={scenario.guests}
          />
        )}
        {isSettingsOpen && (
          <SettingsModal
            onClose={() => setIsSettingsOpen(false)}
            onClockOut={onClockOut}
          />
        )}
        {isBriefingOpen && (
          <div className="absolute inset-0 z-60">
            <NightBriefing
              briefing={scenario.briefing}
              playerName={playerName}
              onContinue={() => setIsBriefingOpen(false)}
              buttonText="Back to desk"
            />
          </div>
        )}
        {checkInResult && selectedRoom && (
          <CheckInResultModal
            result={checkInResult}
            guest={currentGuest}
            room={selectedRoom}
            onNextGuest={onNextGuest}
          />
        )}
      </div>
    </section>
  );
}

export default FrontDesk;
