import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface GoogleChatPreviewProps {
  className?: string;
  description?: string;
  image: string;
  title?: string;
  url?: string;
}

/* Google Chat unfurls a small card under the message: bold title, one-line muted description and domain, thumbnail on the right. */
export const GoogleChatPreview = ({
  className,
  description,
  image,
  title,
  url,
}: GoogleChatPreviewProps) => (
  <div
    className={cn(
      "bg-card flex gap-3 overflow-hidden rounded-xl border p-3",
      className
    )}
  >
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="line-clamp-1 text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground line-clamp-1 text-xs">
        {description}
      </span>
      <span className="text-muted-foreground text-[11px]">
        {host(url || image)}
      </span>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      alt=""
      src={image}
      className="size-16 shrink-0 rounded-md object-cover"
    />
  </div>
);
