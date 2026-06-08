import type { ShikiTransformer } from "@shikijs/core";

/**
 * Reads a `title="..."` from a fenced code block's meta and exposes it as a
 * `data-title` attribute on the `<pre>`, for CodeBlock.astro to render.
 */
export function transformerCodeTitle(): ShikiTransformer {
  return {
    name: "code-title",
    pre(node) {
      const raw = this.options.meta?.__raw ?? "";
      const title = raw.match(/title="([^"]+)"/)?.[1];
      if (title) {
        node.properties["data-title"] = title;
      }
    },
  };
}
