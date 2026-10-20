import DeskTools from "../components/DeskTools";
import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";

function FrontDesk() {
  return (
    <section className="relative min-h-screen bg-[url('/images/front-desk.webp')] bg-cover bg-center">
      <Header />

      <div className="absolute top-2/6 left-2/4 flex w-[80%] max-w-5xl -translate-x-1/2 items-start justify-center gap-6">
        <KeyBoard />

        <div className="w-80 mt-6">
          <GuestCard />
        </div>
      </div>

      <DeskTools />
    </section>
  );
}

export default FrontDesk;
