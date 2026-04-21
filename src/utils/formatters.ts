// src/utils/formatters.ts
// Example utility — add your own business logic here

/**
 * Formats a version string for display.
 * Used to show app version in the UI.
 */
export function formatVersion(version: string, buildNumber: number): string {
  return `v${version} (${buildNumber})`;
}

/**
 * Truncates a string to a max length with an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Validates a semantic version string.
 */
export function isValidVersion(version: string): boolean {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}
