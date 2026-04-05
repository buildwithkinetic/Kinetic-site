import type { ComponentPropsWithoutRef } from "react"

type CardVariant = "default" | "elevated" | "outline" | "accent"

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  variant?: CardVariant
  /**
   * When true, renders the card with a subtle top accent line gradient —
   * useful for featured / highlight cards.
   */
  accentTop?: boolean
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white border border-black/[0.08]",
  elevated:
    "bg-white border border-[#3B82F6]/10 shadow-xl shadow-black/10",
  outline: "border border-black/[0.08] bg-transparent",
  accent:
    "bg-white border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/5",
}

/**
 * Card — standard surface container used across dashboard and marketing pages.
 * Warm ivory / cream premium palette.
 */
export function Card({
  variant = "default",
  accentTop = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 overflow-hidden ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {accentTop && (
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}
