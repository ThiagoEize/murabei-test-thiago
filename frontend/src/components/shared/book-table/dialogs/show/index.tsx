'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IBook } from '@/lib/types/books';
import DOMPurify from 'dompurify';

interface DetailsBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  book?: IBook;
}

export default function DetailsBookDialog({ isOpen, onClose, book }: DetailsBookDialogProps) {
  const sanitizedHTML = DOMPurify.sanitize(book?.synopsis || '');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {book && (
            <>
              <DialogTitle>{book.title}</DialogTitle>
              <DialogDescription>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Synopse:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
