"use client"

import CellAction from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/CellAction"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumnTypes = {
  id: string
  label: string
  createdAt: string 
}

export const columns: ColumnDef<BillboardColumnTypes>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
