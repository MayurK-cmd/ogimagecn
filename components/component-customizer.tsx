"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ControlConfig } from "@/registry/lib/customizer-config";

interface ComponentCustomizerProps {
  controls: ControlConfig;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  className?: string;
  /* Narrow columns clip long strings in a single-line input, so the playground
     swaps text controls for textareas that grow to fit their value. */
  multilineText?: boolean;
}

/* Grows with its content so a long title or excerpt stays readable. */
const GrowingTextarea = ({
  value,
  ...props
}: React.ComponentProps<typeof Textarea>) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);

  return <Textarea ref={ref} rows={1} value={value} {...props} />;
};

export const ComponentCustomizer = ({
  controls,
  values,
  onChange,
  className,
  multilineText = false,
}: ComponentCustomizerProps) => (
  <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
    {Object.entries(controls).map(([key, ctrl]) => {
      const id = `ctrl-${key}`;
      return (
        <div
          key={key}
          className={cn(
            "flex flex-col gap-2 justify-center",
            /* `col-span-full` rather than `col-span-2`: a fixed span would
               force a second track even when the grid is a single column. */
            ["image", "array"].includes(ctrl.type) && "col-span-full"
          )}
        >
          <Label htmlFor={id}>{ctrl.label}</Label>

          {ctrl.type === "text" &&
            (multilineText ? (
              <GrowingTextarea
                className="resize-none"
                id={id}
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
              />
            ) : (
              <Input
                id={id}
                type="text"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
              />
            ))}

          {ctrl.type === "color" && (
            <div className="flex items-center gap-2">
              <input
                id={id}
                type="color"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
                className="size-9 shrink-0 cursor-pointer rounded-md border bg-transparent p-0.5"
              />
              <Input
                id={id}
                type="text"
                value={values[key] as string}
                onChange={(e) => onChange(key, e.target.value)}
                className="min-w-0 flex-1 font-mono"
              />
            </div>
          )}

          {ctrl.type === "number" && (
            <Input
              id={id}
              type="number"
              min={ctrl.min}
              max={ctrl.max}
              step={ctrl.step}
              value={values[key] as number}
              onChange={(e) => {
                const value = e.target.valueAsNumber;
                if (Number.isFinite(value)) {
                  onChange(key, value);
                }
              }}
            />
          )}

          {ctrl.type === "image" && (
            <div className="flex flex-col gap-2 min-[420px]:flex-row">
              <Input
                className="min-w-0 flex-1"
                id={id}
                type="text"
                value={values[key] as string}
                placeholder="Image URL"
                onChange={(e) => onChange(key, e.target.value)}
              />
              <Button variant="outline" asChild className="shrink-0">
                <label>
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        return;
                      }
                      const reader = new FileReader();
                      reader.addEventListener("load", () =>
                        onChange(key, reader.result as string)
                      );
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </Button>
            </div>
          )}

          {ctrl.type === "select" && (
            <NativeSelect
              value={values[key] as string}
              onChange={(e) => onChange(key, e.target.value)}
            >
              {ctrl.options.map((opt) => (
                <NativeSelectOption key={opt} value={opt}>
                  {opt}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          )}

          {ctrl.type === "array" && (
            <div className="flex flex-col gap-2">
              {(values[key] as string[]).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {multilineText ? (
                    <GrowingTextarea
                      className="resize-none"
                      value={item}
                      onChange={(e) => {
                        const arr = [...(values[key] as string[])];
                        arr[i] = e.target.value;
                        onChange(key, arr);
                      }}
                    />
                  ) : (
                    <Input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const arr = [...(values[key] as string[])];
                        arr[i] = e.target.value;
                        onChange(key, arr);
                      }}
                    />
                  )}
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      const arr = (values[key] as string[]).filter(
                        (_, j) => j !== i
                      );
                      onChange(key, arr);
                    }}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                onClick={() =>
                  onChange(key, [...(values[key] as string[]), ""])
                }
              >
                <PlusIcon /> Add item
              </Button>
            </div>
          )}
        </div>
      );
    })}
  </div>
);
