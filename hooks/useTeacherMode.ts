import { useSyncExternalStore } from "react";
import { teacherModeStore } from "@/lib/stores";

const getServerSnapshot = () => false;

export function useTeacherMode() {
  const enabled = useSyncExternalStore(
    teacherModeStore.subscribe,
    teacherModeStore.get,
    getServerSnapshot,
  );

  const toggle = () => teacherModeStore.set(!teacherModeStore.get());

  return { enabled, toggle };
}
