import { Metadata } from "next"
import { DocsSidebar, MobileDocsSidebar } from "@/components/docs"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | Coco Docs",
  },
  description:
    "Learn how to use Coco, the AI-powered Git toolbelt. Comprehensive guides for installation, configuration, and advanced features.",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--bg-primary))]">
      <Header />
      <div className="flex-1 container py-8 md:py-12">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8 rounded-lg border border-[hsl(var(--border-default))] bg-[hsl(var(--bg-secondary))] p-4">
              <DocsSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
      <MobileDocsSidebar />
    </div>
  )
}
