import rawData from "@/data/questions.json";
import { topicColors, type Language, type QuizData } from "./types";

const languages: Language[] = ["en", "ru"];

class QuizDataError extends Error {
  constructor(path: string, problem: string) {
    super(`data/questions.json → ${path}: ${problem}`);
    this.name = "QuizDataError";
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkString(value: unknown, path: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new QuizDataError(path, "must be a non-empty string");
  }
}

function checkLocalized(value: unknown, path: string) {
  if (!isObject(value)) throw new QuizDataError(path, 'must be an object like { "en": "...", "ru": "..." }');
  for (const language of languages) checkString(value[language], `${path}.${language}`);
}

function checkCount(value: unknown, path: string, min: number) {
  if (!Number.isInteger(value) || (value as number) < min) {
    throw new QuizDataError(path, `must be an integer >= ${min}`);
  }
}

// Validates the JSON at build time so a typo in someone's custom question
// file fails with a readable message instead of a broken page.
function validate(data: unknown): QuizData {
  if (!isObject(data)) throw new QuizDataError("root", "must be an object");

  checkCount(data.ticketCount, "ticketCount", 1);

  const lucky = data.luckyTicket;
  if (!isObject(lucky)) throw new QuizDataError("luckyTicket", "must be an object");
  checkCount(lucky.count, "luckyTicket.count", 0);
  if ((lucky.count as number) >= (data.ticketCount as number)) {
    throw new QuizDataError("luckyTicket.count", "must be smaller than ticketCount");
  }
  checkLocalized(lucky.title, "luckyTicket.title");
  checkLocalized(lucky.text, "luckyTicket.text");

  if (!Array.isArray(data.topics) || data.topics.length === 0) {
    throw new QuizDataError("topics", "must be a non-empty array");
  }
  const topicIds = new Set<string>();
  data.topics.forEach((topic: unknown, i) => {
    const path = `topics[${i}]`;
    if (!isObject(topic)) throw new QuizDataError(path, "must be an object");
    checkString(topic.id, `${path}.id`);
    if (topicIds.has(topic.id as string)) throw new QuizDataError(`${path}.id`, `duplicate topic "${topic.id}"`);
    topicIds.add(topic.id as string);
    checkLocalized(topic.label, `${path}.label`);
    if (!topicColors.includes(topic.color as never)) {
      throw new QuizDataError(`${path}.color`, `must be one of: ${topicColors.join(", ")}`);
    }
  });

  if (!Array.isArray(data.questions) || data.questions.length < 2) {
    throw new QuizDataError("questions", "must be an array with at least 2 questions");
  }
  const questionIds = new Set<string>();
  data.questions.forEach((question: unknown, i) => {
    const path = `questions[${i}]`;
    if (!isObject(question)) throw new QuizDataError(path, "must be an object");
    checkString(question.id, `${path}.id`);
    if (questionIds.has(question.id as string)) {
      throw new QuizDataError(`${path}.id`, `duplicate question id "${question.id}"`);
    }
    questionIds.add(question.id as string);
    if (!topicIds.has(question.topic as string)) {
      throw new QuizDataError(`${path}.topic`, `unknown topic "${question.topic}", add it to "topics" first`);
    }
    checkLocalized(question.question, `${path}.question`);
    checkLocalized(question.answer, `${path}.answer`);
    if (question.code !== undefined) checkString(question.code, `${path}.code`);
    if (question.answerCode !== undefined) checkString(question.answerCode, `${path}.answerCode`);
  });

  return data as QuizData;
}

export const quizData = validate(rawData);

export const questions = quizData.questions;
export const questionById = new Map(questions.map((q) => [q.id, q]));
export const topicById = new Map(quizData.topics.map((t) => [t.id, t]));
