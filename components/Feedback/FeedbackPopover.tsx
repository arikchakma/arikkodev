import * as Popover from '@radix-ui/react-popover';
import FeedbackComp from './FeedbackComp';
import { useState } from 'react';
import SuccessToast from '../shared/SuccessToast';
import ErrorToast from '../shared/ErrorToast';

export default function FeedbackPopover() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <div>
          <button className="text-[#5d676a]">Feedback</button>
          <SuccessToast open={isSuccessOpen} setOpen={setIsSuccessOpen} />
          <ErrorToast open={isErrorOpen} setOpen={setIsErrorOpen} />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={5}
          className="min-w-[300px] drop-shadow-2xl"
        >
          <FeedbackComp
            isSuccessOpen={isSuccessOpen}
            setIsSuccessOpen={setIsSuccessOpen}
            isErrorOpen={isErrorOpen}
            setIsErrorOpen={setIsErrorOpen}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
