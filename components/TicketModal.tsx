"use client";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLanguage } from "@/hooks/useLanguage";
import { questionById } from "@/lib/quizData";
import type { Ticket } from "@/lib/types";
import { CloseIcon } from "./icons";
import { LuckyTicket } from "./LuckyTicket";
import { QuestionCard } from "./QuestionCard";

type TicketModalProps = {
  ticket: Ticket;
  onClose: () => void;
};

export function TicketModal({ ticket, onClose }: TicketModalProps) {
  const { t } = useLanguage();
  useEscapeKey(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-indigo-950/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
        className="flex w-full max-w-3xl flex-col gap-5 rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="ticket-title" className="text-2xl font-black text-indigo-900">
            {t("question")} {ticket.id}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <CloseIcon />
          </button>
        </div>

        {ticket.kind === "lucky" ? (
          <LuckyTicket />
        ) : (
          ticket.questionIds.map((id, i) => (
            <QuestionCard key={id} question={questionById.get(id)!} index={i + 1} />
          ))
        )}
      </div>
    </div>
  );
}
