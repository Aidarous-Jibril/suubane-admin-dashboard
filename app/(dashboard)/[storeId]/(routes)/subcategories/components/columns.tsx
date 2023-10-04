"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction"

export type CategoryColumnTypes = {
  id: string
  name: string;
  categoryName: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Parent Category",
    cell: ({ row }) => row.original.categoryName,
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