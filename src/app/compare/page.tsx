import { Metadata } from "next"
import Link from "next/link"
import { Check, Minus } from "lucide-react"

import { CopyCommand } from "@/components/CopyCommand"
import { Section } from "@/components/Section"
import { SectionHeader } from "@/components/SectionHeader"
import { siteConfig } from "@/config/site"

const pageUrl = `${siteConfig.url}/compare`

export const metadata: Metadata = {
  title: "git-coco vs OpenCommit vs aicommits — AI Git Tools Compared",
  description:
    "An honest comparison of git-coco, OpenCommit, and aicommits. All three write AI commit messages; git-coco adds changelogs, code review, PR/MR creation, a terminal workstation, and first-class GitLab support.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    title: "git-coco vs OpenCommit vs aicommits",
    description:
      "AI commit messages are table stakes. See how git-coco compares on changelogs, review, PR/MR creation, the workstation TUI, and GitLab support.",
    images: [{ url: siteConfig.ogImage, width: 1280, height: 640, alt: "git-coco compared" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "git-coco vs OpenCommit vs aicommits",
    description: "An honest comparison of the popular AI git commit tools.",
    images: [siteConfig.ogImage],
  },
}

type Cell = boolean | string

const columns = ["git-coco", "OpenCommit", "aicommits"] as const

const rows: { feature: string; values: [Cell, Cell, Cell]; note?: string }[] = [
  { feature: "AI commit messages", values: [true, true, true] },
  { feature: "Conventional Commits", values: [true, true, "via flag"] },
  { feature: "commitlint validation + retry", values: [true, false, false] },
  {
    feature: "Local models (Ollama)",
    values: [true, true, false],
    note: "aicommits is OpenAI-oriented; its sibling aicommit2 adds Ollama.",
  },
  { feature: "Multiple AI providers", values: ["7", "several", "limited"] },
  { feature: "Changelog generation", values: [true, false, false] },
  { feature: "AI code review (CI-gateable)", values: [true, false, false] },
  { feature: "Commit splitting", values: [true, false, false] },
  { feature: "PR / MR creation from diff", values: [true, false, false] },
  { feature: "Terminal workstation (TUI)", values: [true, false, false] },
  { feature: "GitLab / GitHub Enterprise triage", values: [true, false, false] },
  { feature: "Open source (MIT)", values: [true, true, true] },
]

function renderCell(value: Cell) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-terminal-green" aria-label="yes" />
  if (value === false)
    return <Minus className="mx-auto h-5 w-5 text-muted-foreground/40" aria-label="no" />
  return <span className="text-sm text-foreground">{value}</span>
}

const pickEach = [
  {
    name: "aicommits",
    when: "You want the absolute simplest thing: a tiny, focused CLI / git hook that writes a commit message and nothing else. Minimalism is the point.",
  },
  {
    name: "OpenCommit",
    when: "You want a popular, well-supported commit-message tool with emoji and a GitHub Action, and you live on GitHub. It does its one job well.",
  },
  {
    name: "git-coco",
    when: "You want AI across the whole workflow — commits, changelogs, review, PR/MR — in one tool, a keyboard-driven workstation to run it from, and/or you're on GitLab or GitHub Enterprise. Breadth and multi-forge are the point.",
    highlight: true,
  },
]

export default function ComparePage() {
  return (
    <>
      <Section className="pt-20 md:pt-28">
        <div className="container px-4 md:px-6">
          <span className="mb-3 block font-mono text-sm tracking-wide text-terminal-green">
            ~/coco $ compare
          </span>
          <h1 className="max-w-3xl font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            git-coco vs OpenCommit vs aicommits
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            All three write your commit messages with AI — and they&apos;re good at
            it. That part is table stakes now. The real question is what you want
            <em> around</em> the commit. OpenCommit and aicommits are focused,
            single-purpose tools. <strong className="text-foreground">git-coco</strong>{" "}
            is an AI git <em>toolbelt</em>: commits, changelogs, review, and PR/MR
            creation, in a terminal workstation that works on GitHub and GitLab.
          </p>
        </div>
      </Section>

      <Section variant="gradient">
        <div className="container px-4 md:px-6">
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/40 bg-bg-elevated/50">
                  <th className="px-4 py-4 font-mono text-sm font-semibold text-foreground">
                    Capability
                  </th>
                  {columns.map((c) => (
                    <th
                      key={c}
                      className={
                        "px-4 py-4 text-center font-mono text-sm font-semibold " +
                        (c === "git-coco" ? "text-terminal-green" : "text-muted-foreground")
                      }
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/20 last:border-0 hover:bg-foreground/[0.02]"
                  >
                    <td className="px-4 py-3 align-top text-sm text-foreground">
                      {row.feature}
                      {row.note && (
                        <span className="mt-0.5 block text-xs text-muted-foreground/70">
                          {row.note}
                        </span>
                      )}
                    </td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={
                          "px-4 py-3 text-center align-top " +
                          (i === 0 ? "bg-terminal-green/[0.04]" : "")
                        }
                      >
                        {renderCell(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/70">
            Comparison reflects each tool&apos;s primary, documented CLI as of June 2026.
            Tools evolve quickly — corrections welcome via{" "}
            <a
              href={siteConfig.links.issues}
              className="underline underline-offset-2 hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              an issue
            </a>
            .
          </p>
        </div>
      </Section>

      <Section>
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Which should you pick?"
            subtitle="They aim at different things. Here's the honest version."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pickEach.map(({ name, when, highlight }) => (
              <div
                key={name}
                className={
                  "rounded-xl border p-6 " +
                  (highlight
                    ? "border-terminal-green/40 bg-terminal-green/[0.05]"
                    : "border-border/40 bg-bg-elevated/40")
                }
              >
                <h3 className="font-mono text-base font-semibold text-foreground">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{when}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="gradient">
        <div className="container px-4 text-center md:px-6">
          <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Try the toolbelt.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            One command installs and configures everything — pick a provider
            (including local Ollama) and go.
          </p>
          <div className="mt-8 flex justify-center">
            <CopyCommand command="npx git-coco@latest init" />
          </div>
          <div className="mt-6 flex justify-center gap-6 font-mono text-sm">
            <Link href="/gitlab" className="text-muted-foreground hover:text-foreground">
              On GitLab?
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-foreground">
              Docs
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
