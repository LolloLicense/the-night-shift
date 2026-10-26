import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type HowToPlayProps = {
  onClose: () => void;
};

type Tab = "guests" | "rooms" | "desk" | "file";

const tabs: { id: Tab; label: string; number: string }[] = [
  { id: "guests", label: "Guests", number: "01" },
  { id: "rooms", label: "Rooms", number: "02" },
  { id: "desk", label: "Desk", number: "03" },
  { id: "file", label: "File", number: "04" },
];

function HowToPlay({ onClose }: HowToPlayProps) {
  const [activeTab, setActiveTab] = useState<Tab>("guests");

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-80 flex h-screen w-screen items-center justify-center bg-ink/75 backdrop-blur-sm"
    >
      {/* HANDBOOK */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-[min(620px,70vw)]"
      >
        {/* PAPER */}
        <div className="relative min-h-170 bg-cream px-14 py-10 text-ink shadow-2xl">
          {/* HEADER */}
          <header className="border-b border-ink/25 pb-5">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase">
              The Night Shift Hotel
            </p>

            <p className="mt-1 font-sans text-[8px] tracking-[0.2em] text-ink/50 uppercase">
              Employee Training Department
            </p>

            <h1 className="mt-5 font-display text-3xl font-bold uppercase">
              Employee Handbook
            </h1>
          </header>

          {/* SECTION LABEL */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-sans text-sm font-semibold text-ruby">
              {currentTab?.number}
            </span>

            <span className="h-px w-8 bg-ruby/50" />

            <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-ruby uppercase">
              {currentTab?.label}
            </span>
          </div>

          {/* CONTENT */}
          <div className="mt-5 min-h-102.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === "guests" && <GuestsTab />}
                {activeTab === "rooms" && <RoomsTab />}
                {activeTab === "desk" && <DeskTab />}
                {activeTab === "file" && <FileTab />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <footer className="flex items-center justify-between border-t border-ink/20 pt-5">
            <p className="font-sans text-[8px] tracking-[0.18em] text-ink/40 uppercase">
              Night Staff Handbook
            </p>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-sm border border-ruby px-4 py-2 font-sans text-[9px] font-semibold tracking-[0.16em] text-ruby uppercase transition-colors hover:bg-ruby hover:text-cream"
            >
              Close handbook
            </button>
          </footer>
        </div>

        {/* TABS */}
        <nav
          className="absolute top-28 -right-18 flex flex-col gap-1.5"
          aria-label="Handbook sections"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-18 cursor-pointer rounded-r-sm px-3 py-3 text-left font-sans text-[9px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                  isActive
                    ? "bg-ruby text-cream"
                    : "bg-[#d8c49f] text-ink/70 hover:bg-[#cfb990]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </motion.div>
    </motion.main>
  );
}

function GuestsTab() {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold">Read the card.</h2>

      <p className="mt-3 max-w-md font-sans text-sm leading-6 text-ink/70">
        Every guest arrives with a booking, requirements and preferences.
      </p>

      <div className="mt-8 space-y-6">
        <HandbookItem
          title="Room type"
          text="Standard or Superior. Give them what they booked, or better."
        />

        <HandbookItem
          title="Requirements"
          text="One unmet requirement can be forgiven. More than one may leave a guest unhappy."
          important
        />

        <HandbookItem
          title="Preferences"
          text="Optional, but meeting them may be worth your while."
        />
      </div>
    </section>
  );
}

function RoomsTab() {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold">Know your hotel.</h2>

      <p className="mt-3 max-w-md font-sans text-sm leading-6 text-ink/70">
        Ten rooms. Two floors. Each room has its own type, location and
        features.
      </p>

      <div className="mt-8 space-y-6">
        <HandbookItem
          title="Room type"
          text="Rooms are either Standard or Superior."
        />

        <HandbookItem
          title="Features"
          text="Quiet, Smoking and Pet Friendly rooms are available throughout the hotel."
        />

        <HandbookItem
          title="Location"
          text="Rooms may be near the lobby, near the elevator, mid-hall or further away."
        />
      </div>

      <p className="mt-8 font-sans text-xs leading-5 text-ink/60">
        The Guest Log keeps track of the details.
      </p>
    </section>
  );
}

function DeskTab() {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold">
        Everything you need is on the desk.
      </h2>

      <p className="mt-3 max-w-md font-sans text-sm leading-6 text-ink/70">
        If you're unsure, the desk probably has the answer.
      </p>

      <div className="mt-8 space-y-5">
        <DeskItem
          icon="/icons/notes.svg"
          title="Shift Notes"
          text="Review tonight's instructions."
        />

        <DeskItem
          icon="/icons/log.svg"
          title="Guest Log"
          text="Check rooms, features and current occupants."
        />

        <DeskItem
          icon="/icons/file.svg"
          title="Employee File"
          text="Keep an eye on your performance."
        />
      </div>
    </section>
  );
}

function FileTab() {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold">
        Management is keeping track.
      </h2>

      <p className="mt-3 max-w-md font-sans text-sm leading-6 text-ink/70">
        Your Employee File records your shifts, guests and earnings.
      </p>

      <div className="mt-9 border-l-2 border-ruby pl-5">
        <p className="font-sans text-[9px] font-semibold tracking-[0.2em] text-ruby uppercase">
          Management notice
        </p>

        <p className="mt-3 max-w-md font-sans text-sm font-semibold leading-6">
          Performance reviews will be conducted periodically.
        </p>

        <p className="mt-2 font-sans text-xs leading-5 text-ink/60">
          Further explanation has been deemed unnecessary.
        </p>
      </div>

      <div className="mt-12">
        <p className="font-sans text-sm">Twenty shifts. Ten rooms.</p>

        <p className="mt-1 font-sans text-sm font-bold">
          Try to remain employed.
        </p>
      </div>

      <p className="mt-10 max-w-sm font-sans text-[10px] leading-4 text-ink/45">
        Management accepts no responsibility for poor judgement, difficult
        guests or regrettable room assignments.
      </p>
    </section>
  );
}

type HandbookItemProps = {
  title: string;
  text: string;
  important?: boolean;
};

function HandbookItem({ title, text, important = false }: HandbookItemProps) {
  return (
    <div className={important ? "border-l-2 border-ruby pl-4" : ""}>
      <h3 className="font-sans text-xs font-bold tracking-[0.08em] uppercase">
        {title}
      </h3>

      <p className="mt-1 max-w-md font-sans text-xs leading-5 text-ink/65">
        {text}
      </p>
    </div>
  );
}

type DeskItemProps = {
  icon: string;
  title: string;
  text: string;
};

function DeskItem({ icon, title, text }: DeskItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-9 shrink-0 items-center justify-center bg-ruby rounded-lg">
        <img src={icon} alt="" className="size-6" />
      </div>

      <div>
        <h3 className="font-sans text-xs font-bold tracking-[0.08em] uppercase">
          {title}
        </h3>

        <p className="mt-1 font-sans text-xs leading-5 text-ink/60">{text}</p>
      </div>
    </div>
  );
}

export default HowToPlay;
