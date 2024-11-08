"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Users } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<Users>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "username",
    header: "USERNAME",
  },
  {
    accessorKey: "firstname",
    header: "FIRSTNAME",
  },
  {
    accessorKey: "lastname",
    header: "LASTNAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "stripeCustomerId",
    header: "STRIPE ID",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
