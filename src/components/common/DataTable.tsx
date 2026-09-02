import React, { useState } from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchField?: keyof T;
  searchPlaceholder?: string;
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchField,
  searchPlaceholder = 'Filter records...',
  pageSize = 10,
}: DataTableProps<T>) {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) => {
    if (!filter) return true;
    if (searchField) {
      const val = item[searchField];
      return val ? String(val).toLowerCase().includes(filter.toLowerCase()) : false;
    }
    return Object.values(item).some((v) =>
      v ? String(v).toLowerCase().includes(filter.toLowerCase()) : false
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="w-full space-y-3">
      {/* Search & Counter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-surface-container-high border border-border-muted rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
          />
        </div>
        <span className="font-mono-label text-xs text-on-surface-variant">
          Showing {paginatedData.length} of {filteredData.length} rows
        </span>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto rounded-xl border border-border-muted bg-surface-container/50">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-outline-variant/30 bg-surface-container-high/60 font-mono-label text-on-surface-variant uppercase">
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 font-medium tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-on-surface-variant">
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-3 text-on-surface font-body-sm">
                      {col.render ? col.render(row) : String(row[col.key as string] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-surface-container-high disabled:opacity-30 hover:bg-surface-container-highest"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-surface-container-high disabled:opacity-30 hover:bg-surface-container-highest"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
