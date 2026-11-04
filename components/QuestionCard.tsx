"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { useTeacherMode } from "@/hooks/useTeacherMode";
import type { Question } from "@/lib/types";
import { AnswerReveal } from "./AnswerReveal";
import { CodeBlock } from "./CodeBlock";
import { TopicBadge } from "./TopicBadge";

type QuestionCardProps = { question: Question; index: number };

export function QuestionCard({ question, index }: QuestionCardProps) {
  const { language, t } = useLanguage();
  const { enabled: teacherMode } = useTeacherMode();

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold text-slate-500">
          {t("task")} {index}
        </span>
        <TopicBadge topic={question.topic} language={language} />
      </div>

      <p className="text-lg font-medium leading-relaxed text-slate-900">
        {question.question[language]}
      </p>
      {question.code && <CodeBlock code={question.code} />}

      {teacherMode && (
        <AnswerReveal answer={question.answer} answerCode={question.answerCode} />
      )}
    </article>
  );
}
