"use client";

import { useState } from "react";
import { useBoard } from "@/hooks/useBoard";
import { useLanguage } from "@/hooks/useLanguage";
import { TicketGrid } from "./TicketGrid";
import { TicketModal } from "./TicketModal";

export function TicketBoard() {
  const { board, pick } = useBoard();
  const { t } = useLanguage();
  const [openTicketId, setOpenTicketId] = useState<number | null>(null);

  if (!board) {
    return <p className="py-24 text-center text-indigo-200">{t("loading")}</p>;
  }

  const openTicket = board.tickets.find((ticket) => ticket.id === openTicketId);

  function handleSelect(ticketId: number) {
    pick(ticketId);
    setOpenTicketId(ticketId);
  }

  return (
    <>
      <TicketGrid
        tickets={board.tickets}
        picked={board.picked}
        label={t("question")}
        onSelect={handleSelect}
      />
      {openTicket && (
        <TicketModal ticket={openTicket} onClose={() => setOpenTicketId(null)} />
      )}
    </>
  );
}
