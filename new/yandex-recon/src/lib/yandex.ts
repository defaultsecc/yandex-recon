import type { Engine } from '../types/dork';

/**
 * Builds a Yandex search URL for the given query and engine.
 */
export function buildYandexUrl(query: string, engine: Engine): string {
  const encoded = encodeURIComponent(query);
  if (engine === 'yandex.ru') {
    return `https://yandex.ru/search/?text=${encoded}`;
  }
  return `https://yandex.com/search/?text=${encoded}`;
}

/**
 * Opens a Yandex search in a new tab.
 */
export function openInYandex(query: string, engine: Engine): void {
  const url = buildYandexUrl(query, engine);
  window.open(url, '_blank', 'noopener,noreferrer');
}
