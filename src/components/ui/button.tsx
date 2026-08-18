import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// O rótulo pode quebrar em mais de uma linha (telas estreitas / textos longos
// traduzidos), por isso os tamanhos usam min-h em vez de altura fixa: botões
// lado a lado continuam com a mesma altura via `items-stretch` do container.
const buttonVariants = cva(
  "inline-flex items-center justify-center text-center min-w-0 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
        default: "min-h-12 px-6 py-3",
        sm: "min-h-9 px-4 py-2 text-sm",
        lg: "min-h-14 px-6 py-3 text-lg sm:px-8",
        xl: "min-h-11 py-2 px-8 sm:px-24",
        icon: "h-10 w-10 flex-shrink-0",
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
