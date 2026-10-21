import type { Guest } from "../types/game";
import { formatGuestRequest } from "../utils/formatGuestRequest";

type GuestCardProps = {
  guest: Guest;
};

function GuestCard({ guest }: GuestCardProps) {
  return (
    <div className="@container relative">
      <img src="/images/guestcard.webp" alt="" className="block w-full" />

      <div className="absolute top-[12%] left-[12%] w-[75%] text-ink">
        <div className="flex items-center gap-[4%] border-b-[0.5cqw] border-ruby pb-[3cqw]">
          <img
            src={guest.portrait}
            alt={guest.name}
            className="aspect-square w-[40%] rounded-[3cqw] object-cover"
          />

          <h2 className="font-display text-[clamp(1rem,8cqw,2rem)] leading-[1.1] font-bold uppercase">
            {guest.name}
          </h2>
        </div>

        <div className="flex justify-between border-b-[0.5cqw] border-ruby py-[2cqw]">
          <p className="font-display text-[clamp(0.75rem,4.5cqw,1.125rem)]  font-semibold uppercase">
            {guest.stay} nights
          </p>

          <p className="font-display text-[clamp(0.75rem,4.5cqw,1.125rem)]  font-semibold uppercase">
            {guest.roomType}
          </p>
        </div>

        <div className="flex flex-col border-b-[0.5cqw] border-ruby py-[2cqw] font-display text-[clamp(0.8rem,4.5cqw,1.05rem)] leading-[1.3]">
          {guest.requirements.map((requirement) => (
            <p key={requirement}>- {formatGuestRequest(requirement)}</p>
          ))}

          {guest.preferences.map((preference) => (
            <p key={preference}>- {formatGuestRequest(preference)}</p>
          ))}
        </div>

        <p className="w-[110%] py-[4cqw] font-display text-[clamp(0.85rem,5.5cqw,1.25rem)] leading-[1.15] font-semibold italic">
          "{guest.quote}"
        </p>
      </div>
    </div>
  );
}

export default GuestCard;
