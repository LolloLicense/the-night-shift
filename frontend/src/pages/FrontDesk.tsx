import { useState, type Dispatch, type SetStateAction } from "react";
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
  scenario: Scenario;
  rooms: Room[];
  selectedRoom: Room | null;
  setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
  assignments: RoomAssignment[];
  onCheckIn: (guestId: string, roomNumber: number) => void;
  currentGuestIndex: number;
  checkInResult: CheckInResult | null;
  onNextGuest: () => void;
};

function FrontDesk({
  rooms,
  scenario,
  selectedRoom,
  setSelectedRoom,
  assignments,
  onCheckIn,
  currentGuestIndex,
  checkInResult,
  onNextGuest,
}: FrontDeskProps) {
  const [isGuestLogOpen, setIsGuestLogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />

        <div className="absolute top-2/5 xl:top-[33%] left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-[3vw]">
          <KeyBoard
            rooms={rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />

          <div className="w-[clamp(270px,22vw,460px)]">
            <GuestCard guest={currentGuest} />
          </div>
        </div>

        <DeskTools
          selectedRoom={selectedRoom}
          currentGuest={currentGuest}
          onCheckIn={onCheckIn}
          checkInResult={checkInResult}
          onOpenGuestLog={() => setIsGuestLogOpen((current) => !current)}
        />
        {isGuestLogOpen && (
          <GuestLog
            rooms={rooms}
            assignments={assignments}
            guests={scenario.guests}
          />
        )}
        {isSettingsOpen && (
          <SettingsModal onClose={() => setIsSettingsOpen(false)} />
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
