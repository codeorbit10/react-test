"use client";

import { Button } from "@/components/ui/Button";

type Props = {
  currentPage: number;
  userCount: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function UserDirectoryFooter({ currentPage, userCount, loading, onPrev, onNext }: Props) {
  return (
    <footer className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-300 sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-900 dark:text-white">Page {currentPage}</span>
        <span className="text-slate-500 dark:text-slate-400">Showing {userCount} users</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onPrev} disabled={currentPage === 1 || loading}>
          Previous
        </Button>
        <Button variant="secondary" onClick={onNext} disabled={loading}>
          Next
        </Button>
      </div>
    </footer>
  );
}
