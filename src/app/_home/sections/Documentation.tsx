import { Section } from "@/components/Section"
import { siteConfig } from "@/config/site"
import {
  BookOpenIcon,
  RocketIcon,
  UsersIcon,
  HomeIcon,
  WrenchIcon,
  AlertCircleIcon,
  FileTextIcon,
  MessageSquareIcon
} from "lucide-react"

export const DocumentationSection = () => {
  const essentialGuides = [
    {
      icon: RocketIcon,
      title: "Getting Started",
      description: "Complete beginner's guide from installation to first commit",
      href: `${siteConfig.links.wiki}/Getting-Started`
    },
    {
      icon: WrenchIcon,
      title: "Configuration Overview",
      description: "All configuration options and setup methods",
      href: siteConfig.links.wiki
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description: "Enterprise deployment and team adoption strategies",
      href: `${siteConfig.links.wiki}/Team-Collaboration`
    },
    {
      icon: HomeIcon,
      title: "Using Ollama",
      description: "Local AI setup for privacy and cost control",
      href: siteConfig.links.ollamaWiki
    }
  ]

  const advancedResources = [
    {
      title: "Advanced Usage",
      description: "Custom prompts, automation, and power-user features",
      href: `${siteConfig.links.wiki}/Advanced-Usage`
    },
    {
      title: "Troubleshooting",
      description: "Solutions for common issues and debugging",
      href: `${siteConfig.links.wiki}/Troubleshooting`
    },
    {
      title: "Ignoring Files & Extensions",
      description: "Advanced file filtering and pattern matching",
      href: `${siteConfig.links.wiki}/Ignoring-Files-&-Extensions`
    }
  ]

  return (
    <Section id="documentation" className="bg-gray-50 text-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-primary mb-4">
            documentation & resources
          </h2>
          <p className="text-center text-lg text-gray-600 max-w-2xl">
            Comprehensive guides and resources to help you get the most out of
            coco
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Essential Guides */}
          <div>
            <div className="flex items-center mb-6">
              <BookOpenIcon className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Essential Guides</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {essentialGuides.map((guide, index) => (
                <a
                  key={index}
                  href={guide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Advanced Resources */}
          <div>
            <div className="flex items-center mb-6">
              <FileTextIcon className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Advanced Resources</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {advancedResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20"
                >
                  <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Need Help Section */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <AlertCircleIcon className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Need Help?</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href={`${siteConfig.links.wiki}/Troubleshooting`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-4 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <BookOpenIcon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Troubleshooting Guide
                </h4>
                <p className="text-sm text-gray-600">
                  Comprehensive problem-solving resource
                </p>
              </a>
              <a
                href={siteConfig.links.issues}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-4 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <AlertCircleIcon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  GitHub Issues
                </h4>
                <p className="text-sm text-gray-600">
                  Bug reports and feature requests
                </p>
              </a>
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-4 bg-white/50 rounded-lg hover:bg-white transition-colors"
              >
                <MessageSquareIcon className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Discord Community
                </h4>
                <p className="text-sm text-gray-600">
                  Real-time help and discussion
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
