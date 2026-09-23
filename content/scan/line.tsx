import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          LINE draws a shared link as a chat-bubble card: the{" "}
          <code>og:image</code> full-width on top, a bold <code>og:title</code>{" "}
          underneath, one line of muted <code>og:description</code>, and the
          bare domain as a footer. The bubble is rounded with a subtle border,
          so it reads as part of the conversation rather than as an embedded
          post.
        </p>
        <p>
          Linespider reads only <code>og:title</code>,{" "}
          <code>og:description</code>, and <code>og:image</code> — every other
          Open Graph property is ignored. A card whose meaning lives in another
          tag renders here as a picture plus a headline.
        </p>
      </>
    ),
    heading: "How LINE renders a link",
  },
  {
    body: (
      <>
        <p>
          When a chat shows a bare URL instead of a card, the fetch failed
          rather than a tag being absent. Linespider fetches the page
          server-side without executing JavaScript, respects{" "}
          <code>robots.txt</code>, and needs a <code>200 OK</code> HTML response
          with the tags in the initial markup. A login wall, an internal host,
          or client-rendered tags leave only the link text.
        </p>
        <p>
          The scan above requests the page the same way Linespider does, so a
          check that passes here is a fetch that works in a LINE chat.
        </p>
      </>
    ),
    heading: "Why LINE sometimes shows no preview",
  },
  {
    body: (
      <>
        <p>
          Set <code>og:title</code>, <code>og:description</code>, and{" "}
          <code>og:image</code> in the page head. Use an HTTPS image at{" "}
          <code>1200×630</code> when possible, keep it under 5 MB, and serve it
          without an avoidable redirect.
        </p>
        <p>
          Keep the title short and the description to a single line — that is
          all the bubble shows before it truncates. The scanner fetches both the
          page and its image with Linespider&apos;s user agent, so it can show
          whether the tags are reachable before you share the link.
        </p>
      </>
    ),
    heading: "What to set for a LINE preview",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "LINE reads only og:title, og:description, and og:image. Every other Open Graph property is ignored, so those three tags are the whole card.",
    question: "Which meta tags does a LINE preview use?",
  },
  {
    answer:
      "Linespider must reach the page server-side without JavaScript and without a login. Check robots.txt for a Linespider block, make sure the tags are in the initial HTML, and confirm the image URL is HTTPS and publicly reachable.",
    question: "Why does LINE show only the URL?",
  },
  {
    answer:
      "Use a 1200×630 image when possible and keep it under 5 MB. Serve it from an HTTPS URL with an image content type and no avoidable redirect — LINE shows it full-width at the top of the bubble.",
    question: "What image size works best for LINE?",
  },
  {
    answer:
      "LINE caches the card once it has been unfurled. Fix the tags, then use LINE's cache-clearing flow or share the URL with a fresh query string to trigger a new fetch — the cached bubble keeps showing until it expires.",
    question: "How do I refresh a cached LINE preview?",
  },
];
