"use client";

import { useEffect, useRef, useState } from "react";

import { PreviewRenderer } from "@/components/preview-renderer";
import { cn } from "@/lib/utils";
import registry from "@/registry/__index__";
import { getDefaults } from "@/registry/lib/customizer-config";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export interface PlaygroundTemplate {
  key: string;
  title: string;
  description: string;
}

/* Every thumbnail is a real Satori render, so defer the ones that have not
   scrolled into view; otherwise opening the playground pays for all of them. */
const useNearViewport = (rootMargin = "300px") => {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isNear) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return { isNear, ref };
};

const TemplateThumbnail = ({ templateKey }: { templateKey: string }) => {
  const { isNear, ref } = useNearViewport();
  const entry = registry[templateKey];

  return (
    <div className="bg-muted/40 overflow-hidden rounded-md border" ref={ref}>
      {isNear ? (
        <PreviewRenderer
          className="rounded-[inherit] border-none shadow-none"
          Component={entry.Component}
          height={OG_HEIGHT}
          name={templateKey}
          values={getDefaults(entry.config)}
          width={OG_WIDTH}
        />
      ) : (
        <div className="aspect-[1200/630] w-full animate-pulse" />
      )}
    </div>
  );
};

export const OgTemplateList = ({
  activeKey,
  className,
  onSelect,
  templates,
}: {
  activeKey: string;
  className?: string;
  onSelect: (key: string) => void;
  templates: PlaygroundTemplate[];
}) => (
  <div className={cn("flex h-full min-h-0 flex-col", className)}>
    <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 max-lg:h-14">
      <h3 className="truncate text-sm font-medium">Templates</h3>
    </div>

    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
      {templates.map((template) => {
        const isActive = template.key === activeKey;

        return (
          <button
            aria-current={isActive}
            className={cn(
              "flex w-full cursor-pointer flex-col gap-2 rounded-lg border p-2 text-left transition-colors",
              isActive
                ? "border-primary bg-accent/40"
                : "hover:bg-muted/60 border-transparent"
            )}
            key={template.key}
            onClick={() => onSelect(template.key)}
            type="button"
          >
            <TemplateThumbnail templateKey={template.key} />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{template.title}</span>
              <span className="text-muted-foreground line-clamp-2 text-xs">
                {template.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  </div>
);
