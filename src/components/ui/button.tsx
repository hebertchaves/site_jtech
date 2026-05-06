import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#E30613] text-white hover:bg-[#C00510]",
        outline: "border-2 border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white",
        ghost: "hover:bg-gray-100 text-gray-800",
        link: "text-[#E30613] underline-offset-4 hover:underline",
        dark: "bg-[#0B0B0B] text-white hover:bg-gray-900",
        secondary: "bg-[#0B0B0B] text-white hover:bg-gray-800",
        white: "bg-white text-[#0B0B0B] hover:bg-gray-100",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        xl: "h-11 px-24",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
