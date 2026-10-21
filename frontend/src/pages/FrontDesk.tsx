import type React from "react";
import DeskTools from "../components/DeskTools";
import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";
import type { CheckInResult, Room, Scenario } from "../types/game";
import CheckInResultModal from "../components/CheckInResultModal";

type FrontDeskProps = {
  scenario: Scenario;
  rooms: Room[];
  selectedRoom: Room | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>;
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
  onCheckIn,
  currentGuestIndex,
  checkInResult,
  onNextGuest,
}: FrontDeskProps) {
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
        <Header />

        <div className="absolute top-[38%] xl:top-[36%] left-[45%] flex w-[90%] -translate-x-1/2 items-center justify-center gap-[2vw]">
          <KeyBoard
            rooms={rooms}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />

          <div className="w-[clamp(260px,22vw,360px)]">
            <GuestCard guest={currentGuest} />
          </div>
        </div>

        <DeskTools
          selectedRoom={selectedRoom}
          currentGuest={currentGuest}
          onCheckIn={onCheckIn}
          checkInResult={checkInResult}
        />

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
