import type { TopicColor } from "./types";

// Full class names must stay literal here so Tailwind can find them.
export const topicBadgeClassNames: Record<TopicColor, string> = {
  amber: "bg-amber-100 text-amber-900",
  sky: "bg-sky-100 text-sky-900",
  rose: "bg-rose-100 text-rose-900",
  emerald: "bg-emerald-100 text-emerald-900",
  violet: "bg-violet-100 text-violet-900",
  orange: "bg-orange-100 text-orange-900",
  teal: "bg-teal-100 text-teal-900",
  slate: "bg-slate-200 text-slate-900",
};
