"use client";

type Props = {
  message: string;
};

export function ErrorNotice({ message }: Props) {
  return (
    <div className="mb-4 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/30 dark:text-rose-100">
      {message}
    </div>
  );
}
