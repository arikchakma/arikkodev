import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Toast from '../shared/Toast';

export default function GuestbookDeleteButton({
  id,
  isSuccessOpen,
  setIsSuccessOpen,
  isErrorOpen,
  setIsErrorOpen,
}: {
  id: string;
  isSuccessOpen: boolean;
  setIsSuccessOpen: (open: boolean) => void;
  isErrorOpen: boolean;
  setIsErrorOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const deleteGuestbook = useMutation(
    async (data: { id: string }) => {
      return await fetch(`/api/guestbook/${data.id}`, {
        method: 'DELETE',
      });
    },
    {
      onSuccess: async () => {
        if (isSuccessOpen) {
          setIsSuccessOpen(false);
          setTimeout(() => {
            setIsSuccessOpen(true);
          }, 400);
        } else {
          setIsSuccessOpen(true);
        }
        queryClient.invalidateQueries({
          queryKey: ['guestbookReturn'],
        });
      },
      onError: async () => {
        if (isErrorOpen) {
          setIsErrorOpen(false);
          setTimeout(() => {
            setIsErrorOpen(true);
          }, 400);
        } else {
          setIsErrorOpen(true);
        }
      },
    }
  );

  const deleteBook = (id: string) => {
    deleteGuestbook.mutate({ id });
  };
  return (
    <button
      className="text-red-500 disabled:opacity-60"
      onClick={() => deleteBook(id)}
      disabled={deleteGuestbook.isLoading ? true : false}
    >
      Delete
    </button>
  );
}
