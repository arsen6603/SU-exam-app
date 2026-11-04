"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { quizData } from "@/lib/quizData";
import { StarIcon } from "./icons";

export function LuckyTicket() {
  const { language } = useLanguage();
  const { title, text } = quizData.luckyTicket;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-amber-50 px-6 py-10 text-center">
      <StarIcon className="size-16 fill-amber-300 text-amber-500" />
      <p className="text-2xl font-black text-amber-700">{title[language]}</p>
      <p className="max-w-md text-lg leading-relaxed text-slate-800">{text[language]}</p>
    </div>
  );
}
