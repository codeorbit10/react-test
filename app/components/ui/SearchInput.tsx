"use client";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange, placeholder = "Search" }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-200">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Search
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50"
      />
    </div>
  );
}
