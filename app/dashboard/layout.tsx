import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"

/**
 * DashboardLayout — shell that wraps all dashboard pages.
 * Uses the same dark-premium design tokens as the marketing site:
 * #080A0F base, #111318 surface, #F97316 accent, consistent typography.
 *
 * Note: The main dashboard page (/app/dashboard/page.tsx) is a fully
 * self-contained client component that renders its own sidebar inline.
 * This layout adds the shell for sub-pages (leads, pipeline, analytics, etc.)
 * while keeping the dashboard/page.tsx experience intact via children pass-through.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F8FAFC] flex">
      {/* Left sidebar — hidden on mobile, visible md+ */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
