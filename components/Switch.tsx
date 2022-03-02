import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import useSound from 'use-sound';

export default function Switch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [play] = useSound('/static/audio/toggle.mp3');

  // Theme is available after mounted
  useEffect(() => setMounted(true), []);

  function onToggle() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    play();
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Dark Mode Toggle"
      className="grid items-center justify-center"
    >
      <div className="relative inline-block h-[30px] w-[48px]">
        {mounted && (
          <span className="switch-transition before:switch-transition absolute top-0 left-0 bottom-0 right-0 cursor-pointer rounded-[30px] bg-bgDark before:absolute before:left-[2px] before:bottom-[2px] before:h-[26px] before:w-[26px] before:rounded-full before:bg-white before:content-[''] dark:bg-gray-400 dark:before:translate-x-[18px] dark:before:bg-gray-200" />
        )}
      </div>
    </button>
  );
}
