import type { CachedUser } from "@/lib/db";
import type { SortField } from "@/users/constants/sorting";

export type UsersByPage = Record<number, CachedUser[]>;
export type SortDirection = "asc" | "desc";

export type UserState = {
  currentPage: number;
  usersByPage: UsersByPage;
  searchTerm: string;
  sortBy: SortField;
  sortDirection: SortDirection;
  loading: boolean;
  error?: string;
  offline: boolean;
  manualOffline: boolean;
  loadPage: (page?: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  setManualOffline: (on: boolean) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSort: (field: SortField, direction: SortDirection) => void;
};
