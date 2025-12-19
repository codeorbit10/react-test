"use client";

export function OfflineBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-100">
      <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
      Offline mode (serving cached data)
    </span>
  );
}
