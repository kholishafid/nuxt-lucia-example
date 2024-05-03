import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "group flex h-10 items-center justify-center rounded-md border px-4 active:[box-shadow:none] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-blue-600 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 text-primary-foreground shadow-[inset_0_1px_1px_0px_#91b6f9] ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
