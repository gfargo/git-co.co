import { Section } from "@/components/Section"
import { SearchIcon } from "lucide-react"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const FaqSection = () => {
  const questions = [
    {
      question: "what is coco?",
      answer: (
        <div className="space-y-4">
          <p>
            coco command line tool automates away the tedium of
            writing git commit messages.
          </p>
          <p>
            It utilizes langchain and supported large language models (llms) to
            facilitate the creation of detailed commit messages and changelogs.
          </p>
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
            <code>coco</code> can write concise articulate context-rich commit
            messages and changelogs using the power of large language models &{" "}
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
            <code>coco</code> analyzes your staged changes creating a list of
            diffs and summarizations. This context is then provided to the
            language model when being prompted for a commit message.
          </p>
          <p>
            summarization occurs when the staged diffs exceed the token limit of
            the language model. In this case, the staged diffs are recursively
            summarized until the token limit is no longer exceeded.
          </p>
        </div>
      )
    },
    {
      question: "how do I use my own prompt?",
      answer: (
        <div className="flex flex-col gap-2">
          <p>
            Out of the box, coco loads{" "}
            <Link
              className="underline"
              href="https://github.com/gfargo/coco/blob/main/src/lib/langchain/prompts/commitDefault.ts#L3-L15"
            >
              <code>/src/lib/langchain/prompts/commitDefault.ts</code>
            </Link>{" "}
            as it&apos;s default commit prompt.
          </p>
          <p>
            You can override this by adding a <code>prompt</code> key to your
            config.
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
    }
  ]

  return (
    <Section id="faq" className="bg-white text-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl sm:text-5xl font-bold mb-2 text-center text-primary">
            <span className="sr-only">Frequently Asked Questions</span>
            <span className="inline-block relative">faq</span>
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
        <div className="w-full max-w-xl mx-auto">
          <Accordion className="w-full" collapsible type="single">
            {questions.map((question, index) => {
              const id = question.question
                .replace(/\s/g, "-")
                .replace(/[^a-zA-Z0-9-_]/g, "")
                .toLowerCase()

              return (
                <AccordionItem key={id} value={id}>
                  <AccordionTrigger
                    id={id}
                    className="flex items-center justify-between py-4"
                  >
                    <span>{question.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="py-4">
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </Section>
  )
}
