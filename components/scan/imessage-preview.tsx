import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface IMessagePreviewProps {
  className?: string;
  image: string;
  siteName?: string;
  title?: string;
  url?: string;
}

/* iMessage fills a heavily rounded bubble with the image and sets the title over the domain in a footer bar. */
export const IMessagePreview = ({
  className,
  image,
  siteName,
  title,
  url,
}: IMessagePreviewProps) => (
  <div className={cn("overflow-hidden rounded-2xl bg-muted/60", className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" src={image} className="aspect-1200/630 w-full object-cover" />
    <div className="flex flex-col gap-0.5 px-3 py-2">
      <span className="line-clamp-1 text-sm font-medium">{title}</span>
      <span className="text-muted-foreground text-xs">
        {siteName || host(url || image)}
      </span>
    </div>
  </div>
);
