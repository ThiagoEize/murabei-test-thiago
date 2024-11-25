'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IBook } from '@/lib/types/books';
import EditBookForm from './form';

interface EditBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book?: IBook;
  refetch: () => void;
}

export default function EditBookDialog({ isOpen, onClose, book, refetch }: EditBookDialogProps) {
  const handleSuccess = () => {
    refetch();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Update the details of the book below.</DialogDescription>
        </DialogHeader>
        {book && <EditBookForm book={book} onSuccess={handleSuccess} />}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
