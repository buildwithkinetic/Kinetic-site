type Alignment = "left" | "center"

interface SectionHeaderProps {
  /** Short monospace label above the headline (e.g. "THE PROBLEM") */
  eyebrow?: string
  /** Main heading text */
  title: string
  /** Optional supporting paragraph */
  description?: string
  /** Horizontal alignment — defaults to left */
  align?: Alignment
  className?: string
}

/**
 * SectionHeader — consistent section heading pattern used on all pages.
 * Warm ivory / cream premium palette.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : ""
  const maxWidth = description ? "max-w-3xl" : "max-w-2xl"

  return (
    <div className={`${alignClass} ${maxWidth} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-[#0F0E0C] mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[#6B6560] text-lg leading-relaxed">{description}</p>
      )}
    </div>
  )
}
