import { useState, useRef, useCallback, CSSProperties } from 'react';
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
  const [email, setEmail] = useState('');
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
    <div className={cn(blog ? 'mb-0' : '', 'mt-16')}>
      <div className="relative w-full rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
        {/* Heading */}
        <div className="border-b border-gray-300 px-7 py-4 dark:border-gray-700">
          <h2 className="text-base font-semibold">Newsletter</h2>
        </div>
        <div className="px-7">
          <div className="py-4">
            <p className="max-w-xl text-base font-normal text-gray-500 dark:text-gray-400">
              Subscribe to get exclusive updates and tech recipes inspiration in
              your inbox from the chef. I also publish semi-regular newsletters
              containing links to interesting articles about design, technology,
              and startups.
            </p>
          </div>

          {/* Form of email */}
          <form className="grid grid-cols-3 gap-3" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="hello@apple.com"
              autoComplete="email"
              required
              className="col-span-2 rounded border border-gray-300 bg-gray-100 px-6 py-3 text-xl font-semibold outline-0 placeholder:text-gray-400 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:focus:outline-gray-500 sm:col-span-3"
              ref={inputEl}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="shadow-inside rounded bg-blue-500 py-3 text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-3"
              disabled={
                (email?.length > 0 ? false : true) || formState?.loading
              }
            >
              {formState.loading ? (
                <span className="animate-ping text-xl font-bold">Loading</span>
              ) : (
                <span className="text-xl font-bold">Subscribe</span>
              )}
            </button>
          </form>
          <div className="my-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <p>
              Unsubscribe at any time. Powered by{' '}
              <a
                href="https://www.getrevue.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200"
              >
                Revue
              </a>
              .
            </p>
          </div>

          {/* Success or Error message */}
          {formState.state && (
            <div
              className={cn(
                'my-4 p-3',
                formState?.success ? 'bg-green-200/5' : 'bg-red-200/5'
              )}
            >
              {formState?.success ? (
                <SuccessMessage>{formState?.message}</SuccessMessage>
              ) : (
                <ErrorMessage>{formState?.message}</ErrorMessage>
              )}
            </div>
          )}
        </div>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}
