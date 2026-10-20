import GuestCard from "../components/GuestCard";
import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";

function FrontDesk() {
  return (
    <main className="relative min-h-screen bg-[url('/images/front-desk.webp')] bg-cover bg-center">
      <Header />

      <div className="absolute top-2/5 left-1/6">
        <KeyBoard />
      </div>

      <div className="absolute top-[35%] right-[25%] w-86">
        <GuestCard />
      </div>
    </main>
  );
}

export default FrontDesk;
