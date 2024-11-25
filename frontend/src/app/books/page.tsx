'use client';

import { fetchBooks } from '@/lib/api/books';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { IBook } from '@/lib/types/books';
import Spinner from '@/components/ui/spinner';
import BookTable from '@/components/shared/book-table';

export default function Books() {

  const {
    data: books,
    isLoading: isLoadingBooks,
    refetch: refetchBooks,
  } = usePaginatedQuery<IBook[]>({
    queryKey: ['books'],
    fetch: () => fetchBooks(),
  });

  if (isLoadingBooks) {
    return (
      <div className="flex justify-center items-center h-full mx-8 my-4">
        <Spinner size="large" color="border-blue-500" />
      </div>
    );
  }

  return (
    <div className='mx-8 my-4'>
      <BookTable
        books={books || []}
        refetchBooks={refetchBooks}
      />
    </div>
  );
}
