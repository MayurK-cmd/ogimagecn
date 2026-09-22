import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          Bluesky builds a card from the ordinary Open Graph tags: the image
          from <code>og:image</code> across the top, then the title, a clipped
          line or two of <code>og:description</code>, and the domain at the
          bottom. There is no large-versus-small card switch to set, so the same
          tags that work on Facebook work here.
        </p>
        <p>
          The card is attached to the post when it is composed, not resolved by
          every reader, which is why one person can see a rich card for a link
          and another sees a bare URL in an older post.
        </p>
      </>
    ),
    heading: "How Bluesky renders a link",
  },
  {
    body: (
      <>
        <p>
          A missing card almost always means the fetch failed at compose time:
          the page blocked the request, the <code>og:image</code> redirected or
          needed a login, or the response was slow enough to give up on. Run the
          URL above and look at the checks — they are real requests, so a clean
          result means the tags are reachable.
        </p>
        <p>
          Cards are also embedded per post. Fixing the tags does not rewrite a
          post that is already up; delete and repost, or post the link again, to
          get the corrected card.
        </p>
      </>
    ),
    heading: "When a card does not appear",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "Bluesky reads standard Open Graph tags: og:title, og:description, og:image and og:url. There is no Bluesky-specific namespace and no card-type tag to set.",
    question: "Which meta tags does Bluesky use?",
  },
  {
    answer:
      "The card is captured when the post is composed. If the crawler could not reach the page or the image at that moment, the post keeps a bare link forever, even after you fix the tags.",
    question: "Why does my Bluesky post show a bare link?",
  },
  {
    answer:
      "Use 1200×630. Bluesky shows a wide image above the title, so a square image is cropped top and bottom and a tall one loses most of its content.",
    question: "What image size should I use for Bluesky?",
  },
  {
    answer:
      "There is no debugger to purge a cached card. Post the link again once the tags are correct, which triggers a fresh fetch, and delete the old post if the wrong card matters.",
    question: "How do I refresh a Bluesky link card?",
  },
];
