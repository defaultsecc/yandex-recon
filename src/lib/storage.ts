import type { Engine, ViewMode } from '../types/dork';

const KEYS = {
  FAVORITES: 'yr_favorites',
  HISTORY: 'yr_history',
  VIEW_MODE: 'yr_view_mode',
  ENGINE: 'yr_engine',
};

export function getFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(KEYS.FAVORITES);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favorites: Set<string>): void {
  try {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify([...favorites]));
  } catch {
    // Storage may be full or unavailable
  }
}

export function getHistory(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function addToHistory(domain: string): string[] {
  try {
    const history = getHistory().filter((d) => d !== domain);
    const updated = [domain, ...history].slice(0, 20);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch {
    return [domain];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEYS.HISTORY);
  } catch {
    // ignore
  }
}

export function getViewMode(): ViewMode {
  try {
    const raw = localStorage.getItem(KEYS.VIEW_MODE);
    if (raw === 'list' || raw === 'grid') return raw;
  } catch {
    // ignore
  }
  return 'grid';
}

export function saveViewMode(mode: ViewMode): void {
  try {
    localStorage.setItem(KEYS.VIEW_MODE, mode);
  } catch {
    // ignore
  }
}

export function getEngine(): Engine {
  try {
    const raw = localStorage.getItem(KEYS.ENGINE);
    if (raw === 'yandex.com' || raw === 'yandex.ru') return raw;
  } catch {
    // ignore
  }
  return 'yandex.com';
}

export function saveEngine(engine: Engine): void {
  try {
    localStorage.setItem(KEYS.ENGINE, engine);
  } catch {
    // ignore
  }
}
