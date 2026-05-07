"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

export const NavigationMenu = NavigationMenuPrimitive.Root;
export const NavigationMenuList = NavigationMenuPrimitive.List;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export function navigationMenuLinkClassName(className?: string) {
  return cn("rounded-md px-3 py-2 text-sm font-medium hover:bg-accent", className);
}
