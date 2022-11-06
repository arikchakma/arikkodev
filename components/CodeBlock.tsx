import { useState, useRef, useEffect, ReactNode, Fragment } from 'react';
import copy from 'copy-to-clipboard';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

export default function CodeBlock({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  const codeRef = useRef<HTMLModElement>(null);

  const [hasCopied, setHasCopied] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (codeRef.current) {
      setCode(codeRef.current.innerText);
    }
  }, []);

  return (
    <>
      <code ref={codeRef} {...props}>
        {children}
      </code>
      <button
        aria-label="Copy code to clipboard"
        onClick={() => {
          copy(code);
          setHasCopied(true);
          setTimeout(() => setHasCopied(false), 2000);
        }}
        className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-300 ring-1  ring-gray-200 transition-all duration-200 hover:bg-gray-200 hover:text-gray-400 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        {hasCopied ? <CheckIcon /> : <ClipboardIcon className="" />}
      </button>
    </>
  );
}
