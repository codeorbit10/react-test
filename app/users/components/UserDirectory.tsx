"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ErrorNotice } from "@/components/ui/ErrorNotice";
import { OfflineBadge } from "@/components/ui/OfflineBadge";
import { SearchInput } from "@/components/ui/SearchInput";
import { Spinner } from "@/components/ui/Spinner";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { OFFLINE_NO_CACHE_MESSAGE } from "@/users/constants/messages";
import { SORT_FIELDS } from "@/users/constants/sorting";
import { useUserStore } from "@/users/store/useUserStore";
import { UserCard } from "./UserCard";
import { UserDirectoryFooter } from "./UserDirectoryFooter";

const controlSurface =
  "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900";

export function UserDirectory() {
  const {
    currentPage,
    usersByPage,
    searchTerm,
    sortBy,
    sortDirection,
    loading,
    error,
    offline,
    manualOffline,
    loadPage,
    nextPage,
    prevPage,
    setManualOffline,
    setSearchTerm,
    setSort,
    toggleFavorite,
  } = useUserStore();

  const usersRaw = usersByPage[currentPage] ?? [];
  const users = usersRaw
    .filter((user) => {
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.city.toLowerCase().includes(query) ||
        user.country.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;
      const fieldValue = {
        name: [a.fullName.toLowerCase(), b.fullName.toLowerCase()],
        email: [a.email.toLowerCase(), b.email.toLowerCase()],
        city: [a.city.toLowerCase(), b.city.toLowerCase()],
        country: [a.country.toLowerCase(), b.country.toLowerCase()],
      }[sortBy];

      if (!fieldValue) return 0;
      if (fieldValue[0] < fieldValue[1]) return -1 * direction;
      if (fieldValue[0] > fieldValue[1]) return 1 * direction;
      return 0;
    });

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
            <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-200">
              <input
                type="checkbox"
                checked={manualOffline}
                onChange={(event) => setManualOffline(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              Go offline
            </label>
            {offline && usersRaw.length > 0 && <OfflineBadge />}
            {loading && <Spinner label="Loading" />}
            <Button onClick={() => loadPage(currentPage)} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </header>

        <section className="mt-6 max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Filter by name, email, or location"
              />
            </div>
            <ThemeToggle />
          </div>
        </section>

        {loading && usersRaw.length === 0 && (
          <div className="mt-8 flex items-center justify-center">
            <Spinner label="Loading users..." />
          </div>
        )}

        <section className="mt-4 max-w-3xl text-sm text-slate-700 dark:text-slate-200">
          <div
            className={`${controlSurface} flex flex-wrap items-center gap-2 px-4 py-2 dark:text-slate-200`}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(event) => setSort(event.target.value as (typeof SORT_FIELDS)[number], sortDirection)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
            >
              {SORT_FIELDS.map((field) => (
                <option key={field} value={field}>
                  {field[0].toUpperCase() + field.slice(1)}
                </option>
              ))}
            </select>
            <Button
              variant="ghost"
              onClick={() => setSort(sortBy, sortDirection === "asc" ? "desc" : "asc")}
            >
              {sortDirection === "asc" ? "Asc" : "Desc"}
            </Button>
          </div>
        </section>

        <section className="mt-8">
          {error && <ErrorNotice message={error} />}

          {loading && users.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <Spinner label="Loading users..." />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {users.map((user) => (
                <UserCard key={user.id} user={user} onToggleFavorite={toggleFavorite} />
              ))}
              {!loading && users.length === 0 && !error && (
                <div className="col-span-full mt-6 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-slate-500 dark:border-zinc-800 dark:bg-zinc-900">
                  {offline ? OFFLINE_NO_CACHE_MESSAGE : "No users to show yet. Try refreshing to fetch data."}
                </div>
              )}
            </div>
          )}

        </section>

        <UserDirectoryFooter
          currentPage={currentPage}
          userCount={users.length}
          loading={loading}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>
    </main>
  );
}
