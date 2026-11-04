import { CheckIcon, StarIcon } from "./icons";

type TicketCellProps = {
  number: number;
  label: string;
  picked: boolean;
  lucky: boolean;
  onSelect: (number: number) => void;
};

export function TicketCell({ number, label, picked, lucky, onSelect }: TicketCellProps) {
  return (
    <button
      type="button"
      disabled={picked}
      onClick={() => onSelect(number)}
      aria-label={`${label} ${number}`}
      className="group flex aspect-4/3 flex-col items-center justify-center gap-1 rounded-xl border-2 border-indigo-400/40 bg-indigo-700 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-amber-300 disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-indigo-950/60 disabled:shadow-none"
    >
      {picked && lucky && <StarIcon className="size-8 fill-amber-300/60 text-amber-300/80" />}
      {picked && !lucky && <CheckIcon className="size-8 text-indigo-500" />}
      {!picked && (
        <>
          <span className="text-3xl font-black text-amber-300 drop-shadow sm:text-4xl">
            {number}
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-indigo-200 sm:text-xs">
            {label}
          </span>
        </>
      )}
    </button>
  );
}
