import { questionById, questions, quizData } from "./quizData";
import type { BoardState, Question, Ticket } from "./types";

export const TICKET_COUNT = quizData.ticketCount;
const LUCKY_TICKET_COUNT = quizData.luckyTicket.count;
const QUESTION_TICKET_COUNT = TICKET_COUNT - LUCKY_TICKET_COUNT;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const SLOTS_PER_TICKET = 2;

function pickWeighted<T>(items: T[], weight: (item: T) => number): T {
  let roll = Math.random() * items.reduce((sum, item) => sum + weight(item), 0);
  for (const item of items) {
    roll -= weight(item);
    if (roll < 0) return item;
  }
  return items[items.length - 1];
}

// Fills the question tickets' slots so that questions are used evenly
// (e.g. each one at most twice for 35 questions) and the two questions of
// a ticket come from different topics whenever the data allows it. Lucky tickets are mixed in
// at random positions.
export function generateTickets(pool: Question[] = questions): Ticket[] {
  const copies = Math.max(1, Math.ceil((QUESTION_TICKET_COUNT * SLOTS_PER_TICKET) / pool.length));

  // Per-topic decks: all first copies come before second copies, so a
  // question's repeats are spread out.
  const decks = new Map<string, Question[]>();
  for (const topic of new Set(pool.map((q) => q.topic))) {
    const topicQuestions = pool.filter((q) => q.topic === topic);
    decks.set(
      topic,
      Array.from({ length: copies }, () => shuffle(topicQuestions)).flat(),
    );
  }

  const remaining = () => [...decks.values()].reduce((sum, d) => sum + d.length, 0);
  const take = (topic: string) => decks.get(topic)!.shift()!;
  // Takes the next question of a topic that differs from the given one.
  const takeOther = (topic: string, excludeId: string) => {
    const deck = decks.get(topic)!;
    const index = deck.findIndex((q) => q.id !== excludeId);
    return index === -1 ? deck.shift()! : deck.splice(index, 1)[0];
  };

  const tickets: Ticket[] = Array.from({ length: LUCKY_TICKET_COUNT }, () => ({
    id: 0,
    kind: "lucky" as const,
  }));
  while (tickets.length < TICKET_COUNT) {
    const available = [...decks].filter(([, deck]) => deck.length > 0);
    // Always draw from the largest deck first: as long as no topic holds
    // more than half of the remaining cards, a valid pairing always exists.
    const [first] = available.reduce((a, b) => (b[1].length > a[1].length ? b : a));
    const others = available.filter(([topic]) => topic !== first);
    const after = remaining() - SLOTS_PER_TICKET;
    const forced = others.find(([, deck]) => deck.length * 2 > after);
    const firstQuestion = take(first);
    // With a single topic left (or only one topic in the data), both
    // questions come from it.
    const secondQuestion =
      others.length === 0
        ? takeOther(first, firstQuestion.id)
        : take((forced ?? pickWeighted(others, ([, deck]) => deck.length))[0]);

    const pair = shuffle([firstQuestion, secondQuestion]);
    tickets.push({ id: 0, kind: "questions", questionIds: [pair[0].id, pair[1].id] });
  }

  return shuffle(tickets).map((ticket, index) => ({ ...ticket, id: index + 1 }));
}

export function createBoard(): BoardState {
  return { tickets: generateTickets(), picked: [] };
}

export function isBoardState(value: unknown): value is BoardState {
  if (typeof value !== "object" || value === null) return false;
  const { tickets, picked } = value as Partial<BoardState>;
  return (
    Array.isArray(tickets) &&
    tickets.length === TICKET_COUNT &&
    tickets.filter((t) => t?.kind === "lucky").length === LUCKY_TICKET_COUNT &&
    tickets.every(
      (t) =>
        t?.kind === "lucky" ||
        (t?.kind === "questions" &&
          Array.isArray(t.questionIds) &&
          t.questionIds.every((id) => questionById.has(id))),
    ) &&
    Array.isArray(picked) &&
    picked.every((id) => typeof id === "number")
  );
}
