import { Guestbook } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { memo, useState } from 'react';
import cn from 'clsx';
import GuestbookDeleteButton from './Guestbook/GuestbookDeleteButton';
import Toast from './shared/Toast';

function GuestbookComp({ fallbackData }: { fallbackData: Guestbook[] }) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const { data: queryData } = useQuery(['guestbookReturn'], async () => {
    const res = await fetch('/api/guestbook');
    return res.json();
  });
  const { data: session } = useSession();
  const data = queryData || fallbackData;

  return (
    <>
      <div className={cn('space-y-8', data.length <= 0 ? '' : 'mt-8')}>
        {(data as Guestbook[]).map(guestbook => (
          <div key={guestbook.id}>
            <p className="[font-variation-settings:'wght'_500]">
              {guestbook.body}
            </p>
            <div className="mt-1 flex items-center gap-3 text-sm text-gray-400">
              <p className="">{guestbook.created_by}</p>
              <span>/</span>
              <p>{`${guestbook.created_at}`}</p>
              {guestbook.created_by === session?.user?.name ? (
                <>
                  <span>/</span>
                  <GuestbookDeleteButton
                    id={guestbook.id}
                    isSuccessOpen={isSuccessOpen}
                    setIsSuccessOpen={setIsSuccessOpen}
                    isErrorOpen={isErrorOpen}
                    setIsErrorOpen={setIsErrorOpen}
                  />
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <Toast
        open={isSuccessOpen}
        setOpen={setIsSuccessOpen}
        description="Guestbook deleted successfully"
        status="success"
      />
      <Toast
        open={isErrorOpen}
        setOpen={setIsErrorOpen}
        description="Error deleting guestbook! Please try again later."
        status="error"
      />
    </>
  );
}

export default memo(GuestbookComp);
