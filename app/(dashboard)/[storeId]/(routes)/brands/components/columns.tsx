"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction"

export type CategoryColumnTypes = {
  id: string
  name: string;
  subCategoryName: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Sub Category",
    cell: ({ row }) => row.original.subCategoryName,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];