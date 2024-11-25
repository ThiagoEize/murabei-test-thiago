'use client';

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { AuthorActionsDropdown } from "./actions";
import DOMPurify from "dompurify";

const columnHelper = createColumnHelper<any>();

export const AuthorColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "biography",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Biography
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => {
        const biography = info.getValue<string>();
        const sanitizedBiography = DOMPurify.sanitize(biography);
        return (
          <div
            className="prose prose-sm max-w-full"
            dangerouslySetInnerHTML={{ __html: sanitizedBiography }}
          />
        );
      },
    },
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="text-right">
            <AuthorActionsDropdown rowData={rowData} />
          </div>
        );
      },
    }),
  ];
};
