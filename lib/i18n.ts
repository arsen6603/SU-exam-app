import type { Language } from "./types";

const strings = {
  title: { en: "Exam Tickets", ru: "Экзаменационные билеты" },
  subtitle: {
    en: "Pick a question — each one has 2 tasks from different topics",
    ru: "Выберите вопрос — в каждом 2 задания из разных тем",
  },
  question: { en: "Question", ru: "Вопрос" },
  picked: { en: "picked", ru: "выбрано" },
  reset: { en: "Reset", ru: "Сбросить" },
  resetConfirm: {
    en: "Reset the board? All tickets will be reshuffled and unlocked.",
    ru: "Сбросить доску? Все билеты будут перемешаны и снова доступны.",
  },
  teacherMode: { en: "Teacher mode", ru: "Режим учителя" },
  showAnswer: { en: "Show answer", ru: "Показать ответ" },
  hideAnswer: { en: "Hide answer", ru: "Скрыть ответ" },
  answer: { en: "Answer", ru: "Ответ" },
  close: { en: "Close", ru: "Закрыть" },
  task: { en: "Task", ru: "Задание" },
  loading: { en: "Shuffling tickets…", ru: "Перемешиваем билеты…" },
} satisfies Record<string, Record<Language, string>>;

export type StringKey = keyof typeof strings;

export function translate(key: StringKey, language: Language) {
  return strings[key][language];
}
