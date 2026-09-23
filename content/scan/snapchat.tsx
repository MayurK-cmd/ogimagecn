import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Snapchat draws a link as a compact chat card: the Open Graph image
          full-width on top, with the title and the domain underneath in a
          rounded bubble. The description is dropped, so a card whose meaning
          lives in <code>og:description</code> reads as a picture plus a
          headline here.
        </p>
        <p>
          The tags it reads are the ordinary ones — <code>og:image</code>,{" "}
          <code>og:title</code> and <code>og:url</code>. There is no
          Snapchat-specific namespace to set.
        </p>
      </>
    ),
    heading: "How Snapchat renders a link",
  },
  {
    body: (
      <>
        <p>
          When chat shows a bare URL instead of a card, the fetch failed rather
          than the tag being absent. Snapchat&apos;s crawler needs to reach the
          page and the image without a login, without a long redirect chain, and
          without being served a different response by user agent. The scan
          above requests the page the same way, so a check that passes here is a
          fetch that works there.
        </p>
        <p>
          An image that is missing, slow, or much larger than 1200×630 is the
          usual cause: the bubble has nothing to show, so only the link text
          remains.
        </p>
      </>
    ),
    heading: "When a card does not appear",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Snapchat uses the standard Open Graph tags — og:image, og:title and og:url. There is no Snapchat-specific meta tag, so a card that works elsewhere works here.",
    question: "Which meta tags does Snapchat read?",
  },
  {
    answer:
      "Snapchat's chat card shows the image, the title, and the domain. The description is not rendered, which is why the title has to make sense on its own.",
    question: "Why is my og:description not shown on Snapchat?",
  },
  {
    answer:
      "1200×630 is the safe choice. Snapchat shows the image full-width in the bubble, so a square or portrait image gets cropped at the top and bottom, often through the text you wanted read.",
    question: "What image size should I use for Snapchat previews?",
  },
  {
    answer:
      "Snapchat caches a card once it has been unfurled. Fix the tags, then share the URL with a query string to get a fresh fetch — the cached version keeps showing until it expires.",
    question: "How do I refresh a cached Snapchat preview?",
  },
];
