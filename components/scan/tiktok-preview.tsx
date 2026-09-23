import { cn } from "@/lib/utils";

/* Crawlers show the bare hostname, never the full URL. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface TikTokPreviewProps {
  className?: string;
  image: string;
  title?: string;
  url?: string;
}

/* TikTok renders a compact dark in-app card: small thumbnail with title and bare domain, no description. */
export const TikTokPreview = ({
  className,
  image,
  title,
  url,
}: TikTokPreviewProps) => (
  <div
    className={cn(
      "flex items-center gap-3 rounded-xl bg-zinc-900 p-2.5 text-zinc-50",
      className
    )}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      alt=""
      src={image}
      className="size-12 shrink-0 rounded-lg object-cover"
    />
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="line-clamp-1 text-sm font-semibold">{title}</span>
      <span className="line-clamp-1 text-xs text-zinc-400">
        {host(url || image)}
      </span>
    </div>
  </div>
);
