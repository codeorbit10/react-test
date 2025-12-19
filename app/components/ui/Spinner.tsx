"use client";

type Size = "sm" | "md";

const sizeClass: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

type Props = {
  size?: Size;
  label?: string;
};

export function Spinner({ size = "sm", label }: Props) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
      <span
        className={`inline-block rounded-full border-2 border-slate-300 border-t-indigo-600 ${sizeClass[size]} animate-spin`}
        aria-label={label ?? "Loading"}
      />
      {label}
    </span>
  );
}
