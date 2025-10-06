"use client"

import { CopyIcon } from "@radix-ui/react-icons"
import copy from "copy-to-clipboard"
import { track } from "@vercel/analytics/react"

import { Button } from "../ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "../ui/use-toast"
import { MagnetIcon, ShellIcon } from "lucide-react"

type CopyCommandProps = {
  command: string
  className?: string
}

type PackageService = "npm" | "yarn" | "pnpm"

export const CopyCommand = ({ command, className }: CopyCommandProps) => {
  const handleCopy = (service: PackageService) => {
    let copiedCommand = ""
    switch (service) {
      case "yarn":
        copiedCommand = command.replace("npx", "yarn dlx")
        break
      case "pnpm":
        copiedCommand = command.replace("npx", "pnpm dlx")
        break
      case "npm":
      default:
        copiedCommand = command
        break
    }

    const result = copy(copiedCommand)

    if (result) {
      track("Copy Command", {
        service: service,
        command: copiedCommand
      })

      // Track as a conversion event (install intent)
      track("Install Intent", {
        method: "copy-command",
        packageManager: service,
        command: copiedCommand
      })
    }

    toast({
      title: "Copied to clipboard 📋",
      description: result ? (
        <div className="flex items-center mt-1">
          <ShellIcon className="w-4 h-4 mr-2 text-muted-foreground/75" />
          <code className="truncate overflow-ellipsis whitespace-nowrap">
            {copiedCommand}
          </code>
        </div>
      ) : (
        "Failed to copy to clipboard"
      )
    })
  }
  return (
    <div
      className={cn(
        "relative flex w-96 p-4 pr-16 md:w-auto lg:min-w-[396px] lg:max-w-md bg-secondary rounded text-white shadow hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <code className="inline-block truncate max-w-full">{command}</code>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <CopyIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1">
          <DropdownMenuItem onClick={() => handleCopy("npm")}>
            npm
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy("pnpm")}>
            pnpm
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy("yarn")}>
            yarn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
