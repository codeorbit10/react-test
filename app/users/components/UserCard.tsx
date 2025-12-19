"use client";

import type { CachedUser } from "@/lib/db";
import Image from "next/image";

type Props = {
  user: CachedUser;
};

export function UserCard({ user }: Props) {
  return (
    <article className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={user.avatar}
        alt={user.fullName}
        width={64}
        height={64}
        sizes="64px"
        className="h-16 w-16 flex-none rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{user.fullName}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {user.city}, {user.country}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.phone}</p>
      </div>
    </article>
  );
}
