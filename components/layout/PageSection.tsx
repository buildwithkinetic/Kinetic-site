import type { ComponentPropsWithoutRef } from "react"

type SectionVariant = "default" | "surface" | "dark"
type SectionPadding = "sm" | "md" | "lg" | "xl"

interface PageSectionProps extends ComponentPropsWithoutRef<"section"> {
  variant?: SectionVariant
  padding?: SectionPadding
}

const variantClasses: Record<SectionVariant, string> = {
  default: "",
  surface: "bg-[#111111]/40 border-y border-[#1a1a1a]",
  dark: "bg-[#0F0E0C] border-y border-[#1a1a1a]",
}

const paddingClasses: Record<SectionPadding, string> = {
  sm: "py-10 px-6",
  md: "py-16 px-6",
  lg: "py-20 px-6",
  xl: "py-24 px-6",
}

/**
 * PageSection — standardised section wrapper with consistent padding,
 * background variants, and top/bottom borders used across all pages.
 */
export function PageSection({
  variant = "default",
  padding = "lg",
  className = "",
  children,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
