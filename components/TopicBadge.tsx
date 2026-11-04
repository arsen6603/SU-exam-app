import { topicById } from "@/lib/quizData";
import { topicBadgeClassNames } from "@/lib/topics";
import type { Language } from "@/lib/types";

type TopicBadgeProps = { topic: string; language: Language };

export function TopicBadge({ topic, language }: TopicBadgeProps) {
  const { label, color } = topicById.get(topic)!;

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${topicBadgeClassNames[color]}`}>
      {label[language]}
    </span>
  );
}
