"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Dictionary, Locale } from "@/config/i18n";
import { useCart } from "@/hooks/use-cart";
import { cn, formatMoney } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  locale,
  dictionary,
}: {
  product: Product;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const cart = useCart();
  const copy = product.copy[locale];
  const availableVariant = product.variants.find((variant) => variant.stock > 0);

  return (
    <Card className="group overflow-hidden">
      <Link href={`/${locale}/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <Image
            src={product.images[0]}
            alt={copy.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.badge ? (
            <Badge className="absolute left-3 top-3 bg-background text-foreground">
              {product.badge === "sale" ? dictionary.common.sale : dictionary.common.new}
            </Badge>
          ) : null}
        </div>
      </Link>
      <CardContent className="space-y-3">
        <div className="flex gap-3">
          <div className="min-w-0 flex-1">
            <Link
              href={`/${locale}/product/${product.slug}`}
              className="font-semibold hover:text-primary"
            >
              {copy.name}
            </Link>
            <p className="truncate text-muted-foreground text-sm">{copy.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={dictionary.product.favorite}
            onClick={() => cart.toggleFavorite(product.id)}
          >
            <Heart
              className={cn("h-5 w-5", cart.isFavorite(product.id) && "fill-primary text-primary")}
            />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">{formatMoney(product.price, locale)}</span>
            {product.compareAt ? (
              <span className="text-muted-foreground text-sm line-through">
                {formatMoney(product.compareAt, locale)}
              </span>
            ) : null}
          </div>
          {product.type === "t-shirt" ? (
            <Button asChild size="sm">
              <Link href={`/${locale}/product/${product.slug}`}>
                {dictionary.product.chooseVariant}
              </Link>
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={!availableVariant}
              onClick={() =>
                availableVariant &&
                cart.addLine({
                  productId: product.id,
                  variantId: availableVariant.id,
                  quantity: 1,
                })
              }
            >
              {dictionary.product.add}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
