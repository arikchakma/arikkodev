# Coding style

Follow it everywhere in this repo.

## Style

- Match the surrounding code. Consistency beats personal preference — a section that looks nothing like the rest of the file is the worst outcome.
- Be idiomatic. Say common things the same way everyone else does: `a < 0`, not `0 > a`; loop variables `i, j, k`, not `lv1, lv2`.
- When in doubt, look at what nearby code does and imitate it.

This is a TypeScript + React + Astro codebase. Its conventions (imitate them):

- 2-space indent, double quotes, semicolons, trailing commas.
- Tailwind for styling; `cn()` for conditional classes.
- Named exports.

Components always declare a props type and take a single `props` argument, destructured on the first line:

```tsx
type ComponentProps = {};

export function Component(props: ComponentProps) {
  const {} = props;
}
```

## Comments

- Readable code needs few comments. Rewrite confusing code instead of explaining it.
- A line or two above a function saying what it does is welcome.
- Comment the *why*, not the *what*. When you wonder why code is the way it is, leave a note — even `// BUG: explain this`.
- Comments go on their own lines, above the code they explain.
- A comment must justify itself. Delete ones that only restate the code.

## Efficiency

Do the simple thing. Don't optimize unless it's measurably slow — and then fix the data structures, not chase 5% tweaks.

## Commits

A brief summary of what changed, not an essay. If the code needs explaining, explain it in the source.

## Spacing

Separate logical groups inside a file with a blank line; keep tightly-related lines packed together. No section-divider comments.

## Titles

Post titles and section headings use Chicago Manual of Style title case, as produced by [title.sh](https://title.sh/). Capitalize the first and last word and all major words; lowercase articles, coordinating conjunctions, and prepositions. Keep headings short — 3–4 words max.

## Copywriting

These govern UI, product, marketing & docs copy. Blog posts keep their first-person editorial voice.

- Active voice. "Install the CLI," not "The CLI will be installed."
- Action-oriented. "Install the CLI," not "You will need the CLI."
- Title Case (Chicago) for headings & buttons; sentence case on marketing pages.
- Be clear & concise. Use as few words as possible.
- No em-dashes. Use commas, or split into separate sentences.
- Prefer `&` over "and."
- Write in second person. Avoid first person.
- Keep nouns consistent. Introduce as few unique terms as possible.
- Avoid ambiguity. Labels are specific: "Save API Key," not "Continue."
- Consistent placeholders. Strings: `YOUR_API_TOKEN_HERE`. Numbers: `0123456789`.
- Numerals for counts. "8 deployments," not "eight deployments."
- Currency: 0 or 2 decimal places in a given context, never mixed.
- Separate numbers & units with a non-breaking space: `10&nbsp;MB`, not `10MB`.
- Default to positive, problem-solving language. "Something went wrong—try again or contact support," not "Your deployment failed."
- Error messages guide the exit. Say how to fix it & give a clear action: "Your API key is incorrect or expired. Generate a new key in settings," not "Invalid API key."
