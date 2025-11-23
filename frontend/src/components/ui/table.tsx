// frontend/src/components/ui/table.tsx
import * as React from "react";

export const Table = ({
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => (
  <table
    className={`w-full border-collapse text-left text-sm ${className}`}
    {...props}
  />
);

export const TableHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={className} {...props} />
);

export const TableBody = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={className} {...props} />
);

export const TableRow = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`border-t border-slate-800 ${className}`} {...props} />
);

export const TableHead = ({
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`px-2 py-1 text-[11px] font-medium text-slate-400 ${className}`}
    {...props}
  />
);

export const TableCell = ({
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-2 py-1 text-[11px] ${className}`} {...props} />
);
