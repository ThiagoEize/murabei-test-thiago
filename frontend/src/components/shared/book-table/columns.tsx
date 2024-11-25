'use client';

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import { BookActionsDropdown } from "./actions";
import { useAuthors } from "@/lib/context/authors";

const columnHelper = createColumnHelper<any>();

export const BookColumns = (
  setModalState: React.Dispatch<React.SetStateAction<any>>
): ColumnDef<any>[] => {
  const { authorsList } = useAuthors();

  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorFn: (row) => {
        const author = authorsList?.find((author) => author?.id === row.author_id);
        return author ? author.title : "Unknown Author";
      },
      id: "author_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (info) => info.getValue(),
      sortingFn: "text",
    },
    {
      accessorKey: "publisher",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publisher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "pages",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    columnHelper.display({
      id: "actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="text-right">
            <BookActionsDropdown rowData={rowData} setModalState={setModalState} />
          </div>
        );
      },
    }),
  ];
};
