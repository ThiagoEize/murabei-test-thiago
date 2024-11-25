'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { IBook } from '@/lib/types/books';
import { updateBook } from '@/lib/api/books';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthors } from '@/lib/context/authors';

const editBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  author_id: z.number().min(1, 'Author is required'),
  synopsis: z.string().optional(),
});

interface EditBookFormProps {
  book: IBook;
  onSuccess: () => void;
}

export default function EditBookForm({ book, onSuccess }: EditBookFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof editBookSchema>>({
    resolver: zodResolver(editBookSchema),
    defaultValues: book,
  });

  const { toast } = useToast()

  const { authorsList } = useAuthors();

  const authorId = watch("author_id");

  useEffect(() => {
    if (book) {
      setValue('title', book.title || '');
      setValue('publisher', book.publisher || '');
      setValue('author_id', book.author_id || 0);
    }
  }, [book, setValue]);

  const onSubmit = async (data: z.infer<typeof editBookSchema>) => {
    try {
      await updateBook(book.id, data);
      toast({ title: 'Success', description: 'Book updated successfully.' });
      onSuccess();
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while updating the book.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Publisher</label>
        <Input id="publisher" {...register('publisher')} />
        {errors.publisher && <p className="text-red-500">{errors.publisher.message}</p>}
      </div>
      <div>
        <label htmlFor="author_id" className="block text-sm font-medium text-gray-700">Author</label>
        <Select value={authorId?.toString() || ''} onValueChange={(value) => setValue('author_id', Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authorsList?.map((author) => author && (
              <SelectItem key={author.id} value={author.id.toString()}>
                {author.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.author_id && <p className="text-red-500">{errors.author_id.message}</p>}
      </div>
      <div>
        <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Synopses</label>
        <Input id="synopsis" {...register('synopsis')} />
        {errors.synopsis && <p className="text-red-500">{errors.synopsis.message}</p>}
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
