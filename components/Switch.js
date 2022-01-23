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
      className="grid justify-center items-center"
    >
      <div className="relative inline-block w-[48px] h-[30px]">
        {mounted && (
          <span className="bg-bgDark absolute cursor-pointer top-0 left-0 bottom-0 right-0 rounded-[30px] before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-[2px] before:bottom-[2px] switch-transition before:switch-transition before:bg-white before:rounded-full dark:before:translate-x-[18px] dark:bg-gray-400 dark:before:bg-gray-200" />
        )}
      </div>
    </button>
  );
}
