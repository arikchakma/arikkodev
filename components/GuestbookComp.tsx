import { Guestbook } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { memo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function GuestbookComp({ fallbackData }: { fallbackData: Guestbook[] }) {
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ['guestbookReturn'],
    async () => {
      const res = await fetch('/api/guestbook');
      return res.json();
    },
    {
      placeholderData: fallbackData,
    }
  );
  const deleteGuestbook = useMutation(
    async (data: { id: string }) => {
      return await fetch(`/api/guestbook/${data.id}`, {
        method: 'DELETE',
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ['guestbookReturn'],
        });
      },
    }
  );
  const { data: session } = useSession();

  const deleteBook = (id: string) => {
    deleteGuestbook.mutate({ id });
  };

  return (
    <div className="mt-8 space-y-8">
      {(data as Guestbook[]).map(guestbook => (
        <div key={guestbook.id}>
          <p>{guestbook.body}</p>
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
            <p>{guestbook.created_by}</p>
            <span>/</span>
            <p>{`${guestbook.created_at}`}</p>
            {guestbook.created_by === session?.user?.name ? (
              <>
                <span>/</span>
                <button
                  className="text-red-500"
                  onClick={() => deleteBook(guestbook.id)}
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(GuestbookComp);
