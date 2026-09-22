import type { ScanFaq, ScanSection } from "@/content/scan/types";

export const SECTIONS: ScanSection[] = [
  {
    body: (
      <>
        <p>
          A search result is the site name and breadcrumb URL, the title in
          blue, and a snippet under it. Google builds the title from the{" "}
          <code>&lt;title&gt;</code> tag and the snippet from the meta
          description — not from <code>og:title</code> or{" "}
          <code>og:description</code>, which is why a page can share beautifully
          and still read badly in search.
        </p>
        <p>
          Both are trimmed to fit the result width, and the snippet is often
          replaced entirely with text lifted from the page when Google decides
          that answers the query better.
        </p>
      </>
    ),
    heading: "How Google builds a result",
  },
  {
    body: (
      <>
        <p>
          Front-load the distinguishing words. Everything after the cut is lost
          on desktop and lost earlier on mobile, so a title that opens with the
          brand name spends its visible space on the part every one of your
          results already repeats.
        </p>
        <p>
          The meta description is a suggestion rather than a contract. Write it
          as the one sentence you would want shown, then accept that Google will
          sometimes substitute its own.
        </p>
      </>
    ),
    heading: "Writing a title and description that survive",
  },
];

export const FAQS: ScanFaq[] = [
  {
    answer:
      "No. Google builds the result from the title tag and meta description. Open Graph tags drive social cards; keep both, because they are read by different consumers.",
    question: "Does Google use Open Graph tags for search results?",
  },
  {
    answer:
      "Google rewrites titles when it judges the tag a poor match for the query, or when it is boilerplate, keyword-stuffed, or duplicated across pages. A specific, unique title is the best defence.",
    question: "Why is Google showing a different title than mine?",
  },
  {
    answer:
      "There is no character count that guarantees a full display, because the result is measured in pixels. Put the meaningful words first and treat anything past roughly sixty characters as at risk.",
    question: "How long should a title tag be?",
  },
  {
    answer:
      "Often, yes. Google frequently replaces it with a passage from the page that matches the query. Writing one is still worth it: it is what gets shown for brand and navigational searches.",
    question: "Will Google ignore my meta description?",
  },
];
