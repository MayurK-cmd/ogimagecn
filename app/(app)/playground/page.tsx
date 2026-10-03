import { OgPlayground } from "@/components/og-playground";
import { PageTransition } from "@/components/page-transition";
import { ROUTES } from "@/constants/routes";
import registryJson from "@/registry.json";
import registry from "@/registry/__index__";
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  description:
    "Customize any Open Graph image template with live preview, then export as JSX, PNG, or an install command.",
  path: ROUTES.PLAYGROUND,
  title: "Playground",
});

interface PlaygroundPageProps {
  searchParams: Promise<{ template?: string }>;
}

export default async function PlaygroundPage({
  searchParams,
}: PlaygroundPageProps) {
  const { template } = await searchParams;
  const templateKeys = registryJson.items
    .filter((item) => item.type === "registry:block" && item.name in registry)
    .map((item) => item.name);
  const initialTemplate =
    templateKeys.find((key) => key === template) ?? templateKeys[0];

  const items = new Map(registryJson.items.map((item) => [item.name, item]));
  const templates = templateKeys.map((key) => ({
    description: items.get(key)?.description ?? "",
    key,
    title: items.get(key)?.title ?? key,
  }));

  return (
    <PageTransition>
      <div className="flex min-h-0 flex-1 flex-col">
        <OgPlayground initialTemplate={initialTemplate} templates={templates} />
      </div>
    </PageTransition>
  );
}
