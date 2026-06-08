import type { Options as AutolinkOptions } from "rehype-autolink-headings";
import type { Options as ExternalLinksOptions } from "rehype-external-links";

export const autolinkOptions: AutolinkOptions = {
  behavior: "wrap",
  properties: {
    className: ["anchor"],
  },
};

const internalLinkStarts = ["/", "#", "mailto:", "https://arikko.dev"];

export const externalLinksOptions: ExternalLinksOptions = {
  target: "_blank",
  rel(element) {
    const href = element.properties.href;

    if (typeof href !== "string") {
      return [];
    }

    if (internalLinkStarts.some((start) => href.startsWith(start))) {
      return [];
    }

    return ["noopener", "noreferrer", "nofollow"];
  },
};
