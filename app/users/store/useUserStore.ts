"use client";

import { type CachedUser } from "@/lib/db";
import { readCachedPage, savePage } from "@/lib/userCache";
import { create } from "zustand";
import type { RandomUserResponse, UsersByPage, UserState } from "@/users/types";

const API_URL = "https://randomuser.me/api/";

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
  const url = `${API_URL}?page=${page}&results=10`;
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
  loading: false,
  error: undefined,
  offline: false,
  loadPage: async (page = 1) => {
    if (page < 1) return;

    set({ loading: true, error: undefined, currentPage: page });

    const cachedUsers = await readCachedPage(page);
    if (cachedUsers.length) {
      set((state) => ({
        usersByPage: { ...state.usersByPage, [page]: cachedUsers },
        offline: typeof navigator !== "undefined" ? !navigator.onLine : state.offline,
      }));
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
      set((state) => ({
        loading: false,
        error: cachedUsers.length
          ? undefined
          : "Unable to fetch users right now. Check your connection and try again.",
        offline: cachedUsers.length > 0 || state.offline,
      }));
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
}));
