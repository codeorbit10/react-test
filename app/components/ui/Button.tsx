"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
  }
>;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
  secondary: "bg-slate-900 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500",
  ghost:
    "border border-slate-300 bg-white font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:text-indigo-200",
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = [baseStyles, variantStyles[variant], className].filter(Boolean).join(" ");
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
