import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Instagram draws a link as a bubble inside the conversation: the Open
          Graph image on top, then the title, then the domain, with the
          description kept short or dropped entirely on narrow screens. The
          image is the part people react to, so a card whose meaning lives in
          the description reads as a bare picture here.
        </p>
        <p>
          The tags it reads are the ordinary ones — <code>og:image</code>,{" "}
          <code>og:title</code>, <code>og:description</code> and{" "}
          <code>og:url</code>. There is no Instagram-specific namespace to set.
        </p>
      </>
    ),
    heading: "How Instagram renders a link",
  },
  {
    body: (
      <>
        <p>
          Links are only clickable in a few places: direct messages, story
          stickers, and the link in a profile. Captions and comments render URLs
          as plain text, so a link pasted into a caption never unfurls no matter
          how complete the tags are. That is the single most common reason a
          preview seems missing.
        </p>
        <p>
          When a DM does show a bare link, the usual causes are a page that
          blocks the crawler, an <code>og:image</code> behind authentication or
          a redirect, or a file large enough that fetching it times out. The
          scan above makes the request as the crawler does, so if the image
          resolves here it will resolve there.
        </p>
      </>
    ),
    heading: "When a link does not unfurl",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Instagram only unfurls links where links are clickable: DMs, story link stickers, and the profile link. In a caption the URL is plain text, so there is nothing to preview.",
    question: "Why does my link not show a preview in an Instagram caption?",
  },
  {
    answer:
      "Instagram uses the standard Open Graph tags — og:image, og:title, og:description and og:url. There is no Instagram-specific meta tag, so a card that works elsewhere works here.",
    question: "Which meta tags does Instagram read?",
  },
  {
    answer:
      "Use a 1200×630 image. Instagram crops the bubble to a wide ratio, so a square or portrait image gets trimmed at the top and bottom, often through the text you wanted read.",
    question: "What image size should I use for Instagram DM previews?",
  },
  {
    answer:
      "Instagram caches an unfurl for a while and there is no public debugger to force a refresh. Add a query string to the URL to get a fresh fetch, or wait out the cache once the tags are correct.",
    question: "How do I refresh a cached Instagram preview?",
  },
];
