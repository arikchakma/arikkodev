import { useState, useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import cn from 'classnames';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
};

export default function Newsletter({ blog }) {
  const [formState, setFormState] = useState({
    loading: false,
    message: '',
    success: false,
    state: false
  });
  const inputEl = useRef();

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeShot]);

  const subscribe = async e => {
    e.preventDefault();

    setFormState(e => {
      return { ...e, loading: true };
    });
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
      setFormState({
        loading: false,
        message: error,
        success: false,
        state: true
      });
      return;
    }

    inputEl.current.value = '';
    setFormState({
      loading: false,
      message: `Hooray! You're now on the list.`,
      success: true,
      state: true
    });
    fire();
  };

  return (
    <div className={cn(blog ? 'mb-0' : '', 'my-24')}>
      <div className="relative w-full rounded-lg border-2 border-gray-300 bg-[#F4F4F4] px-7 py-9 dark:border-gray-600 dark:bg-[#1B1D1D]">
        {/* <div className="absolute top-0 left-[-30px] rotate-[-30deg]">
          <span className="rounded bg-yellow-400 p-2 font-semibold text-gray-700">
            Not Available
          </span>
        </div> */}
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
            className="w-[200px] rounded bg-[#E3E3E3] py-3 transition-all hover:bg-[#dedede] disabled:cursor-not-allowed dark:bg-[#3C3C3C] dark:hover:bg-[#454545] sm:w-full"
          >
            {formState.loading ? (
              <span className="animate-ping text-xl font-bold">Loading</span>
            ) : (
              <span className="text-xl font-bold">Subscribe</span>
            )}
          </button>
        </form>
        <div className="mt-5">
          {formState.state ? (
            formState?.success ? (
              <SuccessMessage>{formState?.message}</SuccessMessage>
            ) : (
              <ErrorMessage>{formState?.message}</ErrorMessage>
            )
          ) : null}
        </div>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}
