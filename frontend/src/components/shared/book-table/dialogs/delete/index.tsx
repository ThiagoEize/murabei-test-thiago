'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IBook } from '@/lib/types/books';
import { deleteBook } from '@/lib/api/books';
import { useToast } from '@/hooks/use-toast';

interface DeleteBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book?: IBook;
  refetch: () => void;
}

export default function DeleteBookDialog({ isOpen, onClose, book, refetch }: DeleteBookDialogProps) {
  const { toast } = useToast()
  const handleDelete = async () => {
    if (!book?.id) return;
    try {
      await deleteBook(book.id);
      refetch();
      toast({ title: 'Success', description: 'Book deleted successfully.' });
      onClose();
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while deleting the book.' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
