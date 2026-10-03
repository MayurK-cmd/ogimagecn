"use client";

import {
  LayoutGridIcon,
  RotateCcwIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { ComponentCustomizer } from "@/components/component-customizer";
import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import type { PlaygroundTemplate } from "@/components/og-playground-templates";
import { OgTemplateList } from "@/components/og-playground-templates";
import { PreviewRenderer } from "@/components/preview-renderer";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import type { PackageManager } from "@/hooks/use-package-manager";
import { usePackageManager } from "@/hooks/use-package-manager";
import registry from "@/registry/__index__";
import { getDefaults } from "@/registry/lib/customizer-config";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/* Mirrors the global package-manager commands (see command-box.tsx). */
const pmCommands: Record<PackageManager, string> = {
  bun: "bunx --bun",
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
};

/* `shadcn-registry-1` installs as `ShadcnRegistry1`. `Component.name` is not
   an option: bundlers rename it in production builds. */
const toPascalCase = (str: string): string =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const isEmpty = (value: unknown): boolean =>
  value === "" ||
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0);

const isUploadedImage = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("data:");

const formatPropValue = (key: string, value: unknown): string => {
  if (Array.isArray(value)) {
    return `{${JSON.stringify(value)}}`;
  }
  /* A data URL has no home in a snippet, so point at where the file belongs. */
  if (isUploadedImage(value)) {
    return JSON.stringify(`/og/${key}.png`);
  }
  return JSON.stringify(value);
};

const buildSnippet = (
  templateKey: string,
  values: Record<string, unknown>
): string => {
  const componentName = toPascalCase(templateKey);
  const entries = Object.entries(values);
  const uploaded = entries
    .filter(([, value]) => isUploadedImage(value))
    .map(([key]) => `${key}.png`);

  const props = entries
    .filter(([, value]) => !isEmpty(value))
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `  ${key}=${formatPropValue(key, value)}`)
    .join("\n");

  const note = uploaded.length
    ? `// Save the uploaded ${uploaded.join(", ")} to public/og/\n`
    : "";

  return `${note}import { ${componentName} } from "@/components/og/${templateKey}";\n\n<${componentName}\n${props}\n/>`;
};

const ResetButton = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={className ?? "text-muted-foreground size-7 rounded-md"}
        {...props}
      >
        <RotateCcwIcon />
        <span className="sr-only">Reset to defaults</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent className="pr-2 pl-3">
      <div className="flex items-center gap-3">
        Reset to defaults
        <Kbd>R</Kbd>
      </div>
    </TooltipContent>
  </Tooltip>
);

const ControlsPanel = ({
  children,
  isDefault,
  onReset,
  showClose = false,
  title,
}: {
  children: React.ReactNode;
  isDefault: boolean;
  onReset: () => void;
  showClose?: boolean;
  title: string;
}) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 max-lg:h-14">
      <h3 className="truncate text-sm font-medium">{title}</h3>
      <div className="flex shrink-0 items-center gap-2">
        <ResetButton disabled={isDefault} onClick={onReset} />
        {showClose && (
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground size-7 rounded-md"
            >
              <XIcon />
              <span className="sr-only">Close panel</span>
            </Button>
          </SheetClose>
        )}
      </div>
    </div>

    <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
  </div>
);

export const OgPlayground = ({
  initialTemplate,
  templates,
}: {
  initialTemplate: string;
  templates: PlaygroundTemplate[];
}) => {
  const router = useRouter();
  const [templateKey, setTemplateKey] = useState(initialTemplate);
  const [values, setValues] = useState(() =>
    getDefaults(registry[initialTemplate].config)
  );
  const [svg, setSvg] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [packageManager] = usePackageManager();

  const entry = registry[templateKey];
  const template =
    templates.find((item) => item.key === templateKey) ?? templates[0];

  const defaults = useMemo(() => getDefaults(entry.config), [entry.config]);

  const isDefault = useMemo(
    () =>
      Object.entries(defaults).every(
        ([key, value]) => JSON.stringify(values[key]) === JSON.stringify(value)
      ),
    [defaults, values]
  );

  const handleChange = useCallback((key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(defaults);
  }, [defaults]);

  const handleTemplateChange = useCallback(
    (newKey: string) => {
      setTemplateKey(newKey);
      setValues(getDefaults(registry[newKey].config));
      router.replace(`${ROUTES.PLAYGROUND}?template=${newKey}`, {
        scroll: false,
      });
    },
    [router]
  );

  useHotkeys("r", () => handleReset(), {
    enabled: !isDefault,
    preventDefault: true,
  });

  const installCommand = `${pmCommands[packageManager]} shadcn@latest add @ogimagecn/${templateKey}`;
  const jsxSnippet = useMemo(
    () => buildSnippet(templateKey, values),
    [templateKey, values]
  );

  const templateList = (
    <OgTemplateList
      activeKey={templateKey}
      onSelect={(key) => {
        handleTemplateChange(key);
        setIsListOpen(false);
      }}
      templates={templates}
    />
  );

  const renderControls = (showClose = false) => (
    <ControlsPanel
      isDefault={isDefault}
      onReset={handleReset}
      showClose={showClose}
      title={template.title}
    >
      <ComponentCustomizer
        className="sm:grid-cols-1"
        controls={entry.config}
        onChange={handleChange}
        values={values}
      />
    </ControlsPanel>
  );

  return (
    <div className="flex h-[calc(100svh-var(--header-height))] min-h-0 flex-col px-6 pb-4">
      <div className="grid min-h-0 flex-1 lg:grid-cols-[17rem_minmax(0,1fr)_20rem] lg:gap-4">
        <aside className="hidden min-h-0 flex-col overflow-hidden rounded-xl border lg:flex">
          {templateList}
        </aside>

        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-xl border">
          <div className="absolute inset-x-3 top-3 z-10 flex items-center gap-2 lg:hidden">
            <div className="min-w-0 flex-1">
              <Sheet onOpenChange={setIsListOpen} open={isListOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="w-full justify-start"
                    size="sm"
                    variant="outline"
                  >
                    <LayoutGridIcon />
                    <span className="truncate">{template.title}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="w-full max-w-none gap-0 p-0 sm:max-w-none"
                  side="left"
                >
                  <SheetTitle className="sr-only">Templates</SheetTitle>
                  {templateList}
                </SheetContent>
              </Sheet>
            </div>

            <Sheet onOpenChange={setIsPanelOpen} open={isPanelOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-8 shrink-0"
                  aria-label="Customize"
                >
                  <SlidersHorizontalIcon />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="w-full max-w-none gap-0 p-0 sm:max-w-none [&>button]:hidden"
                side="right"
              >
                <SheetTitle className="sr-only">
                  {template.title} controls
                </SheetTitle>
                {renderControls(true)}
              </SheetContent>
            </Sheet>
          </div>

          {/* `container-type: size` lets the card below cap its width against the
              available height, so it never grows wider than its column on short
              viewports. PreviewRenderer keeps the 1200:630 ratio itself. */}
          {/* Size containment only on lg, where the grid row gives this area a
              definite height; on mobile it would collapse the preview to zero
              height and pile the overlay and footer on top of each other. */}
          <div className="@container flex min-h-0 flex-1 items-center justify-center overflow-hidden p-3 lg:p-6 lg:[container-type:size]">
            <div className="w-full max-w-3xl lg:max-w-[min(48rem,calc(100cqh*1.9048))]">
              <PreviewRenderer
                Component={entry.Component}
                height={OG_HEIGHT}
                name={template.title}
                onSvgReady={setSvg}
                values={values}
                width={OG_WIDTH}
              />
            </div>
          </div>

          <div className="shrink-0 p-3">
            <div className="flex items-center gap-2">
              <div className="bg-code text-code-foreground relative flex h-8 min-w-0 flex-1 items-center overflow-hidden rounded-lg text-sm">
                <code
                  data-language="bash"
                  className="min-w-0 flex-1 truncate pr-11 pl-4 font-mono text-sm/none"
                >
                  <span className="select-none">$ </span>
                  {installCommand}
                </code>
                <CopyButton
                  className="absolute top-1/2 right-1 z-10 size-7 -translate-y-1/2 opacity-70 hover:opacity-100 focus-visible:opacity-100"
                  value={installCommand}
                  event="copy_npm_command"
                />
              </div>

              <DownloadButton
                className="h-8 shrink-0 max-sm:w-8 max-sm:px-0"
                svg={svg}
                width={OG_WIDTH}
              >
                <span className="hidden sm:inline">Save Image</span>
              </DownloadButton>

              <CopyButton
                className="h-8 shrink-0 max-sm:w-8 max-sm:px-0"
                value={jsxSnippet}
                variant="default"
                event="copy_usage_import_code"
              >
                <span className="hidden sm:inline">Copy JSX</span>
              </CopyButton>
            </div>
          </div>
        </div>

        <aside className="hidden min-h-0 flex-col overflow-hidden rounded-xl border lg:flex">
          {renderControls()}
        </aside>
      </div>
    </div>
  );
};
