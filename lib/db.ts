"use client";

import Dexie from "dexie";

export type CachedUser = {
  id: string;
  page: number;
  fullName: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  avatar: string;
  favorite: boolean;
};

export const db = new Dexie("localUsers");

db.version(1).stores({
  users: "&id, page, favorite",
});

export const usersTable = db.table<CachedUser, string>("users");
