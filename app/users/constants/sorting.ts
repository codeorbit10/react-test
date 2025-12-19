export const SORT_FIELDS = ["name", "email", "city", "country"] as const;
export type SortField = (typeof SORT_FIELDS)[number];
