import type { Metadata } from "next";
import Link from "next/link";

import { OgTester } from "@/components/og-tester";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { createPageMetadata } from "@/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  description:
    "Paste a URL and see how it unfurls in Instagram DMs — image, title, description, and domain — plus anything worth fixing.",
  path: ROUTES.SCAN_INSTAGRAM,
  title: "Instagram Open Graph Preview",
});

const ScanInstagramPage = () => (
  <PageTransition>
    <section className="container-wrapper relative">
      <div className="container flex flex-col gap-4 py-16 md:py-20 lg:py-24">
        <PageHero
          description={
            <>
              Paste a URL and see the bubble the way Instagram will show it in
              DMs, plus anything worth fixing. Every check is a real fetch made
              as that crawler.{" "}
              <Link href={ROUTES.SCAN} className="underline underline-offset-4">
                Back to all platforms
              </Link>
              .
            </>
          }
          title="Instagram"
        />

        <div className="mt-4">
          <OgTester />
        </div>
      </div>
    </section>
  </PageTransition>
);

export default ScanInstagramPage;
