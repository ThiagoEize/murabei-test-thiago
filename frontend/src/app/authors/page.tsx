'use client';

import AuthorTable from '@/components/shared/author-table';
import { useAuthors } from '@/lib/context/authors';

export default function Authors() {
  const { authorsList } = useAuthors();

  const filteredAuthorsList = authorsList.filter(author => author !== null);

  return (
    <div className='mx-8 my-4'>
      <AuthorTable
        authors={filteredAuthorsList}
      />
    </div>
  );
}
