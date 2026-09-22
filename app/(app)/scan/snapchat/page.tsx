import type { Metadata } from "next";
import Link from "next/link";

import { OgTester } from "@/components/og-tester";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import { createPageMetadata } from "@/seo/metadata";

export const metaMetadata = createPageMetadata({
  description:
    "Paste a URL and see Snapchat's open graph card — image, title, and domain — plus anything worth fixing.",
  path: ROUTES.SCAN_SNAPCHAT,
  title: "Snapchat Open Graph Preview",
});

const ScanSnapchatPage = () => (
  <PageTransition>
    <section className="container-wrapper relative">
      <div className="container flex flex-col gap-4 py-16 md:py-20 lg:py-24">
        <PageHero
          description={
            <>
              Paste a URL and see the card the way Snapchat will display it
              — full-width image with title and domain in a rounded bubble.
              Every check is a real fetch made as Snapchat sees it.{" "}
              <Link href={ROUTES.SCAN} className="underline underline-offset-4">
                Back to all platforms
              </Link>
              .
            </>
          }
          title="Snapchat"
        />

        <div className="mt-4">
          <OgTester />
        </div>
      </div>
    </section>
  </PageTransition>
);

export default ScanSnapchatPage;