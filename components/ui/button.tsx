"use client";

import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { buttonVariants } from "@/components/ui/button-variants";
import type { FeedbackType } from "@/hooks/use-feedback";
import { useFeedback } from "@/hooks/use-feedback";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  sound?: FeedbackType;
  haptic?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  sound,
  haptic,
  onClick,
  ...props
}: ButtonProps) => {
  const play = useFeedback({ haptic, sound });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    play();
    onClick?.(e);
  };

  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-size={size}
      data-variant={variant}
      className={cn(buttonVariants({ className, size, variant }))}
      onClick={handleClick}
      {...props}
    />
  );
};

export { Button, buttonVariants };
