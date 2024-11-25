'use client';

import { useParams } from 'next/navigation';
import { fetchBooksByAuthor } from '@/lib/api/books';
import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { IBook } from '@/lib/types/books';
import Spinner from '@/components/ui/spinner';
import BookTable from '@/components/shared/book-table';
import { AboutInformations } from './components/author-informations';

export default function AuthorPage() {
  const { authorSlug } = useParams(); // Extract the dynamic route parameter

  const {
    data: books,
    isLoading: isLoadingBooks,
    refetch: refetchBooks,
  } = usePaginatedQuery<IBook[]>({
    queryKey: ['books-by-author', authorSlug as string], // Unique query key for each author
    fetch: () => fetchBooksByAuthor(authorSlug as string), // Fetch books using the authorSlug
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
      <AboutInformations authorSlug={authorSlug as string} />
      <BookTable
        books={books || []}
        refetchBooks={refetchBooks}
      />
    </div>
  );
}
