import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          WeChat draws a shared link as a chat-bubble card: a bold{" "}
          <code>og:title</code> truncated to one line, a muted{" "}
          <code>og:description</code> of one or two lines, and a small square
          thumbnail cropped from <code>og:image</code> on the right. Moments
          uses a similar row with the thumbnail right-aligned, so the same tags
          cover both surfaces.
        </p>
        <p>
          The card is compact and text-led. Because the title gets a single line
          and the description at most two, front-load the distinguishing words —
          everything after the cut is lost in the chat list.
        </p>
      </>
    ),
    heading: "How WeChat renders a link",
  },
  {
    body: (
      <>
        <p>
          When a chat shows a bare URL instead of a card, the fetch failed
          rather than a tag being absent. WeChat&apos;s crawler reads only the
          initial HTML without executing JavaScript, so client-rendered tags are
          invisible to it. A login wall, an internal host, or an{" "}
          <code>og:image</code> it cannot reach also leaves just the link text —
          without an accessible image there is no thumbnail to show.
        </p>
        <p>
          The scan above requests the page the way WeChat&apos;s in-app browser
          does, so a check that passes here is a fetch that works in a WeChat
          chat.
        </p>
      </>
    ),
    heading: "Why WeChat sometimes shows no preview",
  },
  {
    body: (
      <>
        <p>
          Set <code>og:title</code>, <code>og:description</code>, and{" "}
          <code>og:image</code> in the page head, server-rendered. Use an HTTPS
          image at <code>1200×630</code> when possible, keep it under 5 MB, and
          serve it without an avoidable redirect. Keep the title to one line and
          the description to a sentence — that is all the bubble shows.
        </p>
        <p>
          The scanner fetches both the page and its image with WeChat&apos;s
          user agent, so it can show whether the tags are reachable before you
          share the link.
        </p>
      </>
    ),
    heading: "What to set for a WeChat preview",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "WeChat reads the standard Open Graph tags — og:title, og:description, and og:image — from the initial HTML response. The page and image must be reachable over HTTPS without a login.",
    question: "Which meta tags does a WeChat preview use?",
  },
  {
    answer:
      "WeChat's crawler does not execute JavaScript, so tags rendered on the client are invisible to it. Make sure the Open Graph tags are present in the server-rendered HTML, and confirm the page returns 200 OK without auth.",
    question: "Why does WeChat show only the URL?",
  },
  {
    answer:
      "Use a 1200×630 image when possible and keep it under 5 MB. Serve it from an HTTPS URL with an image content type and no avoidable redirect — WeChat crops it into a small square thumbnail, and without an accessible image there is no card.",
    question: "What image size works best for WeChat?",
  },
  {
    answer:
      "WeChat caches the card once it has been unfurled. Fix the tags, then share the URL with a fresh query string to trigger a new fetch — the cached bubble keeps showing until it expires.",
    question: "How do I refresh a cached WeChat preview?",
  },
];
