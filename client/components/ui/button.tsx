import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-[linear-gradient(180deg,rgba(69,215,255,0.24),rgba(47,128,255,0.18))] text-white shadow-[0_14px_32px_rgba(17,94,158,0.28),0_0_22px_rgba(69,215,255,0.16)] hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_18px_40px_rgba(17,94,158,0.34),0_0_28px_rgba(69,215,255,0.24)]",
        outline:
          "border-white/12 bg-white/[0.04] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/[0.08] hover:text-white aria-expanded:bg-white/[0.08] aria-expanded:text-white",
        secondary:
          "border-primary-bright/20 bg-primary-bright/10 text-primary-bright shadow-[0_12px_28px_rgba(47,128,255,0.14)] hover:-translate-y-0.5 hover:bg-primary-bright/16 aria-expanded:bg-primary-bright/16",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.05] hover:text-white aria-expanded:bg-white/[0.05] aria-expanded:text-white",
        destructive:
          "border-[rgba(255,93,122,0.22)] bg-[rgba(255,93,122,0.12)] text-[var(--destructive)] hover:-translate-y-0.5 hover:bg-[rgba(255,93,122,0.18)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "h-auto rounded-none border-0 bg-transparent px-0 py-0 text-primary shadow-none hover:text-white hover:underline",
      },
      size: {
        default: "h-11 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-8 rounded-lg px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 rounded-xl px-4 text-[0.84rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-13 px-7 text-base [&_svg:not([class*='size-'])]:size-4",
        icon: "size-11",
        "icon-xs": "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 rounded-xl",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
