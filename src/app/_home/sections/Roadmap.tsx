import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/Section"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import terminalScreenshot from "@/assets/coco-terminal.png"
import { Fragment } from "react"
import { CheckIcon } from "@radix-ui/react-icons"

type milestone = {
  title: string
  description: string
  status: "done" | "in-progress" | "pending" | "planned"
  icon: string
}

export const RoadmapSection = () => {
  const milestones = [
    {
      title: "commit staged work",
      description:
        "generate commit message for staged files with a single command.",
      status: "done",
      icon: "💡"
    },
    {
      title: "interactive v.s. stdout mode",
      description:
        "interactively commit staged work or output commit to stdout.",
      status: "done",
      icon: "🎨"
    },
    {
      title: "commit all the files!",
      description:
        "support any number of staged changes through recursive summarization.",
      status: "done",
      icon: "🚛"
    },
    {
      title: "langchain",
      description:
        "better future interop with additional LLMs through langchain.",
      status: "done",
      icon: "🦜"
    },
    {
      title: "changelog generation",
      description:
        "generate changelogs from current branch, or provided range of commits.",
      status: "done",
      icon: "📝"
    },
    {
      title: "coco init",
      description:
        "interactive setup for coco for a project or globally on a system.",
      status: "done",
      icon: "🚀"
    },
    {
      title: "ollama",
      description:
        "add support for using large language models locally. more faster, much private.",
      status: "done",
      icon: "🦙"
    },
    {
      title: "agents",
      description:
        "provide clearer separation of concerns through multi-agent approach.",
      icon: "🕴️",
      status: "in-progress"
    },
    {
      title: "conventional commits",
      description:
        "generate commit messages that follow the rules of conventional commits.",
      status: "panned"
    },
    {
      title: "commitlint & commitizen",
      description: "lint generated content via pre-existing tools.",
      status: "planned"
    },
    {
      title: "and much more!",
      icon: "💫",
      description: "we're always thinking of new ways coco can improve your git workflow.",
      status: "pending",
    },
  ] as milestone[]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return "🎉"
      case "in-progress":
        return "🛠️"
      case "pending":
        return "⏳"
      case "planned":
      default:
        return "💭"
    }
  }

  return (
    <Section id="roadmap" className="bg-white text-black lg:pb-8 relative">
      <h2 className="text-3xl sm:text-5xl font-bold mb-16 text-center text-primary">
        roadmap
      </h2>

      <div className="flex container lg:gap-6 justify-center">
        <div className="md:flex-shrink-0 lg:translate-x-1/4 relative">
          <div className="grid grid-cols-6 space-y-4 md:space-y-2">
            {milestones.map(({ description, status, title, icon }, index) => {
              return (
                <Fragment key={`${index}-${status}`}>
                  <div className="col-span-6 flex items-center space-x-4">
                    <div
                      className={cn(
                        "relative rounded-full flex-shrink-0 drop-shadow-sm group"
                      )}
                    >
                      {status === "done" ? (
                        <>
                          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-100 to-yellow-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                          <div className="border-oxley-300 border h-3 w-3 absolute -top-0 -right-0 bg-white flex flex-col items-center justify-center rounded-full z-10">
                            <CheckIcon className="text-oxley-300 " />
                          </div>
                        </>
                      ) : null}

                      <div
                        className={cn(
                          "rounded-full flex items-center justify-center h-10 w-10 bg-oxley-50 dark:bg-zinc-800 flex-shrink-0 drop-shadow-sm",
                          {
                            "bg-oxley-200": status === "done",
                            "bg-oxley-100": status === "in-progress"
                          }
                        )}
                      >
                        <span
                          aria-label="Done"
                          className="text-sm drop-shadow z-10"
                          role="img"
                        >
                          {icon ?? getStatusIcon(status)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight">
                        {title}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {description}
                      </p>
                    </div>
                  </div>

                  {index !== milestones.length - 1 ? (
                    <>
                      <Separator
                        orientation="vertical"
                        className="h-6 w-1.5 col-span-1 px-0.5 mx-4 bg-primary hidden md:block drop-shadow-sm"
                      />
                      <Separator
                        orientation="horizontal"
                        className={cn(
                          "bg-primary md:hidden opacity-50 my-8 col-start-2 col-span-3"
                        )}
                      />
                    </>
                  ) : null}
                </Fragment>
              )
            })}
          </div>
        </div>
        <Image
          src={terminalScreenshot}
          alt="example of commit message generated by coco"
          width={640}
          className="-mt-12 translate-x-1/4 hidden lg:block"
        />
      </div>
      <div className="mt-12">
        <p className="text-center font-extralight items-center px-4">
          feel free to suggest a roadmap item on{" "}
          <Link
            href="https://github.com/gfargo/coco/issues/new"
            className="text-primary hover:underline"
          >
            github
          </Link>
          , we love feedback!
        </p>
      </div>
    </Section>
  )
}
