"use client";

import { useBoard } from "@/hooks/useBoard";
import { useLanguage } from "@/hooks/useLanguage";
import { TICKET_COUNT } from "@/lib/tickets";

export function PickedCounter() {
  const { board } = useBoard();
  const { t } = useLanguage();

  return (
    <span className="text-sm tabular-nums text-indigo-200">
      {board?.picked.length ?? 0} / {TICKET_COUNT} {t("picked")}
    </span>
  );
}
