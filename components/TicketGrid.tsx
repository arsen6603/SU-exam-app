import type { Ticket } from "@/lib/types";
import { TicketCell } from "./TicketCell";

type TicketGridProps = {
  tickets: Ticket[];
  picked: number[];
  label: string;
  onSelect: (ticketId: number) => void;
};

export function TicketGrid({ tickets, picked, label, onSelect }: TicketGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
      {tickets.map((ticket) => (
        <TicketCell
          key={ticket.id}
          number={ticket.id}
          label={label}
          picked={picked.includes(ticket.id)}
          lucky={ticket.kind === "lucky"}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
