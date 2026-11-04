"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSwitch } from "./LanguageSwitch";
import { PickedCounter } from "./PickedCounter";
import { ResetButton } from "./ResetButton";
import { TeacherModeToggle } from "./TeacherModeToggle";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wide text-amber-300 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-1 text-indigo-200">{t("subtitle")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <PickedCounter />
        <LanguageSwitch />
        <TeacherModeToggle />
        <ResetButton />
      </div>
    </header>
  );
}
