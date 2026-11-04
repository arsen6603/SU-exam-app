# Exam Tickets

A board of numbered tickets for oral exams and class quizzes. A student picks a tile and gets two questions from two different topics. Picked tiles are locked until you reset the board.

**[Русская версия ниже](#русский)**

## Features

- 35 tiles (configurable). Each ticket holds 2 questions from different topics, and questions are spread evenly across tickets.
- Lucky tickets: a fun message instead of questions.
- English and Russian interface and content.
- Teacher mode: an eye button under each question reveals the answer.
- **Reset** reshuffles all tickets and unlocks them.
- Progress is saved in the browser, so a page refresh doesn't reshuffle the board.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Use your own questions

Everything shown on the board comes from **[`data/questions.json`](data/questions.json)**. Edit that file and the page reloads with your content.

```jsonc
{
  "$schema": "./questions.schema.json",
  "ticketCount": 35,              // tiles on the board, lucky ones included
  "luckyTicket": {
    "count": 2,                   // set to 0 to disable
    "title": { "en": "Lucky ticket!", "ru": "Счастливый билет!" },
    "text":  { "en": "...", "ru": "..." }
  },
  "topics": [
    { "id": "js", "label": { "en": "JavaScript", "ru": "JavaScript" }, "color": "amber" }
  ],
  "questions": [
    {
      "id": "js-loops",            // unique
      "topic": "js",               // must match a topic id
      "question": { "en": "Tell about loops in JS", "ru": "Расскажите о циклах в JS" },
      "code": "for (let i = 0; i < 3; i++) {}",   // optional, shown under the question
      "answer": { "en": "...", "ru": "..." },
      "answerCode": "..."                          // optional, shown with the answer
    }
  ]
}
```

- **Colors** for topics: `amber`, `sky`, `rose`, `emerald`, `violet`, `orange`, `teal`, `slate`.
- **Code** is a plain string. Use `\n` for new lines.
- **How many questions?** Each ticket uses 2 questions, so a board needs `(ticketCount − luckyTicket.count) × 2` slots. With fewer questions than that, each question appears on several tickets, evenly. Using at least 2 topics keeps both questions of a ticket from different topics.
- **Validation:** if something is missing or misspelled, `npm run dev` / `npm run build` stops with a message pointing to the exact field, e.g. `data/questions.json → questions[3].answer.ru: must be a non-empty string`. In VS Code the `$schema` line also gives autocomplete and highlights mistakes as you type.
- **More questions:** [`data/question-bank.json`](data/question-bank.json) has extra questions (JavaScript, HTTP, auth, PostgreSQL) that aren't on the board. Copy any of them into `questions.json`.

## Deploy

It's a static Next.js app, so it deploys to [Vercel](https://vercel.com/new) as is. Import the repository and click Deploy.

## Tech

Next.js (App Router), React, TypeScript, Tailwind CSS.

---

## Русский

Доска пронумерованных билетов для устного экзамена или опроса. Студент выбирает плитку и получает два вопроса из двух разных тем. Выбранные билеты блокируются до сброса доски.

### Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

### Свои вопросы

Всё содержимое берётся из файла **[`data/questions.json`](data/questions.json)**:

- `ticketCount` — сколько всего билетов на доске (вместе со счастливыми);
- `luckyTicket` — счастливые билеты: количество (`0` — отключить), заголовок и текст;
- `topics` — темы: `id`, название на двух языках и цвет (`amber`, `sky`, `rose`, `emerald`, `violet`, `orange`, `teal`, `slate`);
- `questions` — вопросы: уникальный `id`, `topic` (id темы), `question` и `answer` на `en` и `ru`, по желанию `code` и `answerCode` (код, перенос строки — `\n`).

Если в файле ошибка, при запуске будет сообщение с точным местом, например `questions[3].answer.ru: must be a non-empty string`. Дополнительные вопросы лежат в [`data/question-bank.json`](data/question-bank.json) — их можно копировать в `questions.json`.

В режиме учителя под каждым вопросом появляется кнопка с глазом, которая показывает ответ.
