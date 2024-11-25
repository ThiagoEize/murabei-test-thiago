'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createBook } from '@/lib/api/books';
import { useAuthors } from '@/lib/context/authors';
import { useToast } from '@/hooks/use-toast';

const addBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  author_id: z.number().min(1, 'Author is required'),
  synopsis: z.string().optional(),
});

interface CreateBookFormProps {
  onSuccess: () => void;
}

export default function AddBookForm({ onSuccess }: CreateBookFormProps) {
  const { authorsList } = useAuthors();

  const { toast } = useToast()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof addBookSchema>>({
    resolver: zodResolver(addBookSchema),
  });

  const onSubmit = async (data: z.infer<typeof addBookSchema>) => {
    try {
      await createBook(data);
      onSuccess();
      toast({ title: 'Success', description: 'Book created successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while creating the book.' });
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
        <Select onValueChange={(value) => setValue('author_id', Number(value))}>
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
      <Button type="submit">Add Book</Button>
    </form>
  );
}
