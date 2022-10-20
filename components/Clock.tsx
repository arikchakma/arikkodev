import { useState, useEffect, memo, useCallback } from 'react';

function Clock() {
  const [date, setDate] = useState(
    new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Dhaka',
      hourCycle: 'h24',
    })
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refreshClock = () =>
      setDate(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hourCycle: 'h24',
        })
      );

    const timerId = setInterval(refreshClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <span className="whitespace-nowrap text-xs [font-feature-settings:'tnum']">
      {mounted ? date : '00:00:00'}
    </span>
  );
}
export default memo(Clock);
