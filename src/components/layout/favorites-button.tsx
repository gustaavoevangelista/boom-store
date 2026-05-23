"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/config/i18n";
import { useCart } from "@/hooks/use-cart";

export function FavoritesButton({ locale, label }: { locale: Locale; label: string }) {
  const cart = useCart();
  const hasFavourites = cart.favorites.length > 0;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      aria-label={label}
      className="transition-transform duration-200 hover:scale-105"
    >
      <Link href={`/${locale}/favorites`}>
        <Heart className={hasFavourites ? "h-5 w-5 fill-red-500 text-red-500" : "h-5 w-5"} />
      </Link>
    </Button>
  );
}
