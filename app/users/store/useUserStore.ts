"use client";

import { type CachedUser } from "@/lib/db";
import { readCachedPage, savePage } from "@/lib/userCache";
import { create } from "zustand";
import { PAGE_SIZE, RANDOM_USER_API } from "@/users/constants/api";
import { FETCH_ERROR_MESSAGE, OFFLINE_NO_CACHE_MESSAGE } from "@/users/constants/messages";
import { SORT_FIELDS } from "@/users/constants/sorting";
import type { RandomUserResponse, UsersByPage, UserState } from "@/users/types";

const mapUser = (page: number, user: RandomUserResponse["results"][number]): CachedUser => ({
  id: user.login.uuid,
  page,
  fullName: `${user.name.first} ${user.name.last}`,
  email: user.email,
  city: user.location.city,
  country: user.location.country,
  phone: user.phone,
  avatar: user.picture.medium,
  favorite: false,
});

const fetchUsers = async (page: number): Promise<CachedUser[]> => {
  const url = `${RANDOM_USER_API}?page=${page}&results=${PAGE_SIZE}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: RandomUserResponse = await response.json();
  return data.results.map((user) => mapUser(page, user));
};

export const useUserStore = create<UserState>((set, get) => ({
  currentPage: 1,
  usersByPage: {} as UsersByPage,
  searchTerm: "",
  sortBy: SORT_FIELDS[0],
  sortDirection: "asc",
  loading: false,
  error: undefined,
  offline: false,
  manualOffline: false,
  loadPage: async (page = 1) => {
    if (page < 1) return;

    const manualOffline = get().manualOffline;
    set({
      loading: true,
      error: undefined,
      currentPage: page,
      offline: manualOffline || get().offline,
    });

    const cachedUsers = await readCachedPage(page);
    if (cachedUsers.length) {
      set({
        usersByPage: { ...get().usersByPage, [page]: cachedUsers },
        offline: manualOffline || (typeof navigator !== "undefined" ? !navigator.onLine : get().offline),
      });
    }

    if (manualOffline) {
      set({
        loading: false,
        error: cachedUsers.length ? undefined : OFFLINE_NO_CACHE_MESSAGE,
        offline: true,
      });
      return;
    }

    try {
      const freshUsers = await fetchUsers(page);
      await savePage(page, freshUsers);
      set((state) => ({
        usersByPage: { ...state.usersByPage, [page]: freshUsers },
        loading: false,
        error: undefined,
        offline: false,
      }));
    } catch {
      set({
        loading: false,
        error: cachedUsers.length ? undefined : FETCH_ERROR_MESSAGE,
        offline: true,
      });
    }
  },
  nextPage: async () => {
    const next = get().currentPage + 1;
    await get().loadPage(next);
  },
  prevPage: async () => {
    const prev = Math.max(1, get().currentPage - 1);
    await get().loadPage(prev);
  },
  setManualOffline: async (on: boolean) => {
    set({ manualOffline: on });
    await get().loadPage(get().currentPage);
  },
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setSort: (field, direction) => set({ sortBy: field, sortDirection: direction }),
}));
