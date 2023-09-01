import type { MarkdownHeading } from 'astro';

type HeadingType = {
  heading: number;
  text: string;
  slug: string;
};

type HeadingGroupType = HeadingType & {
  child: HeadingType[];
};

export function getTableOfContents(headings: MarkdownHeading[]) {
  const enrichedHeadings: HeadingGroupType[] = [];
  let parentHeading: HeadingGroupType | null = null;

  headings.forEach((heading, counter) => {
    if (counter === 0) return;
    const { depth, slug, text } = heading;
    if (depth === 2) {
      parentHeading = {
        heading: depth,
        text,
        slug,
        child: [],
      };
      enrichedHeadings.push(parentHeading);
    } else if (parentHeading) {
      parentHeading.child.push({
        heading: depth,
        text,
        slug,
      });
    }
  });

  return enrichedHeadings;
}
