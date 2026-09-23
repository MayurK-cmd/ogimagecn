import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface WeChatPreviewProps {
  className?: string;
  description?: string;
  image: string;
  title?: string;
  url?: string;
}

/* WeChat renders a chat-bubble card: title and muted description on the left, small square thumbnail on the right. */
export const WeChatPreview = ({
  className,
  description,
  image,
  title,
  url,
}: WeChatPreviewProps) => (
  <div
    className={cn(
      "bg-card flex gap-3 overflow-hidden rounded-2xl border p-3",
      className
    )}
  >
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="truncate text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground line-clamp-2 text-xs">
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
      className="size-14 shrink-0 rounded-lg object-cover"
    />
  </div>
);
