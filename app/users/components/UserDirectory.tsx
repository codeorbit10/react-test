"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorNotice } from "@/components/ui/ErrorNotice";
import { OfflineBadge } from "@/components/ui/OfflineBadge";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useUserStore } from "@/users/store/useUserStore";
import { UserCard } from "./UserCard";

export function UserDirectory() {
  const { currentPage, usersByPage, loading, error, offline, loadPage, nextPage, prevPage } =
    useUserStore();

  const users = usersByPage[currentPage] ?? [];

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-black dark:via-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">
              Local-first Challenge
            </p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              User Directory
            </h1>
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Fetch users from RandomUser, cache them in IndexedDB for offline resilience, and page
              through locally stored results.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {offline && <OfflineBadge />}
            <Button onClick={() => loadPage(currentPage)} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </header>

        <section className="mt-8">
          {error && <ErrorNotice message={error} />}

          <div className="grid gap-4 sm:grid-cols-2">
            {loading && users.length === 0
              ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
              : users.map((user) => <UserCard key={user.id} user={user} />)}
          </div>

          {!loading && users.length === 0 && !error && (
            <div className="mt-10 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-slate-500 dark:border-zinc-800 dark:bg-zinc-900">
              No users to show yet. Try refreshing to fetch data.
            </div>
          )}
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-300 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">Page {currentPage}</span>
            <span className="text-slate-500 dark:text-slate-400">
              Showing {users.length} users
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={prevPage} disabled={currentPage === 1 || loading}>
              Previous
            </Button>
            <Button variant="secondary" onClick={nextPage} disabled={loading}>
              Next
            </Button>
          </div>
        </footer>
      </div>
    </main>
  );
}
