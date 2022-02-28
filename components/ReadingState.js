import React from 'react';
import cn from 'classnames';
import BookmarkIcon from './icons/BookmarkIcon';
import DoneIcon from './icons/DoneIcon';

export default function ReadingState({ readingState, label, classNames }) {
  const readingStateFresh = readingState.toLowerCase();
  return (
    <div className={cn('flex', classNames)}>
      <div
        className={cn(
          'flex items-center justify-center gap-1 rounded p-1 px-2',
          readingStateFresh === 'done' ? 'bg-green-700/10' : 'bg-yellow-700/10'
        )}
      >
        {readingStateFresh === 'done' ? (
          <DoneIcon color="fill-green-500" />
        ) : (
          <BookmarkIcon color="fill-yellow-500" />
        )}
        <span
          className={cn(
            'text-sm font-medium',
            readingStateFresh === 'done' ? 'text-green-700' : 'text-yellow-700 dark:text-yellow-600'
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
