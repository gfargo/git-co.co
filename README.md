# coco-www

This is the official website for the `coco` CLI tool, a multi-facetted git assistant designed to expedite any developer's git workflow.

## About coco

Spawned by the dream to automate away the tedium of writing commit messages, coco has grown into a multi-facetted git assistant to expedite any developer git workflow.

Currently coco generates commit messages, creates changelogs, summarizes code changes, perform code review, and more - with new features being added regularly!

### Commands

-   `commit`: generates commit messages based on staged changes.
-   `changelog`: create changelogs for the current branch or a range of commits.
-   `recap`: summarize changes from working-tree, or yesterday, or in the last month, or since the last tag.
-   `review`: perform a code review on the changes in the working directory.
-   `init`: step by step wizard to set up coco globally or for a project.
-   `help`: display help for coco commands.

## Development

This website is built with Next.js and Tailwind CSS. To run it locally, use the following commands:

```bash
npm install
npm run dev
```