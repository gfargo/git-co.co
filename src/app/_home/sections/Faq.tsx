import { Section } from "@/components/Section"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ThreeJSBackground from "@/components/ThreeJSBackground"
import Image from "next/image"
import { FaqAccordion } from "./FaqAccordion"
import { siteConfig } from "@/config/site"

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
            <strong className="font-semibold">Yes!</strong> By default,{" "}
            <code className="text-primary">coco</code> loads{" "}
            <Link
              className="underline"
              href={siteConfig.links.commitPrompt}
            >
              <code>/src/lib/langchain/prompts/commitDefault.ts</code>
            </Link>
          </p>
          <p>
            This can be overridden by adding a{" "}
            <code className="text-gray-700">prompt</code> key to your config.
          </p>
          <pre className="bg-secondary rounded p-2 text-sm text-white">
            {`{\n\t"prompt": "Write git commit message from the provided file diffs: \n\n\t'''{summary}'''\n\n\tCommit:",
}`}
          </pre>
          <p>
            <code>.coco.config.json</code>
          </p>
        </div>
      )
    },
    {
      question: "configuring `coco.config.json`?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            The <code className="text-primary">coco.config.json</code> file is
            used to configure <code className="text-primary">coco</code> to your
            liking, take a look at the{" "}
            <Link className="underline" href="/schema.json">
              schema.json
            </Link>
            {` `}
            for more information about the available options.
          </p>
        </div>
      )
    },
    {
      question: "what AI providers does coco support?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <code className="text-primary">coco</code> supports multiple AI
            providers, giving you flexibility in how you run it:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>OpenAI</strong> - GPT-4, GPT-3.5-turbo (default)
            </li>
            <li>
              <strong>Anthropic Claude</strong> - Claude 3.5 Sonnet, Claude 3
              Opus
            </li>
            <li>
              <strong>Ollama</strong> - Run models locally (Llama, Mistral,
              etc.)
            </li>
          </ul>
          <p className="mt-2">
            Find out more about configuring AI providers in the{" "}
            <a
              className="text-primary hover:underline"
              href={siteConfig.links.wiki}
              target="_blank"
            >
              wiki
            </a>
            , including how to{" "}
            <a
              className="text-primary hover:underline"
              href={siteConfig.links.ollamaWiki}
              target="_blank"
            >
              use Ollama for privacy-focused local models
            </a>
            .
          </p>
        </div>
      )
    },
    {
      question: "is my code sent to AI providers? what about privacy?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <strong className="font-semibold">You have full control.</strong>{" "}
            When using cloud AI providers (OpenAI, Anthropic), your staged
            changes are sent to generate commit messages.
          </p>
          <p>
            For complete privacy, use{" "}
            <a
              className="text-primary hover:underline"
              href={siteConfig.links.ollamaWiki}
              target="_blank"
            >
              Ollama to run AI models locally
            </a>{" "}
            - your code never leaves your machine. No API costs, full privacy,
            and works offline.
          </p>
          <p>
            You can also configure file ignoring to exclude sensitive files from
            analysis.
          </p>
        </div>
      )
    },
    {
      question: "how much does it cost?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <code className="text-primary">coco</code> itself is{" "}
            <strong>free and open-source</strong>. The only costs are for the AI
            providers you choose:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>OpenAI</strong> - Pay per use (typically pennies per
              commit)
            </li>
            <li>
              <strong>Anthropic Claude</strong> - Pay per use
            </li>
            <li>
              <strong>Ollama (Local)</strong> - 100% free, no API costs, runs on
              your machine
            </li>
          </ul>
          <p>
            For teams wanting zero ongoing costs, Ollama is the perfect solution.
          </p>
        </div>
      )
    },
    {
      question: "can my team use coco together?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <strong className="font-semibold">Yes!</strong>{" "}
            <code className="text-primary">coco</code> is designed for team
            collaboration:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Share configuration files (
              <code>.coco.config.json</code>) in your repository
            </li>
            <li>
              Enforce commit standards with commitlint integration across the
              team
            </li>
            <li>Use Ollama for enterprise deployments with full privacy</li>
            <li>
              Configure project-specific rules and ignored files for consistency
            </li>
          </ul>
          <p>
            Check out our{" "}
            <a
              className="text-primary hover:underline"
              href={`${siteConfig.links.wiki}/Team-Collaboration`}
              target="_blank"
            >
              Team Collaboration guide
            </a>{" "}
            for enterprise setup best practices.
          </p>
        </div>
      )
    },
    {
      question: "what if the generated commit message isn't perfect?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            <code className="text-primary">coco</code> offers multiple ways to
            refine commit messages:
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Use <code>-i</code> (interactive mode) to review and edit before
              committing
            </li>
            <li>
              Add context with <code>--additional</code> flag to guide generation
            </li>
            <li>
              If commitlint validation fails, coco automatically retries with
              error feedback
            </li>
            <li>
              Customize the prompt in your config for better results over time
            </li>
          </ul>
          <p>
            The AI learns from your project&apos;s patterns, and with
            conventional commits enabled, messages follow your exact standards.
          </p>
        </div>
      )
    },
    {
      question: "can I use coco within my CI/CD pipeline?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>Yes!</p>
          <p>
            <code className="text-primary">coco</code> can be used within your
            CI/CD pipeline. Depending on your use case, you may want to use the{" "}
            <code>commit</code> command to automatically write commit messages.
          </p>
          <p>
            or maybe replace the previous <code>npx auto-changelog -p</code>{" "}
            with <code>npx git-coco changelog</code> command.
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
