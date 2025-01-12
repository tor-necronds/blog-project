'use client';

import { deleteBlog } from '@/features/blog/actions';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

interface DeleteBtnProps {
  id: string;
}

export default function DeleteBtn({ id }: DeleteBtnProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteBlog(id);
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    });
  };

  return (
    <Button
      className="bg-red-600 hover:bg-red-500 disabled:bg-red-400 
            disabled:cursor-not-allowed disabled:opacity-100"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
