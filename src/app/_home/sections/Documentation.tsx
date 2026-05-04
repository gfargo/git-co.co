import Link from "next/link"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import {
    RocketIcon,
    UsersIcon,
    HomeIcon,
    WrenchIcon,
    ArrowRightIcon
} from "lucide-react"

export const DocumentationSection = () => {
  const essentialGuides = [
    {
      icon: RocketIcon,
      title: "Getting Started",
      description: "Complete beginner's guide from installation to first commit",
      href: "/docs/getting-started"
    },
    {
      icon: WrenchIcon,
      title: "Configuration Overview",
      description: "All configuration options and setup methods",
      href: "/docs/configuration"
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description: "Enterprise deployment and team adoption strategies",
      href: "/docs/team-collaboration"
    },
    {
      icon: HomeIcon,
      title: "Using Ollama",
      description: "Local AI setup for privacy and cost control",
      href: "/docs/using-ollama"
    }
  ]

  return (
    <Section id="documentation">
      <div className="container px-4 md:px-6">
        <SectionHeader prompt="~/coco $ docs" title="Documentation" />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {essentialGuides.map((guide, index) => (
              <Link
                key={index}
                href={guide.href}
                className="group flex items-start p-4 sm:p-6 bg-bg-elevated border border-border rounded-lg hover:border-terminal-green-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded-lg bg-terminal-green/10 flex-shrink-0">
                  <guide.icon className="w-5 h-5 sm:w-6 sm:h-6 text-terminal-green" />
                </div>
                <div>
                  <h4 className="text-lg font-mono text-foreground mb-2">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1 rounded-sm font-mono text-terminal-green hover:text-terminal-green-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all docs
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
