/**
 * FilteredEntriesRepository
 *
 * Abstracts the pagination-and-filter loop so callers receive a plain
 * Entry[] without worrying about Miniflux's single-category-at-a-time
 * API limitation.
 *
 * Algorithm:
 *   1. Fetch `batchSize` unread entries from Miniflux (offset-based).
 *   2. Filter each batch against the stored FilterState.
 *   3. Accumulate matching entries until `limit` is reached.
 *   4. Stop early if Miniflux has no more entries or `maxCalls` is exhausted.
 *
 * Safe to import from .astro frontmatter — server-side only, no browser APIs.
 */

import type { MinifluxClient } from "../miniflux-client";
import type { Entry } from "../miniflux-client/types";
import { type FilterState } from "../feed-filter-store/utils";

export interface GetFilteredEntriesOptions {
  /** The current stored filter state (excluded category/feed IDs). */
  filterState: FilterState;
  /** Maximum number of matching entries to return. */
  limit: number;
  /** Number of entries to request per API call. */
  batchSize: number;
  /** Hard cap on total API calls regardless of how many entries are matched. */
  maxCalls: number;
}

export class FilteredEntriesRepository {
  constructor(private readonly client: MinifluxClient) {}

  /**
   * Fetches unread entries from Miniflux in batches, filtering each batch
   * against `filterState`, until `limit` visible entries are collected,
   * Miniflux has no more entries, or `maxCalls` is exhausted.
   *
   * Returns at most `limit` entries, sorted by published_at descending
   * (the API's native sort order is preserved between batches).
   */
  async getFilteredUnreadEntries(
    options: GetFilteredEntriesOptions,
  ): Promise<Entry[]> {
    const { filterState, limit, batchSize, maxCalls } = options;
    const collected: Entry[] = [];
    let offset = 0;
    let callCount = 0;

    while (collected.length < limit && callCount < maxCalls) {
      const response = await this.client.getEntries({
        status: "unread",
        order: "published_at",
        direction: "desc",
        limit: batchSize,
        offset,
      });

      callCount++;

      for (const entry of response.entries) {
        if (
          this.isEntryVisible(
            entry.feed_id,
            entry.feed.category.id,
            filterState,
          )
        ) {
          collected.push(entry);
          if (collected.length >= limit) break;
        }
      }

      // Miniflux returned fewer entries than requested — no more exist
      if (response.entries.length < batchSize) break;

      offset += batchSize;
    }

    return collected;
  }

  /**
   * Returns true if an entry with the given feed and category IDs should be
   * shown given the current filter state.
   *
   * Category exclusion takes precedence over individual feed settings.
   */
  private isEntryVisible(
    feedId: number,
    categoryId: number,
    state: FilterState,
  ): boolean {
    if (state.excludedCategoryIds.includes(categoryId)) return false;
    if (state.excludedFeedIds.includes(feedId)) return false;
    return true;
  }
}
