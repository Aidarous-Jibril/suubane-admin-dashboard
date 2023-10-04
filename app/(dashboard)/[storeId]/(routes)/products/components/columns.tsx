"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction"

export type ProductColumnTypes = {
  id: string
  name: string;
  price: string;
  size: string;
  color: string;
  brand: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row}) => (
      <div className="flex items-center gap-x-2">
        <div className="w-6 h-6 rounded-full border" style={{backgroundColor: row.original.color}}>
          {row.original.color}
        </div>
      </div>
    )
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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