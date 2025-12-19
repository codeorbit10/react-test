"use client";

import { usersTable, type CachedUser } from "./db";

export const readCachedPage = (page: number) => usersTable.where("page").equals(page).toArray();

export const savePage = async (page: number, users: CachedUser[]) => {
  const existing = await usersTable.bulkGet(users.map((user) => user.id));
  const merged = users.map((user) => {
    const prev = existing.find((record) => record?.id === user.id);
    return prev ? { ...user, favorite: prev.favorite } : user;
  });

  await usersTable.db.transaction("rw", usersTable, async () => {
    await usersTable.where("page").equals(page).delete();
    await usersTable.bulkAdd(merged);
  });
};

export const setFavorite = async (userId: string, favorite: boolean) => {
  await usersTable.update(userId, { favorite });
};
