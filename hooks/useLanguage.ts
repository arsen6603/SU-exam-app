import { useSyncExternalStore } from "react";
import { translate, type StringKey } from "@/lib/i18n";
import { languageStore } from "@/lib/stores";
import type { Language } from "@/lib/types";

const getServerSnapshot = (): Language => "en";

export function useLanguage() {
  const language = useSyncExternalStore(
    languageStore.subscribe,
    languageStore.get,
    getServerSnapshot,
  );

  const t = (key: StringKey) => translate(key, language);

  return { language, setLanguage: languageStore.set, t };
}
