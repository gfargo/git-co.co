import { Section } from "@/components/Section"
import {
  GitCommitHorizontalIcon,
  ScrollTextIcon,
  CalendarClockIcon,
  ClipboardCheckIcon,
  SettingsIcon,
  TerminalIcon
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const CommandsSection = () => {
  return (
    <Section id="commands" className="bg-white text-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-primary mb-4">
            command reference
          </h2>
          <p className="text-center text-lg text-gray-600 max-w-2xl">
            Complete documentation for all coco commands and their options
          </p>
        </div>

        <Tabs defaultValue="commit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="commit" className="text-xs sm:text-sm">
              <GitCommitHorizontalIcon className="w-4 h-4 mr-1" />
              commit
            </TabsTrigger>
            <TabsTrigger value="changelog" className="text-xs sm:text-sm">
              <ScrollTextIcon className="w-4 h-4 mr-1" />
              changelog
            </TabsTrigger>
            <TabsTrigger value="recap" className="text-xs sm:text-sm">
              <CalendarClockIcon className="w-4 h-4 mr-1" />
              recap
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs sm:text-sm">
              <ClipboardCheckIcon className="w-4 h-4 mr-1" />
              review
            </TabsTrigger>
            <TabsTrigger value="init" className="text-xs sm:text-sm">
              <SettingsIcon className="w-4 h-4 mr-1" />
              init
            </TabsTrigger>
            <TabsTrigger value="global" className="text-xs sm:text-sm">
              <TerminalIcon className="w-4 h-4 mr-1" />
              global
            </TabsTrigger>
          </TabsList>

          {/* COMMIT COMMAND */}
          <TabsContent value="commit" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <GitCommitHorizontalIcon className="inline mr-2" />
                coco commit
              </h3>
              <p className="text-gray-600 mb-4">
                Generate intelligent commit messages from staged changes with
                optional Conventional Commits support and automatic commitlint
                validation.
              </p>
              <div className="bg-secondary rounded p-3 mb-4 font-mono text-sm text-white">
                <div>coco</div>
                <div className="text-gray-400"># or</div>
                <div>coco commit</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Basic Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-i, --interactive</code>
                    <p className="text-gray-600 mt-1">
                      Open editor for review and editing
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--verbose</code>
                    <p className="text-gray-600 mt-1">
                      Show detailed processing information
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-s, --stage-all</code>
                    <p className="text-gray-600 mt-1">
                      Stage all changes and commit in one step
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  Commit Enhancement Options
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--append [text]</code>
                    <p className="text-gray-600 mt-1">
                      Add content to end of commit message
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco --append &quot;Resolves #128&quot;
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-t, --append-ticket</code>
                    <p className="text-gray-600 mt-1">
                      Auto-append Jira/Linear ticket from branch
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      -a, --additional [context]
                    </code>
                    <p className="text-gray-600 mt-1">
                      Add extra context to guide generation
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">
                  Conventional Commits Options
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-c, --conventional</code>
                    <p className="text-gray-600 mt-1">
                      Force conventional commits mode
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --include-branch-name
                    </code>
                    <p className="text-gray-600 mt-1">
                      Include branch name in context (default)
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --no-include-branch-name
                    </code>
                    <p className="text-gray-600 mt-1">
                      Exclude branch name from context
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Processing Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      -p, --with-previous-commits [n]
                    </code>
                    <p className="text-gray-600 mt-1">
                      Include previous N commits for context
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--no-diff</code>
                    <p className="text-gray-600 mt-1">
                      Use basic git status (faster for large changes)
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--open-in-editor</code>
                    <p className="text-gray-600 mt-1">
                      Open message in editor before committing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CHANGELOG COMMAND */}
          <TabsContent value="changelog" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <ScrollTextIcon className="inline mr-2" />
                coco changelog
              </h3>
              <p className="text-gray-600 mb-4">
                Create detailed changelogs from commit history for any branch,
                commit range, or tag.
              </p>
              <div className="bg-secondary rounded p-3 mb-4 font-mono text-sm text-white">
                <div>coco changelog</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Range Selection</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-r, --range [range]</code>
                    <p className="text-gray-600 mt-1">
                      Specific commit range (HEAD refs or hashes)
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco changelog -r HEAD~5:HEAD
                    </code>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco changelog -r abc1234:def5678
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-b, --branch [name]</code>
                    <p className="text-gray-600 mt-1">
                      Compare against target branch
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco changelog -b main
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-t, --tag [name]</code>
                    <p className="text-gray-600 mt-1">
                      Compare against a specific tag
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco changelog -t 3.0.0
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--since-last-tag</code>
                    <p className="text-gray-600 mt-1">
                      All commits since last tag
                    </p>
                  </div>
                  <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-3">
                    <p className="text-xs text-amber-800 font-medium">
                      <strong>Note:</strong> --branch, --tag, and --since-last-tag cannot be combined in the same run.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Content Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--with-diff</code>
                    <p className="text-gray-600 mt-1">
                      Include diff for each commit in analysis
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--only-diff</code>
                    <p className="text-gray-600 mt-1">
                      Generate based only on branch diff
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--author</code>
                    <p className="text-gray-600 mt-1">
                      Include author attribution
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      -a, --additional [context]
                    </code>
                    <p className="text-gray-600 mt-1">
                      Add extra context to guide generation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* RECAP COMMAND */}
          <TabsContent value="recap" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <CalendarClockIcon className="inline mr-2" />
                coco recap
              </h3>
              <p className="text-gray-600 mb-4">
                Summarize your work from various time periods - perfect for
                standups and status reports.
              </p>
              <div className="bg-secondary rounded p-3 mb-4 font-mono text-sm text-white">
                <div>coco recap</div>
                <div className="text-gray-400"># Summarizes working directory</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Time Period Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--yesterday</code>
                    <p className="text-gray-600 mt-1">
                      Summarize yesterday&apos;s changes
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --last-week, --week
                    </code>
                    <p className="text-gray-600 mt-1">
                      Summarize last week&apos;s changes
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --last-month, --month
                    </code>
                    <p className="text-gray-600 mt-1">
                      Summarize last month&apos;s changes
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--last-tag, --tag</code>
                    <p className="text-gray-600 mt-1">
                      Changes since last git tag
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--current-branch</code>
                    <p className="text-gray-600 mt-1">
                      Summarize current branch changes
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Common Use Cases</h4>
                <div className="bg-secondary/5 rounded-lg p-4 space-y-2 text-sm font-mono">
                  <div className="text-gray-700">
                    <span className="text-primary">$</span> coco recap
                    --yesterday
                  </div>
                  <p className="text-xs text-gray-600 font-sans">
                    Perfect for daily standups
                  </p>
                  <div className="text-gray-700 mt-3">
                    <span className="text-primary">$</span> coco recap --week
                  </div>
                  <p className="text-xs text-gray-600 font-sans">
                    Great for weekly status reports
                  </p>
                  <div className="text-gray-700 mt-3">
                    <span className="text-primary">$</span> coco recap --tag
                  </div>
                  <p className="text-xs text-gray-600 font-sans">
                    Ideal for release notes
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* REVIEW COMMAND */}
          <TabsContent value="review" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <ClipboardCheckIcon className="inline mr-2" />
                coco review
              </h3>
              <p className="text-gray-600 mb-4">
                Get AI-powered code review feedback on your changes before
                committing.
              </p>
              <div className="bg-secondary rounded p-3 mb-4 font-mono text-sm text-white">
                <div>coco review</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-i, --interactive</code>
                    <p className="text-gray-600 mt-1">
                      Interactive review mode
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-b, --branch [name]</code>
                    <p className="text-gray-600 mt-1">Review specific branch</p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco review -b feature-branch
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">What Gets Reviewed</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Code quality and best practices
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Potential bugs and issues
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Performance considerations
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Security concerns
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Improvement suggestions
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* INIT COMMAND */}
          <TabsContent value="init" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <SettingsIcon className="inline mr-2" />
                coco init
              </h3>
              <p className="text-gray-600 mb-4">
                Interactive setup wizard to configure coco for your project or
                globally.
              </p>
              <div className="bg-secondary rounded p-3 mb-4 font-mono text-sm text-white">
                <div>coco init</div>
                <div className="text-gray-400"># Interactive wizard</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Configuration Scope</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--scope project</code>
                    <p className="text-gray-600 mt-1">
                      Configure for current project only
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco init --scope project
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--scope global</code>
                    <p className="text-gray-600 mt-1">
                      Configure globally for user
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco init --scope global
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">What Gets Configured</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    AI provider selection (OpenAI, Claude, Ollama)
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    API key setup
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Default model preferences
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Commit message format
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    File ignore patterns
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* GLOBAL OPTIONS */}
          <TabsContent value="global" className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                <TerminalIcon className="inline mr-2" />
                Global Options
              </h3>
              <p className="text-gray-600 mb-4">
                Options available across all coco commands.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Common Options</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">-i, --interactive</code>
                    <p className="text-gray-600 mt-1">
                      Enable interactive mode
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--verbose</code>
                    <p className="text-gray-600 mt-1">
                      Show detailed output
                    </p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">--help</code>
                    <p className="text-gray-600 mt-1">
                      Display help for command
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">File Filtering</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --ignored-files [pattern]
                    </code>
                    <p className="text-gray-600 mt-1">
                      Ignore specific files (repeatable)
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco --ignored-files &quot;*.lock&quot;
                    </code>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <code className="text-primary">
                      --ignored-extensions [ext]
                    </code>
                    <p className="text-gray-600 mt-1">
                      Ignore file extensions (repeatable)
                    </p>
                    <code className="text-xs text-gray-500 mt-1 block">
                      coco --ignored-extensions &quot;.map&quot;
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  )
}
