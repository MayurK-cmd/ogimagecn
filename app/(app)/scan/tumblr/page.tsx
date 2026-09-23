import type { Metadata } from "next";
import Link from "next/link";

import { OgTester } from "@/components/og-tester";
import { PageHero } from "@/components/page-hero";
import { PageTransition } from "@/components/page-transition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { FAQS, SECTIONS } from "@/content/scan/tumblr";
import { otherScanPages, scanBreadcrumbs } from "@/lib/scan";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/seo/json-ld";
import { createPageMetadata } from "@/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  description:
    "Preview how your Open Graph image, title, and description appear in a Tumblr link post. Scan a URL and check its metadata before you publish it.",
  path: ROUTES.SCAN_TUMBLR,
  title: "Tumblr Open Graph Preview",
});

const TumblrScanPage = () => (
  <PageTransition>
    <section className="container-wrapper relative">
      <div className="container flex flex-col gap-12 py-16 md:py-20 lg:py-24">
        <PageHero
          description="Paste a URL and see the link preview Tumblr will build from it."
          title="Tumblr Open Graph Preview"
        />

        <OgTester platform="tumblr" />

        <section className="mx-auto flex w-full max-w-2xl flex-col gap-10">
          {SECTIONS.map((section) => (
            <article className="flex flex-col gap-3" key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
                {section.body}
              </div>
            </article>
          ))}

          <article className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <Accordion collapsible type="single">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger sound="click">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </article>

          <nav className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Check another platform
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherScanPages("tumblr").map((page) => (
                <Link
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                  href={page.href}
                  key={page.href}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </nav>

          <FaqJsonLd items={FAQS} />
          <BreadcrumbJsonLd items={scanBreadcrumbs("tumblr")} />
        </section>
      </div>
    </section>
  </PageTransition>
);

export default TumblrScanPage;
