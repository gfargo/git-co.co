"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import copy from 'copy-to-clipboard';

import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command: string;
  className?: string;
};

export const CopyCommand = ({ command, className }: CopyCommandProps) => {
  const handleCopy = () => {
    console.log("copying", command);
    const result = copy(command);
    console.log("result", result);
  };
  return (
    <div
      className={cn(
        "relative inline-flex min-w-[32rem] p-4 bg-secondary rounded text-white shadow-lg transition-shadow duration-300",
        className,
      )}
    >
      <code className="block">{command}</code>

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
        <DropdownMenuContent className="p-1 ">
          <DropdownMenuItem onClick={handleCopy}>npm</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>yarn</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
