import { cn } from "@/lib/utils";

/* Signal shows the bare hostname beneath the link preview. */
const host = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export interface SignalPreviewProps {
  className?: string;
  description?: string;
  image: string;
  title?: string;
  url?: string;
}

/* Signal puts the preview in a blue chat bubble with the image above the copy. */
export const SignalPreview = ({
  className,
  description,
  image,
  title,
  url,
}: SignalPreviewProps) => (
  <div
    className={cn(
      "rounded-lg border bg-blue-50 p-3 dark:bg-blue-950/30",
      className
    )}
  >
    <div className="flex flex-col gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src={image}
        className="aspect-1200/630 w-full rounded object-cover"
      />
      <span className="mt-1 text-sm font-semibold">{title}</span>
      <span className="text-muted-foreground line-clamp-2 text-xs">
        {description}
      </span>
      <span className="text-muted-foreground text-[11px]">
        {host(url || image)}
      </span>
    </div>
  </div>
);
