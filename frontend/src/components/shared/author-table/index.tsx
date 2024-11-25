'use client';

import { DataTable } from '@/components/shared/data-table';
import { IAuthor } from '@/lib/types/authors';
import { AuthorColumns } from './columns';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
interface AuthorTableProps {
  authors: IAuthor[];
}

export default function AuthorTable({
  authors
}: AuthorTableProps) {
  const columns = AuthorColumns();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 1000);

  const filteredAuthors = useMemo(() => {
    if (!debouncedQuery) return authors;
    return authors?.filter((book) =>
      book?.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, authors]);

  return (
    <div>
      <div className="flex mb-4 gap-2">
        <Input
          placeholder="Search authors by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="2-20"
        />
      </div>
      <DataTable columns={columns} data={filteredAuthors} />
    </div>
  );
}
