import { useState, useRef } from 'react';

export default function Subscribe() {
  const [formState, setFormState] = useState({});
  const inputEl = useRef();

  const subscribe = async e => {
    e.preventDefault();

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
    <div className="my-24">
      <div className="w-full px-7 py-9 bg-[#1B1D1D] border-2 border-gray-600 rounded-lg">
        <div>
          <h2 className="font-bold text-3xl">Subscribe to the newsletter</h2>
          <p className="font-normal text-xl text-gray-500 mt-3">
            Do not miss out and join my monthly newsletter to know about new
            arrivals.
          </p>
        </div>

        <form className="mt-7 flex" onSubmit={subscribe}>
          <input
            type="email"
            placeholder="hello@apple.com"
            autoComplete="email"
            required
            className="bg-[#3C3C3C] px-6 py-3 rounded font-semibold text-xl w-full placeholder:text-gray-400 outline-0 border-0 focus:outline-[0.5px] focus:border-0 focus:outline-gray-500"
            ref={inputEl}
          />
          <button
            type="submit"
            className="bg-[#3C3C3C] px-9 py-3 rounded ml-4 w-[180px] hover:bg-[#454545] transition-all"
          >
            <span className="font-bold text-xl">Subscribe</span>
          </button>
        </form>
      </div>
    </div>
  );
}
