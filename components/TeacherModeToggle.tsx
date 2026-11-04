"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTeacherMode } from "@/hooks/useTeacherMode";
import { EyeIcon, EyeOffIcon } from "./icons";

export function TeacherModeToggle() {
  const { enabled, toggle } = useTeacherMode();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={toggle}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        enabled
          ? "bg-amber-300 text-indigo-950"
          : "bg-white/10 text-indigo-100 hover:bg-white/20"
      }`}
    >
      {enabled ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
      {t("teacherMode")}
    </button>
  );
}
