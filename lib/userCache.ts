"use client";

import { usersTable, type CachedUser } from "./db";

export const readCachedPage = (page: number) => usersTable.where("page").equals(page).toArray();

export const savePage = async (page: number, users: CachedUser[]) => {
  await usersTable.db.transaction("rw", usersTable, async () => {
    await usersTable.where("page").equals(page).delete();
    await usersTable.bulkAdd(users);
  });
};
