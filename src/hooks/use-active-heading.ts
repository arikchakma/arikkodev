import { useEffect, useState } from "react";

type Heading = { slug: string };

export function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.slug ?? null,
  );

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const current = headings.find((h) => visible.has(h.slug));
        if (current) setActiveId(current.slug);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return [activeId, setActiveId] as const;
}
