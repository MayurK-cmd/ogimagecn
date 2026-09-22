import { cn } from "@/lib/utils";

const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface MastodonPreviewProps {
  className?: string;
  description?: string;
  image: string;
  siteName?: string;
  title?: string;
  url?: string;
}

/* Wide images make Mastodon use its expanded card: a 1.91:1 image above the
   provider, title, and description. Narrow images use a separate compact row. */
export const MastodonPreview = ({
  className,
  description,
  image,
  siteName,
  title,
  url,
}: MastodonPreviewProps) => (
  <div className={cn("overflow-hidden rounded-lg border", className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" className="aspect-[1.91/1] w-full object-cover" src={image} />
    <div className="flex flex-col px-[15px] py-[15px]">
      <span className="text-muted-foreground mb-2 truncate text-sm">
        {siteName || host(url || image)}
      </span>
      <span className="line-clamp-2 text-[19px] leading-6 font-bold">
        {title}
      </span>
      {description ? (
        <span className="text-muted-foreground mt-2 truncate text-sm">
          {description}
        </span>
      ) : null}
    </div>
  </div>
);
