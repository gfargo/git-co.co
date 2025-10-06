# coco-www

![coco banner image](https://repository-images.githubusercontent.com/663130268/2fc2b7a1-2626-4f9a-9938-a5b410db1b0e)

This is the official website for **coco**, an AI-powered git assistant that generates meaningful commit messages, creates changelogs, and streamlines your development workflow.

[![NPM Version](https://img.shields.io/npm/v/git-coco.svg)](https://www.npmjs.com/package/git-coco)
[![NPM Downloads](https://img.shields.io/npm/dt/git-coco.svg)](https://www.npmjs.com/package/git-coco)
[![GitHub issues](https://img.shields.io/github/issues/gfargo/coco)](https://github.com/gfargo/coco/issues)
[![Discord](https://img.shields.io/discord/1176716060825767948)](https://discord.gg/KGu9nE9Ejx)

## About Coco

Spawned by the dream to automate away the tedium of writing commit messages, coco has grown into a comprehensive git assistant designed to expedite any developer's workflow.

**✨ Key Features:**

- 🤖 **AI-Powered Commit Messages** - Generate contextual commits from staged changes
- 📋 **Conventional Commits** - Full support with automatic validation and formatting  
- 🔧 **Commitlint Integration** - Seamless integration with existing commitlint configuration
- 🏠 **Local AI Support** - Run completely offline with Ollama (no API costs, full privacy)
- 📦 **Package Manager Friendly** - Works with npm, yarn, and pnpm
- 👥 **Team Ready** - Shared configurations and enterprise deployment

### Quick Start

```bash
# Try without installing
npx git-coco@latest init

# Install globally  
npm install -g git-coco

# Generate your first commit
git add .
coco -i
```

### Commands

- **`coco commit`** - Generate commit messages from staged changes
- **`coco changelog`** - Create changelogs from commit history  
- **`coco recap`** - Summarize recent changes and activity
- **`coco review`** - AI-powered code review of your changes
- **`coco init`** - Interactive setup wizard

## Resources

### 📚 **[Complete Documentation - Coco Wiki](https://github.com/gfargo/coco/wiki)**

**Essential Guides:**

- **[Getting Started](https://github.com/gfargo/coco/wiki/Getting-Started)** - Complete beginner's guide
- **[Command Reference](https://github.com/gfargo/coco/wiki/Command-Reference)** - Detailed command options
- **[Configuration Overview](https://github.com/gfargo/coco/wiki/Config-Overview)** - All configuration options
- **[Team Collaboration](https://github.com/gfargo/coco/wiki/Team-Collaboration)** - Enterprise deployment

**Advanced Resources:**

- **[Using Ollama](https://github.com/gfargo/coco/wiki/Using-Ollama)** - Local AI setup for privacy
- **[Advanced Usage](https://github.com/gfargo/coco/wiki/Advanced-Usage)** - Custom prompts and automation
- **[Troubleshooting](https://github.com/gfargo/coco/wiki/Troubleshooting)** - Common issues and solutions

### 🆘 **Need Help?**

- **[GitHub Repository](https://github.com/gfargo/coco)** - Main project and source code
- **[GitHub Issues](https://github.com/gfargo/coco/issues)** - Bug reports and feature requests
- **[Discord Community](https://discord.gg/KGu9nE9Ejx)** - Real-time help and discussion

## Website Development

This website is built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** using the shadcn/ui component library.

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Code formatting
npm run format

# Linting
npm run lint
```

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **3D Graphics**: Three.js + React Three Fiber
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Optimized for Vercel

## Contributing

We welcome contributions to both the website and the main coco project!

- **Website Issues**: Report issues with this website in this repository
- **Coco CLI Issues**: Report CLI tool issues in the [main repository](https://github.com/gfargo/coco)
- **Documentation**: Help improve our [Wiki documentation](https://github.com/gfargo/coco/wiki)

## License

MIT © [gfargo](https://github.com/gfargo/)

---

<div align="center">
  <img src="https://coco.griffen.codes/mascott/mascott_d.png" width="200px">
  <p>Thanks for using <code>coco</code> ✨💜</p>
</div>
