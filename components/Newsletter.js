import { useState, useRef } from 'react';
import cn from 'classnames';

export default function Newsletter({ blog }) {
  const [formState, setFormState] = useState({});
  const inputEl = useRef();

  const subscribe = async e => {
    e.preventDefault();
    console.log(inputEl.current.value);

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      return;
    }

    inputEl.current.value = '';
  };

  return (
    <div className={cn(blog ? 'mb-0' : '', 'my-24')}>
      <div className="relative w-full rounded-lg border-2 border-gray-300 bg-[#F4F4F4] px-7 py-9 dark:border-gray-600 dark:bg-[#1B1D1D]">
        <div className="absolute top-0 left-[-30px] rotate-[-30deg]">
          <span className="rounded bg-yellow-400 p-2 font-semibold text-gray-700">
            Not Available
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Get tech recipes from the chef</h2>
          <p className="mt-3 text-xl font-normal text-gray-400">
            Subscribe to the techletter to get exclusive updates &#38;
            inspiration in your inbox.
          </p>
        </div>

        <form className="mt-7 flex gap-3 sm:flex-col" onSubmit={subscribe}>
          <input
            type="email"
            placeholder="hello@apple.com"
            autoComplete="email"
            required
            className="w-full rounded border-0 bg-[#E3E3E3] px-6 py-3 text-xl font-semibold outline-0 placeholder:text-gray-400 focus:border-0 focus:outline-[0.5px] focus:outline-[#cecece] disabled:cursor-not-allowed dark:bg-[#3C3C3C] dark:focus:outline-gray-500"
            ref={inputEl}
          />
          <button
            type="submit"
            className="w-[180px] rounded bg-[#E3E3E3] px-9 py-3 transition-all hover:bg-[#dedede] disabled:cursor-not-allowed dark:bg-[#3C3C3C] dark:hover:bg-[#454545] sm:w-full"
          >
            <span className="text-xl font-bold">Subscribe</span>
          </button>
        </form>
      </div>
    </div>
  );
}
