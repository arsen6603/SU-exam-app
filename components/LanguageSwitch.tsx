"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/lib/types";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
];

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex rounded-full bg-white/10 p-1" role="group" aria-label="Language">
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={language === value}
          onClick={() => setLanguage(value)}
          className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
            language === value
              ? "bg-amber-300 text-indigo-950"
              : "text-indigo-100 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
