import { Section } from "@/components/Section"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ThreeJSBackground from "@/components/ThreeJSBackground"
import Image from "next/image"
import { FaqAccordion } from "./FaqAccordion"

export const FaqSection = () => {
  const questions = [
    {
      question: "what is coco?",
      answer: (
        <div className="space-y-4">
          <p>
            <code className="text-primary">coco</code> is an AI-powered git
            assistant that automates commit messages, changelogs, code recaps,
            and reviews.
          </p>
          <p>
            It supports multiple AI providers (OpenAI, Anthropic Claude, and
            local models via Ollama) with first-class Conventional Commits
            support and commitlint integration.
          </p>
        </div>
      )
    },
    {
      question: "does coco support conventional commits?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong className="font-semibold">Yes!</strong>{" "}
            <code className="text-primary">coco</code> has first-class support
            for Conventional Commits - it&apos;s optional and can be enabled
            automatically or manually.
          </p>
          <p>
            When <code className="text-primary">coco</code> detects a
            commitlint configuration, it automatically enables conventional
            commits mode and validates your messages against your rules with
            intelligent retry logic.
          </p>
          <pre className="bg-secondary rounded p-2 text-sm text-white">
            <code>{`# Force conventional commits mode\ncoco --conventional\n\n# Output: feat(auth): add OAuth2 integration`}</code>
          </pre>
        </div>
      )
    },
    {
      question: "why should I use it?",
      answer: (
        <div>
          <p>
            It&apos;s finally time to acknowledge the bad habit that is
            <br />
            <br />
            <pre className="bg-secondary rounded p-2 text-sm text-white">
              <code>git commit -m &quot;fixed bug&quot;</code>
            </pre>
            <br />
            <div className="text-center">or</div>
            <br />
            <pre className="bg-secondary rounded p-2 text-sm text-white">
              <code>git commit -m &quot;updates&quot;</code>
            </pre>
            <br />
            <code className="text-primary">coco</code> can write concise
            articulate context-rich commit messages and changelogs using the
            power of large language models &{" "}
            <Link
              className="underline"
              href="https://www.langchain.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              langchain
            </Link>
            .
            <br />
            <br />
            With the help of robots, it&apos;s time to stop writing bad commit
            messages.
          </p>
        </div>
      )
    },
    {
      question: "how does it work?",
      answer: (
        <div className="space-y-4">
          <p>
            <code className="text-primary">coco</code> analyzes your staged
            changes creating a list of diffs and summarizations. This context is
            then provided to the language model when being prompted for a commit
            message.
          </p>
          <p>
            Summarization occurs when the staged diffs exceed the token limit of
            the language model. In this case, the staged diffs are recursively
            summarized until the token limit is no longer exceeded.
          </p>
        </div>
      )
    },
    {
      question: "can I customize the prompt?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <strong className="font-semibold">Yes!</strong> Add a{" "}
            <code className="text-primary">prompt</code> key to your{" "}
            <code className="text-primary">.coco.config.json</code> to override
            the default. Full details and examples are in the{" "}
            <Link className="underline" href="/docs/configuration">
              Configuration docs
            </Link>
            .
          </p>
        </div>
      )
    },
    {
      question: "what AI providers does coco support?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            OpenAI, Anthropic Claude, and local models via{" "}
            <Link className="underline" href="/docs/using-ollama">
              Ollama
            </Link>
            . Ollama runs entirely on your machine — no API costs, full privacy,
            works offline.
          </p>
          <p>
            See the{" "}
            <Link className="underline" href="/docs/configuration">
              Configuration docs
            </Link>{" "}
            for provider setup details.
          </p>
        </div>
      )
    },
    {
      question: "is my code sent to AI providers? what about privacy?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            When using cloud providers (OpenAI, Anthropic), staged diffs are
            sent to generate messages. For complete privacy, use{" "}
            <Link className="underline" href="/docs/using-ollama">
              Ollama
            </Link>{" "}
            — your code never leaves your machine. You can also{" "}
            <Link className="underline" href="/docs/ignoring-files">
              ignore specific files and extensions
            </Link>{" "}
            to control what gets analyzed.
          </p>
        </div>
      )
    },
    {
      question: "how much does it cost?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <code className="text-primary">coco</code> is{" "}
            <strong>free and open-source</strong>. Cloud providers (OpenAI,
            Anthropic) charge per use — typically pennies per commit.{" "}
            <Link className="underline" href="/docs/using-ollama">
              Ollama
            </Link>{" "}
            is 100% free and runs locally.
          </p>
        </div>
      )
    },
    {
      question: "can my team use coco together?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <strong className="font-semibold">Yes!</strong> Commit your{" "}
            <code className="text-primary">.coco.config.json</code> to share
            consistent settings across the team. See the{" "}
            <Link className="underline" href="/docs/team-collaboration">
              Team Collaboration guide
            </Link>{" "}
            for shared config patterns, commitlint integration, and enterprise
            Ollama deployment.
          </p>
        </div>
      )
    },
    {
      question: "what if the generated message isn't perfect?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            Use <code className="text-primary">-i</code> (interactive mode) to
            review and edit before committing, or{" "}
            <code className="text-primary">--additional</code> to add context
            that guides generation. The{" "}
            <Link className="underline" href="/docs/advanced-usage">
              Advanced Usage docs
            </Link>{" "}
            cover prompt customization, model tuning, and CI/CD integration.
          </p>
        </div>
      )
    }
  ]

  return (
    <Section
      id="faq"
      className="from-gray-700 to-gray-950 bg-gradient-to-b relative overflow-y-clip"
    >
      <div className="container px-4 md:px-6 z-10 relative">
        <div className="flex flex-col items-center mb-6 ">
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 text-center ">
            <span className="sr-only">Frequently Asked Questions</span>
            <span className="relative bg-gradient-to-b from-white  to-gray-100 inline-block text-transparent bg-clip-text">
              faq
            </span>
          </h2>

          {/* hidden for now */}
          <div className="relative w-full max-w-xl mx-auto hidden">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </span>
            <Input
              aria-label="Search questions"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search questions"
              type="search"
            />
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto bg-gray-900/60 p-10 rounded-lg shadow-inner">
          <FaqAccordion questions={questions} />
        </div>
      </div>

      <ThreeJSBackground />
      <Image
        src={`/mascott/mascott_${["a", "b", "c", "d"].sort(() => Math.random() - 0.5)[0]}.png`}
        alt="mascott"
        width={200}
        height={200}
        className="hidden"
      />
    </Section>
  )
}
