import DeskTools from "../components/DeskTools";
import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";

function FrontDesk() {
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

        <div className="absolute top-[35%] left-[45%] flex w-[90%] -translate-x-1/2 items-start justify-center gap-[2vw]">
          <KeyBoard />

          <div className=" w-[20vw]">
            <GuestCard />
          </div>
        </div>

        <DeskTools />
      </div>
    </section>
  );
}

export default FrontDesk;
