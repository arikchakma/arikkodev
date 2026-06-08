import { motion } from "motion/react";
import { BackButton } from "./BackButton";
import { useActiveHeading } from "../hooks/use-active-heading";
import { useHeaderPassed } from "../hooks/use-header-passed";
import { cn } from "../lib/classname";
import { sound } from "../lib/sound";

type Heading = {
  slug: string;
  text: string;
};

type TableOfContentsProps = {
  headings: Heading[];
  title: string;
};

export function TableOfContents(props: TableOfContentsProps) {
  const { headings, title } = props;

  const [activeId, setActiveId] = useActiveHeading(headings);
  const headerPassed = useHeaderPassed("article-title");

  const handleClick = (event: React.MouseEvent, slug: string) => {
    event.preventDefault();
    const target = document.getElementById(slug);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
    setActiveId(slug);
    sound.nav();
  };

  const showTableOfContents = headings.length >= 2;

  return (
    <motion.aside className="lg:fixed z-99 lg:top-16 lg:left-8 lg:max-h-[calc(100vh-5rem)] lg:w-48 overflow-y-auto text-sm">
      <BackButton href="/writings" label="Writings" />

      {showTableOfContents && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="mt-6 hidden lg:block"
        >
          <motion.p
            initial={false}
            animate={{ opacity: headerPassed ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-black text-balance"
          >
            {title}
          </motion.p>

          <ul className="flex flex-col gap-1.5 mt-2.5">
            {headings.map((heading) => {
              const isActive = activeId === heading.slug;
              return (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    onClick={(event) => handleClick(event, heading.slug)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "block leading-snug transition-colors hover:text-black",
                      isActive ? "text-black" : "text-zinc-400",
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </motion.aside>
  );
}
