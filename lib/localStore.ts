type Listener = () => void;

export type LocalStore<T> = {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: Listener) => () => void;
};

type Options<T> = {
  init: () => T;
  isValid: (value: unknown) => value is T;
};

// A tiny localStorage-backed store for useSyncExternalStore. The value is
// cached in memory so getSnapshot returns a stable reference between renders.
export function createLocalStore<T>(
  key: string,
  { init, isValid }: Options<T>,
): LocalStore<T> {
  let cache: T | undefined;
  const listeners = new Set<Listener>();

  function persist(value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable (private mode); keep the in-memory value.
    }
  }

  function readStored(): unknown {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? undefined : JSON.parse(raw);
    } catch {
      return undefined;
    }
  }

  function get(): T {
    if (cache === undefined) {
      const stored = readStored();
      if (isValid(stored)) {
        cache = stored;
      } else {
        cache = init();
        persist(cache);
      }
    }
    return cache;
  }

  function set(value: T) {
    cache = value;
    persist(value);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);

    // Keep several open tabs in sync.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      cache = undefined;
      listener();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return { get, set, subscribe };
}
