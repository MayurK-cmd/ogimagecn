import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Threads renders the og:image as a large banner at the top of the card,
          followed by the title and the domain in an overlaid strip. The banner
          is the most prominent part of the card, framing the visual hook that
          draws attention in the feed.
        </p>
        <p>
          Because the title and domain sit above the image rather than below,
          the card reads horizontally. A wide animated or multi-image logo can
          come across as awkward here — the banner is the height constraint,
          not the width.
        </p>
      </>
    ),
    heading: "How Threads renders a bookmark",
  },
  {
    body: (
      <>
        <p>
          Threads fetches the page from its own servers when a bookmark is
          created. A link that needs a login, sits on an internal host, or
          blocks unknown crawlers collapses to a plain link with the URL as its
          title. The scan above performs the same kind of request, so a clean
          result means the metadata is reachable.
        </p>
        <p>
          The bookmark is also a snapshot. Editing the page&apos;s tags later
          does not update a bookmark already posted — on Threads, the only way
          to update it is 📋 copying the link and reposting.
        </p>
      </>
    ),
    heading: "When a bookmark stays bare",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Threads reads og:title, og:description and og:image. The image is shown as a large banner at the top, followed by the title and domain at the bottom.",
    question: "Which meta tags does a Threads bookmark use?",
  },
  {
    answer:
      "Paste the URL and choose Quote instead of Dismiss. Wait a moment for Threads to unfurl the post, then tap the 📋 copy button. Share the copied link from another app to republish it.",
    question: "Why does my Threads bookmark show no title or image?",
  },
  {
    answer:
      "Keep it 1200×630 for consistency with other platforms. Threads occupies the full height of the banner, so text-only logos or small icons are lost at that scale.",
    question: "What image size should I use for Threads?",
  },
  {
    answer:
      "Refreshing a bookmark on Threads works by copying the link and republishing it. The original bookmark block in your original post will not update — there’s no way to edit the metadata there.",
    question: "How do I refresh an existing Threads bookmark?",
  },
];