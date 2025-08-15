"use client"

import { HelpCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface HelpTooltipProps {
  content: string
  title?: string
  variant?: "info" | "help"
  side?: "top" | "right" | "bottom" | "left"
}

export function HelpTooltip({ content, title, variant = "help", side = "top" }: HelpTooltipProps) {
  const Icon = variant === "help" ? HelpCircle : Info

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground">
            <Icon className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          {title && <div className="font-medium mb-1">{title}</div>}
          <div className="text-sm">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
