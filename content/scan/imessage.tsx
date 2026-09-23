import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          iMessage draws a shared link as a rich bubble: the{" "}
          <code>og:image</code> filling the top, with a footer bar carrying a
          bold <code>og:title</code> over the bare domain. The bubble is heavily
          rounded with no visible border, so it reads as a message attachment
          rather than an embedded post.
        </p>
        <p>
          iMessage ignores <code>og:description</code> entirely — the card shows
          the image, the title, and the domain only. A card whose meaning lives
          in the description renders here as a picture plus a headline, so the
          title has to make sense on its own.
        </p>
      </>
    ),
    heading: "How iMessage renders a link",
  },
  {
    body: (
      <>
        <p>
          When a message shows a bare URL instead of a bubble, the fetch failed
          rather than a tag being absent. iMessage generates the preview on the
          sender&apos;s device without executing JavaScript, so client-rendered
          tags are invisible to it. A login wall, an internal host, or an{" "}
          <code>og:image</code> it cannot reach leaves only the link text.
        </p>
        <p>
          The fetch comes from the sender&apos;s own IP with a spoofed user
          agent that impersonates Facebook&apos;s and X&apos;s crawlers — so
          user-agent allow-lists aimed at those bots affect iMessage too, while{" "}
          <code>robots.txt</code> rules targeting Applebot have no effect on
          previews at all.
        </p>
      </>
    ),
    heading: "Why iMessage sometimes shows no preview",
  },
  {
    body: (
      <>
        <p>
          Set <code>og:title</code> and <code>og:image</code> in the page head,
          server-rendered — <code>og:description</code> is still worth setting
          for other platforms, but iMessage will not show it. Use an HTTPS image
          at <code>1200×630</code> when possible, keep it under 5 MB, and serve
          it without an avoidable redirect.
        </p>
        <p>
          The scanner requests both the page and its image the way
          iMessage&apos;s fetcher does, so it can show whether the tags are
          reachable before you share the link.
        </p>
      </>
    ),
    heading: "What to set for an iMessage preview",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "iMessage reads og:title and og:image for the bubble, plus the domain for the footer bar. It ignores og:description entirely — keep the tag for other platforms, but the iMessage card will never show it.",
    question: "Which meta tags does an iMessage preview use?",
  },
  {
    answer:
      "iMessage builds the preview on the sender's device without executing JavaScript, so tags rendered on the client are invisible to it. Make sure og:title and og:image are present in the server-rendered HTML, and confirm the page returns 200 OK without auth.",
    question: "Why does iMessage show only the URL?",
  },
  {
    answer:
      "Use a 1200×630 image when possible and keep it under 5 MB. Serve it from an HTTPS URL with an image content type and no avoidable redirect — iMessage fills the top of the bubble with it.",
    question: "What image size works best for iMessage?",
  },
  {
    answer:
      "The preview is baked into the outgoing message on the sender's device, so an already-sent message never updates. Fix the tags and send the link again in a new message to get a fresh bubble.",
    question: "How do I refresh a cached iMessage preview?",
  },
];
