'use client';

import { DataTable } from '@/components/shared/data-table';
import { IBook } from '@/lib/types/books';
import { useEffect, useState, useMemo } from 'react';
import { BookColumns } from './columns';
import EditBookDialog from './dialogs/edit';
import CreateBookDialog from './dialogs/add';
import DetailsBookDialog from './dialogs/show';
import DeleteBookDialog from './dialogs/delete';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';

export type ModalType = "delete" | "edit" | "create" | "view";

export interface IBookState {
  type: ModalType | null;
  isOpen: boolean;
  data?: IBook;
}

interface BookTableProps {
  books: IBook[];
  refetchBooks: () => void;
}

export default function BookTable({
  books,
  refetchBooks,
}: BookTableProps) {
  const [modalState, setModalState] = useState<IBookState>({
    type: null,
    isOpen: false,
    data: undefined,
  });
  const columns = BookColumns(setModalState);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 1000);

  const filteredBooks = useMemo(() => {
    if (!debouncedQuery) return books;
    return books?.filter((book) =>
      book?.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, books]);

  const handleCloseModal = () => {
    setModalState({ type: null, isOpen: false, data: undefined });
  };

  function handleAddBook(): void {
    setModalState({ type: 'create', isOpen: true, data: undefined });
  }

  useEffect(() => {
    console.log('modalState', modalState);
    //react-hooks/exhaustive-deps
  }, [modalState.type]);

  return (
    <div>
      <div className="mb-4">
        <div className="flex mb-4 gap-2">
          <Input
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="2-20"
          />
          <Button className="bg-green-600" onClick={handleAddBook}>Add book</Button>
        </div>
      </div>
      <DataTable columns={columns} data={filteredBooks} />
      {modalState.type === "edit" && (
        <EditBookDialog
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          book={modalState.data}
          refetch={refetchBooks}
        />
      )}
      {modalState.type === "create" && (
        <CreateBookDialog
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          refetch={refetchBooks}
        />
      )}
      {modalState.type === "view" && (
        <DetailsBookDialog
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          book={modalState.data}
        />
      )}
      {modalState.type === "delete" && (
        <DeleteBookDialog
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          book={modalState.data}
          refetch={refetchBooks}
        />
      )}
    </div>
  );
}
