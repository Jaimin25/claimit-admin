"use client";

import Link from "next/link";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Auctions } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<Auctions>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "startingDate",
    header: "Starting Date",
  },
  {
    accessorKey: "endingDate",
    header: "Ending Date",
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
  },
  {
    accessorKey: "user.username",
    header: "OWNER",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/users/${row.original.uid}`}>
          <Button variant={"link"} className="px-0">
            {row.original.user.username}
            <Info />
          </Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
