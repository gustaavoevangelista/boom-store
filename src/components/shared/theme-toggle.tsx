"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({
  label,
  options,
}: {
  label: string;
  options: { light: string; dark: string; system: string };
}) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const effectiveTheme = resolvedTheme ?? theme;

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label={label}>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={label}>
          {effectiveTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2" onSelect={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span className="flex-1">{options.light}</span>
          {theme === "light" ? <Check className="h-4 w-4" /> : null}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onSelect={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span className="flex-1">{options.dark}</span>
          {theme === "dark" ? <Check className="h-4 w-4" /> : null}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" onSelect={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span className="flex-1">{options.system}</span>
          {theme === "system" ? <Check className="h-4 w-4" /> : null}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
