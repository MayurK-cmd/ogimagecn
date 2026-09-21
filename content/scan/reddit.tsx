import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          A Reddit link post is mostly the thumbnail and the domain. The
          headline above the tile is whatever the person submitting typed, not
          your <code>og:title</code>, so the one piece of the card you control
          on the feed is the image pulled from <code>og:image</code>.
        </p>
        <p>
          That makes Reddit the platform where the image has to carry the
          message on its own. In the feed it is shown small and cropped, so fine
          print in a corner disappears; on the post page it opens wider and the
          full frame is visible.
        </p>
      </>
    ),
    heading: "How Reddit renders a link",
  },
  {
    body: (
      <>
        <p>
          When a post shows the grey placeholder tile instead of your image, the
          fetch failed rather than the tag being absent. Reddit&apos;s crawler
          needs to reach the image without a login, without a redirect chain,
          and without being served a different response by user agent. The scan
          above requests the page the same way, so a check that passes here is a
          fetch that works there.
        </p>
        <p>
          Some subreddits also strip thumbnails or disallow link posts
          altogether, and a link crossposted from an old submission keeps the
          thumbnail captured at the time it was first submitted.
        </p>
      </>
    ),
    heading: "When a thumbnail does not appear",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Reddit uses the title the submitter types. Your og:title is not shown on the feed, which is why the image has to carry the meaning of the link.",
    question: "Why does Reddit ignore my og:title?",
  },
  {
    answer:
      "Reddit reads og:image. If it is missing, behind a login, redirected, or too large to fetch quickly, the post falls back to a plain placeholder tile with just the domain.",
    question: "Why is my Reddit thumbnail blank?",
  },
  {
    answer:
      "1200×630 is the safe choice. Reddit crops it to a small square-ish tile in the feed, so keep the subject centred and avoid text near the edges.",
    question: "What image size works best for Reddit?",
  },
  {
    answer:
      "Reddit captures the thumbnail when the link is first submitted and keeps it on that post. Fix the tags, then submit the URL again to get a post with the new image.",
    question: "How do I update the thumbnail on a post that is already live?",
  },
];
