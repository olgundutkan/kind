import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { ReactNode } from 'react'

export type Column<T> = {
  id: keyof T | string
  label: ReactNode
  render?: (row: T) => ReactNode
}

type BaseTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  getRowId?: (row: T) => string | number
}

export function BaseTable<T>({ columns, data, getRowId }: BaseTableProps<T>) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={String(column.id)}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={getRowId?.(row) ?? index}>
            {columns.map((column) => (
              <TableCell key={String(column.id)}>
                {column.render
                  ? column.render(row)
                  : (row as Record<string, unknown>)[column.id as string]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BaseTable
