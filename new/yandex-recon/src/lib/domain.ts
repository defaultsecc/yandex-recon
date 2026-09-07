/**
 * Normalizes a user-entered domain string.
 * Strips protocols, www prefix, trailing slashes, and paths.
 * Returns lowercase domain or null if invalid.
 */
export function normalizeDomain(input: string): string | null {
  if (!input || !input.trim()) return null;

  let val = input.trim().toLowerCase();

  // Strip protocol
  val = val.replace(/^https?:\/\//i, '');

  // Strip www.
  val = val.replace(/^www\./i, '');

  // Strip trailing slash and any path
  const slashIdx = val.indexOf('/');
  if (slashIdx !== -1) {
    val = val.substring(0, slashIdx);
  }

  // Strip port
  const portIdx = val.indexOf(':');
  if (portIdx !== -1) {
    val = val.substring(0, portIdx);
  }

  // Validate: must have at least one dot, only valid chars
  const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/;
  if (!domainRegex.test(val)) return null;

  return val;
}

/**
 * Reverses a domain for Yandex rhost: operator.
 * example.com → com.example
 * sub.example.com → com.example.sub
 */
export function reverseHost(domain: string): string {
  const parts = domain.split('.');
  return parts.reverse().join('.');
}

/**
 * Validates that a string looks like a domain.
 */
export function isValidDomain(input: string): boolean {
  return normalizeDomain(input) !== null;
}
