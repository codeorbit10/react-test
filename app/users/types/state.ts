import type { CachedUser } from "@/lib/db";

export type UsersByPage = Record<number, CachedUser[]>;

export type UserState = {
  currentPage: number;
  usersByPage: UsersByPage;
  loading: boolean;
  error?: string;
  offline: boolean;
  manualOffline: boolean;
  loadPage: (page?: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  setManualOffline: (on: boolean) => Promise<void>;
};
