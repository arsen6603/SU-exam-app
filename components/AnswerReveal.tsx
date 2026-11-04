"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Question } from "@/lib/types";
import { CodeBlock } from "./CodeBlock";
import { EyeIcon, EyeOffIcon } from "./icons";

type AnswerRevealProps = Pick<Question, "answer" | "answerCode">;

export function AnswerReveal({ answer, answerCode }: AnswerRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        aria-expanded={revealed}
        className="flex items-center gap-2 self-start rounded-full border border-indigo-200 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
      >
        {revealed ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
        {revealed ? t("hideAnswer") : t("showAnswer")}
      </button>

      {revealed && (
        <div className="flex flex-col gap-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            {t("answer")}
          </p>
          <p className="leading-relaxed text-slate-800">{answer[language]}</p>
          {answerCode && <CodeBlock code={answerCode} />}
        </div>
      )}
    </div>
  );
}
