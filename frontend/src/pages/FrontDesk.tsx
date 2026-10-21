import type React from "react";
import DeskTools from "../components/DeskTools";
import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";
import type { Room, Scenario } from "../types/game";

type FrontDeskProps = {
  scenario: Scenario;
  rooms: Room[];
  selectedRoom: Room | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room | null>>;
};

function FrontDesk({
  rooms,
  scenario,
  selectedRoom,
  setSelectedRoom,
}: FrontDeskProps) {
  const currentGuest = scenario.guests[0];
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

        <DeskTools selectedRoom={selectedRoom} />
      </div>
    </section>
  );
}

export default FrontDesk;
