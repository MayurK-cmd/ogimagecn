import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface SnapchatPreviewProps {
  className?: string;
  description?: string;
  image: string;
  title?: string;
  url?: string;
}

/* Snapchat renders a compact chat card: full-width image with title + domain in rounded bubble. */
export const SnapchatPreview = ({
  className,
  description,
  image,
  title,
  url,
}: SnapchatPreviewProps) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="overflow-hidden rounded-2xl border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={image} className="aspect-1200/630 w-full object-cover" />
      <div className="bg-muted/40 flex flex-col gap-0.5 px-3 py-2">
        <span className="text-muted-foreground text-xs">
          {host(url || image)}
        </span>
        {title && <span className="line-clamp-1 text-sm">{title}</span>}
      </div>
    </div>
  </div>
);