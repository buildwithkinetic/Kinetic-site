"use client"

import { forwardRef } from "react"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"
export type ButtonSize = "sm" | "md" | "lg"

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0F0E0C] text-[#F5F0E8] font-bold hover:bg-[#3B82F6] shadow-md shadow-black/10",
  secondary:
    "border border-[#3B82F6]/30 text-[#0F0E0C] font-semibold hover:border-[#3B82F6]/60 bg-transparent",
  ghost: "text-[#6B6560] hover:text-[#0F0E0C] bg-transparent",
  outline:
    "border border-black/[0.12] text-[#6B6560] hover:border-[#3B82F6]/40 hover:text-[#0F0E0C] bg-transparent",
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs rounded-full",
  md: "px-6 py-3 text-sm rounded-full",
  lg: "px-8 py-4 text-base rounded-full",
}

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  href?: string
}

type ButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">

/**
 * Button — unified interactive element used across the entire product.
 * Renders as a <Link> when `href` is provided, otherwise as a <button>.
 * Warm ivory / cream premium palette.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      href,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 transition-all duration-200 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 " +
      "disabled:opacity-50 disabled:cursor-not-allowed"

    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    if (href !== undefined) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
