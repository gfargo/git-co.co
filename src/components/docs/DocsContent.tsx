"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { processMarkdown, type WikiPage } from "@/lib/wiki"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"

interface DocsContentProps {
  content: string
  page: WikiPage
  className?: string
}

export function DocsContent({ content, page, className }: DocsContentProps) {
  const processedContent = processMarkdown(content)

  return (
    <article
      className={cn("prose prose-slate dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4 text-foreground border-b pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3 text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold tracking-tight mt-6 mb-2 text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-7 text-muted-foreground mb-4">{children}</p>
          ),
          a: ({ href, children }) => {
            if (!href) {
              return <span>{children}</span>
            }

            const isExternal = href.startsWith("http")
            const isInternal = href.startsWith("/docs")

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-oxley-600 dark:text-oxley-400 hover:text-oxley-700 dark:hover:text-oxley-300 underline underline-offset-4"
                >
                  {children}
                </Link>
              )
            }

            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-oxley-600 dark:text-oxley-400 hover:text-oxley-700 dark:hover:text-oxley-300 underline underline-offset-4 inline-flex items-center gap-1"
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3" />}
              </a>
            )
          },
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc text-muted-foreground [&>li]:mt-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal text-muted-foreground [&>li]:mt-2">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-4 border-oxley-300 dark:border-oxley-700 pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          table: ({ children }) => (
            <div className="my-6 w-full overflow-auto">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2 text-muted-foreground">
              {children}
            </td>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match

            if (isInline) {
              return (
                <code
                  className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock language={match[1] || "text"}>
                {String(children).replace(/\n$/, "")}
              </CodeBlock>
            )
          },
          pre: ({ children }) => <>{children}</>,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              className="rounded-lg border my-6 max-w-full"
            />
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  )
}

function CodeBlock({
  language,
  children,
}: {
  language: string
  children: string
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 group">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
        }}
        showLineNumbers={children.split("\n").length > 3}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
