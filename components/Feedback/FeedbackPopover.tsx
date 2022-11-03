import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import FeedbackComp from './FeedbackComp';

export default function FeedbackPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="text-[#5d676a]">Feedback</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={5}
          className="min-w-[300px] drop-shadow-2xl"
        >
          <FeedbackComp />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
