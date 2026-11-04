export type Language = "en" | "ru";

export type Localized = Record<Language, string>;

export const topicColors = [
  "amber",
  "sky",
  "rose",
  "emerald",
  "violet",
  "orange",
  "teal",
  "slate",
] as const;

export type TopicColor = (typeof topicColors)[number];

export type TopicConfig = {
  id: string;
  label: Localized;
  color: TopicColor;
};

export type Question = {
  id: string;
  topic: string;
  question: Localized;
  code?: string;
  answer: Localized;
  answerCode?: string;
};

export type QuizData = {
  ticketCount: number;
  luckyTicket: {
    count: number;
    title: Localized;
    text: Localized;
  };
  topics: TopicConfig[];
  questions: Question[];
};

export type Ticket =
  | { id: number; kind: "questions"; questionIds: [string, string] }
  | { id: number; kind: "lucky" };

export type BoardState = {
  tickets: Ticket[];
  picked: number[];
};
