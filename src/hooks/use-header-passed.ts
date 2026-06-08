import { useEffect, useState } from "react";

export function useHeaderPassed(targetId: string) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return passed;
}
