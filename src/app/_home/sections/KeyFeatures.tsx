import { Section } from "@/components/Section"
import {
  BrainCircuitIcon,
  CheckCircle2Icon,
  GitBranchIcon,
  PackageIcon,
  RefreshCwIcon,
  WrenchIcon,
  HomeIcon
} from "lucide-react"

export const KeyFeaturesSection = () => {
  const features = [
    {
      icon: BrainCircuitIcon,
      title: "AI-Powered Commits with Local Support",
      description:
        "Generate intelligent commit messages using OpenAI, Anthropic Claude, or run completely offline with Ollama for full privacy and zero API costs. Your code, your choice."
    },
    {
      icon: CheckCircle2Icon,
      title: "Optional Conventional Commits & Commitlint",
      description:
        "First-class support for Conventional Commits with automatic commitlint validation, intelligent retry logic, and seamless integration with your existing rules. Enable when you need it, skip when you don't."
    },
    {
      icon: RefreshCwIcon,
      title: "Robust & Developer-Friendly",
      description:
        "Works seamlessly with npm, yarn, and pnpm. Advanced error recovery with automatic JSON repair. Flexible integration for stdout, interactive, or direct commit modes. Built to adapt to your workflow."
    }
  ]

  return (
    <Section id="key-features" className="bg-gray-50 text-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-primary mb-4">
            key features
          </h2>
          <p className="text-center text-lg text-gray-600 max-w-2xl">
            Powerful capabilities that adapt to your workflow and coding
            standards
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-primary/30"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-primary/10">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
