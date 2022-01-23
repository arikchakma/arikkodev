import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import cn from 'classnames';
import useSound from 'use-sound';
import toggle from '../public/static/audio/toggle.mp3';

export default function Switch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [play] = useSound(toggle);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        play();
      }}
      aria-label="Dark Mode Toggle"
      className="grid justify-center items-center"
    >
      <div className="relative inline-block w-[48px] h-[30px]">
        {mounted && (
          <span
            className={cn(
              theme === 'dark'
                ? 'before:translate-x-[18px] bg-gray-400 before:bg-gray-200'
                : 'bg-bgDark',
              " absolute cursor-pointer top-0 left-0 bottom-0 right-0 rounded-[30px] before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-[2px] before:bottom-[2px] switch-transition before:switch-transition before:bg-white before:rounded-full dark:before:translate-x-[18px] dark:bg-gray-400 dark:before:bg-gray-200"
            )}
          />
        )}
      </div>
    </button>
  );
}
export function SwitchV() {
  const [mounted, setMounted] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div
      aria-label="Dark Mode Toggle"
      className="grid justify-center items-center"
    >
      <label className="relative inline-block w-[48px] h-[30px]">
        <input
          type="checkbox"
          className="hidden w-0 h-0"
          checked={toggled}
          onChange={() => {
            setToggled(p => !p);
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        />
        {mounted && (
          <span
            className={cn(
              theme === 'dark'
                ? 'before:translate-x-[18px] bg-gray-400 before:bg-gray-200'
                : 'bg-bgDark',
              " absolute cursor-pointer top-0 left-0 bottom-0 right-0 rounded-[30px] before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-[2px] before:bottom-[2px] switch-transition before:switch-transition before:bg-white before:rounded-full dark:before:translate-x-[18px] dark:bg-gray-400 dark:before:bg-gray-200"
            )}
          />
        )}
      </label>
    </div>
  );
}
