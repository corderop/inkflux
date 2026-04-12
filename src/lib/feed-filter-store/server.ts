/**
 * Server-side feed filter helpers.
 *
 * Reads the filter state cookie via Astro's server cookie API.
 * Safe to import from .astro frontmatter — no browser APIs used.
 */

import type { AstroCookies } from "astro";
import { FeedFilterStore } from "./index";
import { toNumberArray, EMPTY_STATE, type FilterState } from "./utils";

/**
 * Reads and parses the filter state from Astro's server-side cookie store.
 * Returns an empty (show-all) state if the cookie is absent or malformed.
 */
export function getFilterStateFromCookies(cookies: AstroCookies): FilterState {
  try {
    const raw = cookies.get(FeedFilterStore.COOKIE_NAME)?.value;
    if (!raw) return { ...EMPTY_STATE };
    const parsed = JSON.parse(decodeURIComponent(raw));
    return {
      excludedCategoryIds: toNumberArray(parsed.excludedCategoryIds),
      excludedFeedIds: toNumberArray(parsed.excludedFeedIds),
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}
