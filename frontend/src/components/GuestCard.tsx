import type { Guest } from "../types/game";
import { formatGuestRequest } from "../utils/formatGuestRequest";

type GuestCardProps = {
  guest: Guest;
};

function GuestCard({ guest }: GuestCardProps) {
  return (
    <div className="relative">
      <img src="/images/guestcard.webp" alt="" className="w-full" />
      <div className="absolute top-[12%] left-[15%] w-[64%] text-ink">
        <div className="">
          <div className="flex items-center gap-[4%] border-b-2 border-ruby pb-4">
            <img
              src={guest.portrait}
              alt={guest.name}
              className="aspect-square w-[40%] rounded-xl object-cover"
            />

            <h2 className="font-display font-bold text-[clamp(1rem,2vw,2rem)] uppercase leading-snug">
              {guest.name}
            </h2>
          </div>
        </div>
        <div className="flex justify-between py-2 border-b-2 border-ruby">
          <p className="font-display font-semibold text-lg uppercase">
            {guest.stay} nights
          </p>
          <p className="font-display font-semibold text-lg uppercase">
            {guest.roomType}
          </p>
        </div>
        <div className="flex flex-col py-2 font-display pb-2 border-b-2 border-ruby">
          {guest.requirements.map((requirement) => (
            <p key={requirement}>- {formatGuestRequest(requirement)}</p>
          ))}

          {guest.preferences.map((preference) => (
            <p key={preference}>- {formatGuestRequest(preference)}</p>
          ))}
        </div>
        <p className="font-display italic font-semibold text-[clamp(0.7rem,1.4vw,1.2rem)] leading-tight pl-2 py-2">
          "{guest.quote}"
        </p>
      </div>
    </div>
  );
}

export default GuestCard;
