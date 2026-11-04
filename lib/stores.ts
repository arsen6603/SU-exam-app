import { createLocalStore } from "./localStore";
import { createBoard, isBoardState } from "./tickets";
import type { Language } from "./types";

export const boardStore = createLocalStore("exam-questions:board", {
  init: createBoard,
  isValid: isBoardState,
});

export const languageStore = createLocalStore<Language>("exam-questions:language", {
  init: () => "en",
  isValid: (value): value is Language => value === "en" || value === "ru",
});

export const teacherModeStore = createLocalStore<boolean>("exam-questions:teacher", {
  init: () => false,
  isValid: (value): value is boolean => typeof value === "boolean",
});
