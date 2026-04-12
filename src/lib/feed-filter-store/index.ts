/**
 * Client-side feed filter store.
 *
 * Persists inclusion/exclusion preferences as a non-httpOnly cookie so that
 * the Astro SSR layer can also read the state without a client round-trip.
 *
 * IMPORTANT: Import this file only from <script> tags, never from .astro
 * frontmatter — it depends on `document.cookie` which is browser-only.
 */

import { toNumberArray, EMPTY_STATE, type FilterState } from "./utils";

export class FeedFilterStore {
  static readonly COOKIE_NAME = "inkflux_feed_filter";
  private static readonly MAX_AGE = 60 * 60 * 24 * 365; // 1 year

  /**
   * Reads the current filter state from document.cookie.
   * Returns an empty (show-all) state if the cookie is absent or unparseable.
   */
  getState(): FilterState {
    try {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(FeedFilterStore.COOKIE_NAME + "="));
      if (!match) return { ...EMPTY_STATE };
      // Use slice(1).join("=") to handle base64/encoded values that contain "="
      const raw = decodeURIComponent(match.split("=").slice(1).join("="));
      const parsed = JSON.parse(raw);
      return {
        excludedCategoryIds: toNumberArray(parsed.excludedCategoryIds),
        excludedFeedIds: toNumberArray(parsed.excludedFeedIds),
      };
    } catch {
      return { ...EMPTY_STATE };
    }
  }

  /**
   * Persists the filter state as a non-httpOnly cookie.
   * Fails silently if cookies are blocked (e.g. private browsing).
   */
  setState(state: FilterState): void {
    try {
      const value = encodeURIComponent(JSON.stringify(state));
      document.cookie = [
        `${FeedFilterStore.COOKIE_NAME}=${value}`,
        "path=/",
        `max-age=${FeedFilterStore.MAX_AGE}`,
        "samesite=strict",
      ].join("; ");
    } catch {
      // Fail silently
    }
  }
}
