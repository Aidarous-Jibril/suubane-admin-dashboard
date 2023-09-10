"use client"

import CellAction from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/CellAction"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumnTypes = {
  id: string
  name: string
  value: string
  createdAt: string 
}

export const columns: ColumnDef<SizeColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction  data={row.original} /> ,
  },
]
