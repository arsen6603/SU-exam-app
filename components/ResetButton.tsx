"use client";

import { useBoard } from "@/hooks/useBoard";
import { useLanguage } from "@/hooks/useLanguage";
import { ResetIcon } from "./icons";

export function ResetButton() {
  const { reset } = useBoard();
  const { t } = useLanguage();

  function handleClick() {
    if (window.confirm(t("resetConfirm"))) reset();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
    >
      <ResetIcon className="size-4" />
      {t("reset")}
    </button>
  );
}
