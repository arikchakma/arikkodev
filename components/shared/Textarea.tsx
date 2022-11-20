import { forwardRef, HTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import cn from 'clsx';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  rows: number;
  error: FieldErrors;
  minLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function textarea({ rows, error, placeholder, className, ...props }, ref) {
    return (
      <>
        <textarea
          {...props}
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          minLength={props.minLength}
          className={cn(
            'block w-full rounded-md border-none bg-link-color/5 p-2 outline-none focus:ring-1 focus:ring-indigo-500',
            error.message ? 'ring-1 ring-red-500' : '',
            className
          )}
        />
        {error.message ? (
          <p className="mt-1 text-sm text-red-500">{`${error.message.message}`}</p>
        ) : null}
      </>
    );
  }
);

export default Textarea;
