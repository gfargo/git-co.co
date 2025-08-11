# Gemini Project Documentation

This document provides an overview of the `git-coco-www` project, its structure, and key components to guide future development and interaction.

## Project Overview

`git-coco-www` is a Next.js-based website that serves as a landing page for a project called "coco". The website is a single-page application with multiple sections that highlight the features, community, and roadmap of "coco".

## About the "coco" CLI tool

"coco" is a multi-facetted git assistant designed to expedite any developer's git workflow. It can generate commit messages, create changelogs, summarize code changes, perform code reviews, and more.

### Key Features

-   **Commit Message Generation**: Automatically generates commit messages from staged changes.
-   **Changelog Creation**: Creates changelogs for the current branch or a range of commits.
-   **Code Summarization**: Summarizes changes from the working-tree, or for various time ranges (yesterday, last week, etc.).
-   **Code Review**: Performs a code review on the changes in the working directory.
-   **Interactive Setup**: A step-by-step wizard to set up coco globally or for a project.

### Commands

-   `commit`: generates commit messages based on staged changes.
-   `changelog`: create changelogs for the current branch or a range of commits.
-   `recap`: summarize changes from working-tree, or yesterday, or in the last month, or since the last tag.
-   `review`: perform a code review on the changes in the working directory.
-   `init`: step by step wizard to set up coco globally or for a project.
-   `help`: display help for coco commands.

## Folder Structure

Here is a breakdown of the key directories and files in this project:

-   **/src/app**: This is the main directory for the Next.js application.
    -   **/src/app/layout.tsx**: The root layout of the application.
    -   **/src/app/page.tsx**: The main page of the application.
    -   **/src/app/_home/sections**: This directory contains the different sections of the homepage.
        -   `Community.tsx`: Section for community links.
        -   `Faq.tsx`: Frequently Asked Questions section.
        -   `Features.tsx`: "coco" features section.
        -   `Feedback.tsx`: User feedback section.
        -   `Hero.tsx`: The hero section of the landing page.
        -   `Install.tsx`: Installation instructions section.
        -   `Roadmap.tsx`: Project roadmap section.
-   **/src/components**: This directory contains reusable components used throughout the application.
    -   **/src/components/ui**: UI components like buttons, inputs, etc.
    -   **/src/components/Header**: The header of the website.
    -   **/src/components/Footer**: The footer of the website.
    -   **/src/components/Section**: A reusable component for creating sections.
    -   **/src/components/ThreeJSBackground.tsx**: A 3D background component.
-   **/public**: This directory contains static assets like images and icons.
-   **/src/styles**: This directory contains global styles for the application.

## Development

To run the project in a development environment, use the following command:

```bash
npm run dev
```