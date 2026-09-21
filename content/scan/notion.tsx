import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          A Notion bookmark is text first: the title on one line, a clipped
          description under it, the favicon and domain at the bottom, and the{" "}
          <code>og:image</code> as a small thumbnail on the right. The image is
          the least prominent part of the card, the opposite of how every social
          platform frames the same link.
        </p>
        <p>
          Because the thumbnail is narrow and cropped, a card built around a
          wide wordmark reads as a sliver here. The title and the first line of
          the description are what people scan in a document.
        </p>
      </>
    ),
    heading: "How Notion renders a bookmark",
  },
  {
    body: (
      <>
        <p>
          Notion fetches the page from its own servers when the bookmark is
          created. A link that needs a login, sits on an internal host, or
          blocks unknown crawlers collapses to a plain link with the URL as its
          title. The scan above performs the same kind of request, so a clean
          result means the metadata is reachable.
        </p>
        <p>
          The bookmark is also a snapshot. Editing the page&apos;s tags later
          does not update a bookmark already in a document — delete it and paste
          the URL again.
        </p>
      </>
    ),
    heading: "When a bookmark stays bare",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Notion reads og:title, og:description and og:image, plus the favicon. The image is shown as a small thumbnail on the right rather than as a banner.",
    question: "Which meta tags does a Notion bookmark use?",
  },
  {
    answer:
      "Paste the URL and choose Create bookmark instead of Dismiss. If the bookmark still shows only the URL, Notion could not fetch the page — usually a login wall, an internal host, or a blocked crawler.",
    question: "Why does my Notion bookmark show no title or image?",
  },
  {
    answer:
      "Keep it 1200×630 for consistency with other platforms. Notion crops it into a small thumbnail, so anything that depends on readable text in the image will not survive.",
    question: "What image size should I use for Notion?",
  },
  {
    answer:
      "Notion captures the preview once. Delete the bookmark block and paste the link again after fixing the tags to get the updated title, description and thumbnail.",
    question: "How do I refresh an existing Notion bookmark?",
  },
];
