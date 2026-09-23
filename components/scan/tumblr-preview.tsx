import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface TumblrPreviewProps {
  className?: string;
  description?: string;
  image: string;
  title?: string;
  url?: string;
}

/* Tumblr renders a dashboard card: full-width image on top, bold title, short description, bare domain as a muted label. */
export const TumblrPreview = ({
  className,
  description,
  image,
  title,
  url,
}: TumblrPreviewProps) => (
  <div className={cn("overflow-hidden rounded-lg border", className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" src={image} className="aspect-1200/630 w-full object-cover" />
    <div className="flex flex-col gap-0.5 px-3 py-2.5">
      <span className="line-clamp-1 text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground line-clamp-2 text-xs">
        {description}
      </span>
      <span className="text-muted-foreground text-[11px]">
        {host(url || image)}
      </span>
    </div>
  </div>
);
