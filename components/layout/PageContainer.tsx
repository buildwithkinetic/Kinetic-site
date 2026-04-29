import type { ComponentPropsWithoutRef } from "react"

type ContainerSize = "sm" | "md" | "lg" | "xl"

interface PageContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: ContainerSize
}

const maxWidths: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
}

/**
 * PageContainer — provides consistent horizontal centering, max-width, and
 * horizontal padding across all marketing and service pages.
 */
export function PageContainer({
  size = "lg",
  className = "",
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`${maxWidths[size]} mx-auto px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
