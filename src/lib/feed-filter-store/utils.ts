export interface FilterState {
  excludedCategoryIds: number[];
  excludedFeedIds: number[];
}

export const EMPTY_STATE: FilterState = {
  excludedCategoryIds: [],
  excludedFeedIds: [],
};

/** Safely converts an unknown value to a number[]. */
export function toNumberArray(val: unknown): number[] {
  if (!Array.isArray(val)) return [];
  return val.filter((v): v is number => typeof v === "number");
}
