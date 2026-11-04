import { useSyncExternalStore } from "react";
import { boardStore } from "@/lib/stores";
import { createBoard } from "@/lib/tickets";

const getServerSnapshot = () => null;

// Returns null during SSR: the board is random, so it is only generated
// in the browser to avoid hydration mismatches.
export function useBoard() {
  const board = useSyncExternalStore(
    boardStore.subscribe,
    boardStore.get,
    getServerSnapshot,
  );

  function pick(ticketId: number) {
    const current = boardStore.get();
    if (current.picked.includes(ticketId)) return;
    boardStore.set({ ...current, picked: [...current.picked, ticketId] });
  }

  function reset() {
    boardStore.set(createBoard());
  }

  return { board, pick, reset };
}
