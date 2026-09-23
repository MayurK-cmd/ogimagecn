import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Tumblr turns a link post into a dashboard card about 540px wide: the{" "}
          <code>og:image</code> full-width on top, a bold <code>og:title</code>{" "}
          below it, a short <code>og:description</code>, and the bare domain as
          a muted label. The image carries the card in the feed, so a picture
          that reads at dashboard width matters more than fine detail.
        </p>
        <p>
          The crawler reads the standard Open Graph tags and does not execute
          JavaScript, so the tags must be present in the initial HTML response.
        </p>
      </>
    ),
    heading: "How Tumblr renders a link",
  },
  {
    body: (
      <>
        <p>
          When a link post shows a bare URL instead of a card, the fetch failed
          rather than a tag being absent. Tumblr&apos;s crawler has been
          historically inconsistent with its user agent string, which has caused
          issues with prerender services and user-agent-based routing that serve
          it a different response. A login wall or an <code>og:image</code> it
          cannot reach has the same visible result.
        </p>
        <p>
          The scan above requests the page the way Tumblr&apos;s crawler does,
          so a check that passes here is a fetch that works in a link post.
        </p>
      </>
    ),
    heading: "Why Tumblr sometimes shows no preview",
  },
  {
    body: (
      <>
        <p>
          Set <code>og:title</code>, <code>og:description</code>, and{" "}
          <code>og:image</code> in the page head, server-rendered. Use an HTTPS
          image at <code>1200×630</code> when possible, keep it under 5 MB, and
          serve it without an avoidable redirect. Keep the title and the first
          line of the description self-contained — that is what people scan in
          the dashboard.
        </p>
        <p>
          The scanner fetches both the page and its image with Tumblr&apos;s
          user agent, so it can show whether the tags are reachable before you
          publish the post.
        </p>
      </>
    ),
    heading: "What to set for a Tumblr preview",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Tumblr reads the standard Open Graph tags — og:title, og:description, and og:image — with no Tumblr-specific namespace. A card that works elsewhere works here.",
    question: "Which meta tags does a Tumblr preview use?",
  },
  {
    answer:
      "Tumblr's crawler has been historically inconsistent with its user agent string, so prerender services or user-agent rules may serve it a different response. Check that every variant of the crawler gets the same tags in the initial HTML.",
    question: "Why does Tumblr show only the URL?",
  },
  {
    answer:
      "Use a 1200×630 image when possible and keep it under 5 MB. Serve it from an HTTPS URL with an image content type and no avoidable redirect — Tumblr shows it full-width in the roughly 540px dashboard card.",
    question: "What image size works best for Tumblr?",
  },
  {
    answer:
      "Tumblr caches the card once the link post has been created. Fix the tags, then create the post with a fresh query string on the URL to trigger a new fetch — the cached card keeps showing until it expires.",
    question: "How do I refresh a cached Tumblr preview?",
  },
];
