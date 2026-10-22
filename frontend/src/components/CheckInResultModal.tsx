import type { CheckInResult, Guest, Room } from "../types/game";
import { formatGuestRequest } from "../utils/formatGuestRequest";

type CheckInResultModalProps = {
  result: CheckInResult;
  guest: Guest;
  room: Room;
  onNextGuest: () => void;
  isLastGuest: boolean;
};

function CheckInResultModal({
  result,
  guest,
  room,
  onNextGuest,
  isLastGuest,
}: CheckInResultModalProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink/90 backdrop-blur-sm">
      <div className="relative w-[clamp(360px,32vw,500px)]">
        <img src="/images/guestcard.webp" alt="" className="block w-full" />

        <div className="absolute inset-0 flex flex-col px-[10%] pt-[9%] pb-[14%] text-ink">
          <p className="text-center font-display text-md font-semibold tracking-[0.25em] uppercase pb-2 border-b-2 border-ruby">
            Check in complete
          </p>

          <div className="grid grid-cols-[8rem_1fr_5rem] items-center border-b-2 border-ruby p-4">
            <img src={guest.portrait} alt="" className="size-22 object-cover" />

            <h2 className="font-display text-3xl font-bold leading-tight uppercase">
              {guest.name}
            </h2>
          </div>
          <div className="p-2 flex border-b-2 border-ruby justify-between">
            <div className="flex flex-col gap-1">
              <p className="mt-1 text-s font-semibold tracking-widest uppercase">
                Room: {room.roomNumber}
              </p>
              <p className="mt-1 text-s font-semibold tracking-widest uppercase">
                {room.roomType}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="mt-1 text-s font-semibold tracking-widest uppercase">
                Rate: ${result.rate}
              </p>
              <p className="mt-1 text-s font-semibold tracking-widest uppercase">
                Potential tip: ${result.tip}
              </p>
            </div>
          </div>

          <div className="flex-1">
            {result.downgrade && (
              <p className="border-b-2 border-ruby p-2 font-semibold text-ruby uppercase">
                Room downgrade
              </p>
            )}

            {result.upgrade && (
              <p className="border-b-2 border-ruby p-2 font-semibold uppercase">
                Complimentary upgrade
              </p>
            )}

            {result.requirementsMissed.length > 0 && (
              <div className="flex items-center gap-6 border-b-2 border-ruby p-2">
                <img
                  src="/icons/warning.svg"
                  alt=""
                  className="size-10 shrink-0"
                />

                <div>
                  <p className="font-semibold tracking-wide text-ruby uppercase">
                    Requirement missed:
                  </p>

                  <div className="mt-1">
                    {result.requirementsMissed.map((requirement) => (
                      <p key={requirement} className="text-sm">
                        {formatGuestRequest(requirement)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {result.preferencesMissed.length > 0 && (
              <div className="flex items-center gap-6 border-b-2 border-ruby p-2">
                <img
                  src="/icons/warning.svg"
                  alt=""
                  className="size-10 shrink-0"
                />

                <div>
                  <p className="font-semibold tracking-wide text-ruby uppercase">
                    Preference missed:
                  </p>

                  <div className="mt-1">
                    {result.preferencesMissed.map((preference) => (
                      <p key={preference} className="text-sm">
                        {formatGuestRequest(preference)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onNextGuest}
            className="mx-auto mt-2 cursor-pointer h-14 rounded-md bg-ink/90 backdrop-blur-md px-4 font-semibold tracking-widest text-cream uppercase"
          >
            {isLastGuest ? "Complete shift" : "Next guest"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckInResultModal;
