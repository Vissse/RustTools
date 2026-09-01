import type { ReactNode } from 'react'

/**
 * The reference tables' shared markup.
 *
 * A real `<table>` with a `<caption>` and `<th scope>`, not a grid of divs. The
 * calculators build their results as flex rows, which look identical and carry
 * none of the structure: stripped to text, a div grid is a wall of numbers with
 * no column they belong to. A table survives extraction — every cell keeps its
 * header, which is what lets a model answer "how many rockets for an armored
 * door" from a row it has never seen a rendering of.
 *
 * The caption is visible on purpose. It names what the table covers, and it is
 * the line most likely to be quoted alongside a figure lifted out of it.
 */
export interface Column<T> {
  key: string
  label: string
  align?: 'left' | 'right'
  /** Header for the column that identifies the row (`<th scope="row">`). */
  rowHeader?: boolean
  render: (row: T) => ReactNode
}

export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
}: {
  caption: string
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
}) {
  return (
    <div className="w-full overflow-x-auto border border-border bg-panel">
      <table className="w-full border-collapse text-left min-w-[720px]">
        <caption className="text-text-muted text-sm font-light leading-relaxed text-left px-6 pt-6 pb-4 caption-top">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-border-hi">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={`font-display uppercase text-base text-text-bright tracking-widest font-medium px-6 py-4 whitespace-nowrap ${
                  c.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((c) =>
                c.rowHeader ? (
                  <th
                    key={c.key}
                    scope="row"
                    className="text-text-bright text-base font-medium px-6 py-4 whitespace-nowrap text-left"
                  >
                    {c.render(row)}
                  </th>
                ) : (
                  <td
                    key={c.key}
                    className={`text-text-dim text-base font-light px-6 py-4 whitespace-nowrap ${
                      c.align === 'right' ? 'text-right tabular-nums' : 'text-left'
                    }`}
                  >
                    {c.render(row)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
