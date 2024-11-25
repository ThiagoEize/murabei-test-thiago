'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CreateBookForm from './form';

interface CreateBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function CreateBookDialog({ isOpen, onClose, refetch }: CreateBookDialogProps) {
  const handleSuccess = () => {
    refetch();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
          <DialogDescription>Add the details of the book below.</DialogDescription>
        </DialogHeader>
        <CreateBookForm onSuccess={handleSuccess} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
