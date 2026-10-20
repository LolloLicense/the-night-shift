import Header from "../components/Header";
import KeyBoard from "../components/KeyBoard";

function FrontDesk() {
  return (
    <main className="relative min-h-screen bg-[url('/images/front-desk.webp')] bg-cover bg-center">
      <Header />

      <div className="absolute top-2/5 left-1/5">
        <KeyBoard />
      </div>
    </main>
  );
}

export default FrontDesk;
