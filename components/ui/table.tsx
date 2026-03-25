import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className={cn('min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700', className)}>{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-slate-100 dark:bg-slate-800">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-slate-100 dark:divide-slate-800">{children}</tbody>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-100">{children}</th>;
}

export function TD({ children }: { children: ReactNode }) {
  return <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{children}</td>;
}
