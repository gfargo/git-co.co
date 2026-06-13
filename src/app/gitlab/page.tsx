import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GitMerge, Bot, Terminal, Server, ShieldCheck } from "lucide-react"

import { CopyCommand } from "@/components/CopyCommand"
import { MediaFrame } from "@/components/MediaFrame"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { siteConfig } from "@/config/site"

const pageUrl = `${siteConfig.url}/gitlab`

export const metadata: Metadata = {
  title: "AI Git for GitLab — Commits, Code Review & MR Triage in Your Terminal",
  description:
    "git-coco brings AI commits, code review, and merge-request triage to GitLab — not just GitHub. It detects your remote, drives glab, and runs the full terminal workstation against GitLab and GitLab self-managed.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: siteConfig.name,
    title: "AI Git for GitLab — Commits, Review & MR Triage in Your Terminal",
    description:
      "Most AI commit tools are GitHub-only. git-coco treats GitLab as a first-class forge: AI MR descriptions, MR/issue triage, and every per-row action in a keyboard-driven TUI.",
    images: [{ url: siteConfig.ogImage, width: 1280, height: 640, alt: "git-coco for GitLab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Git for GitLab — git-coco",
    description:
      "AI commits, review, and merge-request triage for GitLab and GitLab self-managed, in your terminal.",
    images: [siteConfig.ogImage],
  },
}

const features = [
  {
    icon: GitMerge,
    title: "Merge-request triage in your terminal",
    body: "Browse, filter, and act on MRs without a browser tab. The inspector shows description, discussion, approvals, and pipeline status. Merge, approve, close, comment, label, and assign — every per-row action, on GitLab.",
  },
  {
    icon: Bot,
    title: "AI merge-request descriptions",
    body: "`coco pr create` generates an MR title and body from your branch diff and opens it with glab — the same compose flow you'd use on GitHub, pointed at GitLab.",
  },
  {
    icon: Terminal,
    title: "Same commands, same keys",
    body: "`coco prs` and `coco issues` list GitLab MRs and issues with the same filters and `--json` as the GitHub path. git-coco detects the forge from your remote and routes to glab automatically.",
  },
  {
    icon: Server,
    title: "Self-managed & vanity hosts",
    body: "GitLab self-managed works out of the box; the auth probe is scoped to your instance's host. Map a vanity hostname (git.acme.com) explicitly with the forgeHosts config.",
  },
  {
    icon: ShieldCheck,
    title: "GitHub Enterprise too",
    body: "git-coco detects the remote host instead of assuming github.com, so GitHub Enterprise remotes work with no configuration — the same workstation, the same actions.",
  },
  {
    icon: Bot,
    title: "Your model, your machine",
    body: "Seven providers including fully local Ollama — no code leaves your machine, no API bill. Dynamic routing picks a fast model for commits and a thorough one for reviews.",
  },
]

export default function GitLabPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-28">
        <div className="container px-4 md:px-6">
          <span className="mb-3 block font-mono text-sm tracking-wide text-terminal-green">
            ~/coco $ prs --gitlab
          </span>
          <h1 className="max-w-4xl font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            The AI git workstation for GitLab.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Most AI commit tools stop at GitHub. <strong className="text-foreground">git-coco</strong>{" "}
            treats GitLab as a first-class forge — AI commits and merge-request
            descriptions, plus full MR and issue triage in a keyboard-driven
            terminal. It detects your remote and drives{" "}
            <code className="font-mono text-foreground">glab</code> for you.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CopyCommand command="npx git-coco@latest init" />
            <Link
              href="/compare"
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Compare to OpenCommit &amp; aicommits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground/70">
            GitLab support needs{" "}
            <a
              href="https://gitlab.com/gitlab-org/cli"
              className="underline underline-offset-2 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              glab
            </a>{" "}
            installed and authenticated (<code>glab auth login</code>).
          </p>
        </div>
      </Section>

      {/* MR triage proof */}
      <Section variant="gradient">
        <div className="container px-4 md:px-6">
          <SectionHeader
            prompt="~/coco — coco ui"
            title="Merge requests, triaged in your terminal"
            subtitle="Draft, pipeline, and approval state with a live inspector — the same view, the same keys you'd use on GitHub."
          />
          <div className="relative mx-auto max-w-4xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-terminal-green/5 blur-3xl"
            />
            <div className="overflow-hidden rounded-xl border border-border/40 shadow-2xl shadow-black/40 ring-1 ring-black/20">
              <div className="flex items-center gap-2 border-b border-border/30 bg-[hsl(150_20%_8%)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
                  ~/coco — coco ui (GitLab)
                </span>
              </div>
              <MediaFrame
                kind="gif"
                src="/screenshots/gitlab-mr-triage.gif"
                alt="coco ui GitLab merge-request triage — browsing merge requests with a live inspector showing pipeline checks, approvals, and comments"
                width={1463}
                height={689}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Feature grid */}
      <Section>
        <div className="container px-4 md:px-6">
          <SectionHeader
            prompt="~/coco $ features"
            title="Everything that works on GitHub, works on GitLab"
            subtitle="One host-agnostic provider layer. git-coco maps GitLab's REST API to the same view models and routes every action through a provider-keyed forge adapter."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-border/40 bg-bg-elevated/40 p-6 transition-colors hover:border-terminal-green/40"
              >
                <Icon className="h-6 w-6 text-terminal-green" aria-hidden="true" />
                <h3 className="mt-4 font-mono text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="gradient">
        <div className="container px-4 text-center md:px-6">
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Point it at your GitLab repo.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Install, authenticate <code className="font-mono">glab</code>, and run{" "}
            <code className="font-mono">coco</code> inside any GitLab repo.
          </p>
          <div className="mt-8 flex justify-center">
            <CopyCommand command="npx git-coco@latest init" />
          </div>
          <div className="mt-6 flex justify-center gap-6 font-mono text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground">
              Docs
            </Link>
            <Link href="/workstation" className="text-muted-foreground hover:text-foreground">
              Workstation
            </Link>
            <a
              href={siteConfig.links.github}
              className="text-muted-foreground hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
