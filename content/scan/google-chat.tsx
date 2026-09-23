import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Google Chat unfurls a shared link into a small card under the message:
          a bold <code>og:title</code>, one line of muted{" "}
          <code>og:description</code> with the bare domain, and a thumbnail
          cropped from <code>og:image</code> on the right. The card sits on a
          light surface with a subtle border and rounded corners, so it reads as
          an attachment to the message rather than a post of its own.
        </p>
        <p>
          The fetcher reads the standard Open Graph tags from the initial HTML
          response. Because the thumbnail is small and the description is a
          single line, a clear title and an image that still reads when cropped
          do the most work.
        </p>
      </>
    ),
    heading: "How Google Chat renders a link",
  },
  {
    body: (
      <>
        <p>
          When a message shows a bare URL instead of a card, the fetch failed
          rather than a tag being absent. Google Chat&apos;s user-triggered
          fetcher needs a <code>200 OK</code> HTML response over{" "}
          <code>https</code>, without a login, and without JavaScript-rendered
          tags — it does not execute JavaScript, so client-rendered metadata is
          invisible to it.
        </p>
        <p>
          Note that this fetcher ignores <code>robots.txt</code> because it acts
          on behalf of the user who shared the link, and blocking Googlebot has
          no effect on it either. An enterprise admin can also disable previews
          for a workspace entirely — if the tags check out here but no card
          appears, that setting is worth asking about.
        </p>
      </>
    ),
    heading: "Why Google Chat sometimes shows no preview",
  },
  {
    body: (
      <>
        <p>
          Set <code>og:title</code>, <code>og:description</code>, and{" "}
          <code>og:image</code> in the page head, server-rendered. Use an HTTPS
          image at <code>1200×630</code> when possible, keep it under 5 MB, and
          serve it without an avoidable redirect.
        </p>
        <p>
          The scanner requests both the page and its image the way Google
          Chat&apos;s fetcher does, so it can show whether the tags are
          reachable before you share the link.
        </p>
      </>
    ),
    heading: "What to set for a Google Chat preview",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Google Chat reads the standard Open Graph tags — og:title, og:description, and og:image — from the initial HTML response. The page must be reachable over HTTPS without a login.",
    question: "Which meta tags does a Google Chat preview use?",
  },
  {
    answer:
      "The fetcher does not execute JavaScript, so tags rendered on the client are invisible to it. Make sure the Open Graph tags are present in the server-rendered HTML, and confirm the page returns 200 OK without auth.",
    question: "Why does Google Chat show only the URL?",
  },
  {
    answer:
      "Use a 1200×630 image when possible and keep it under 5 MB. Serve it from an HTTPS URL with an image content type and no avoidable redirect — Google Chat crops it into a small thumbnail beside the text.",
    question: "What image size works best for Google Chat?",
  },
  {
    answer:
      "Google Chat caches the unfurl once it has been generated. Fix the tags, then share the URL with a fresh query string to trigger a new fetch — the cached card keeps showing until it expires.",
    question: "How do I refresh a cached Google Chat preview?",
  },
];
