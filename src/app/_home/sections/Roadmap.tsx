import { Section } from "@/components/Section";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type milestone = {
  title: string;
  description: string;
  status: "done" | "in-progress" | "pending" | "planned";
  icon: string;
};

export const RoadmapSection = () => {
  const milestones = [
    {
      title: "commit staged work",
      description:
        "generate commit message for staged files with a single command.",
      status: "done",
      icon: "💡",
    },
    {
      title: "interactive v.s. stdout mode",
      description:
        "interactively commit staged work or output commit to stdout.",
      status: "done",
      icon: "🎨",
    },
    {
      title: "commit all the files!",
      description:
        "support any number of staged changes through recursive summarization.",
      status: "done",
      icon: "🚛",
    },
    {
      title: "langchain",
      description:
        "better future interop with additional LLMs through langchain.",
      status: "done",
      icon: "🦜",
    },
    {
      title: "changelog generation",
      description:
        "generate changelogs from current branch, or provided range of commits.",
      status: "in-progress",
      icon: "📝",
    },
    {
      title: "coco init",
      description: "interactive setup for coco for a project or on a system.",
      status: "in-progress",
      icon: "🏗️",
    },
    {
      title: "commitlint & commitizen",
      description:
        "add support for linting generated content via pre-existing tools.",
      status: "planned",
    },
    {
      title: "conventional commits",
      description:
        "generate commit messages that follow the rules of conventional commits.",
      status: "planned",
    },
  ] as milestone[];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return "🎉";
      case "in-progress":
        return "🔨";
      case "pending":
        return "⏳";
      case "planned":
      default:
        return "💭";
    }
  };

  return (
    <Section id="roadmap" className="bg-white text-black lg:pb-12">
      <div className="w-full max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center text-primary">
          roadmap
        </h2>

        <div className="grid grid-cols-6 space-y-2 px-4">
          {milestones.map(({ description, status, title, icon }, index) => {
            return (
              <>
                <div className="col-span-6 flex items-center space-x-4">
                  <div className={cn("rounded-full h-10 w-10 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 drop-shadow-sm", {
                    'bg-oxley-100': status === 'done',
                  })}>
                    <span aria-label="Done" className="text-sm drop-shadow" role="img">
                      {icon ?? getStatusIcon(status)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">{title}</h3>
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
                        "bg-primary md:hidden opacity-50 my-8 col-start-2 col-span-3",
                      )}
                    />
                  </>
                ) : null}
              </>
            );
          })}
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
      </div>
    </Section>
  );
};
