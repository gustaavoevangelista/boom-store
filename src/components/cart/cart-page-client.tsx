"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Dictionary, Locale } from "@/config/i18n";
import { useCart } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/utils";
import { products } from "@/services/catalog";

export function CartPageClient({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const cart = useCart();
  return (
    <PageHeader title={dictionary.cart.title}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.lines.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">{dictionary.cart.empty}</p>
                <Button asChild className="mt-4">
                  <Link href={`/${locale}/shop`}>{dictionary.cart.continue}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}
          {cart.lines.map((line) => {
            const product = products.find((item) => item.id === line.productId);
            const variant = product?.variants.find((item) => item.id === line.variantId);
            if (!product || !variant) return null;
            return (
              <Card key={line.variantId}>
                <CardContent className="flex gap-4 p-4">
                  <div className="grid h-24 w-24 place-items-center rounded-md bg-secondary font-black">
                    BOOM
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{product.copy[locale].name}</p>
                    <p className="text-muted-foreground text-sm">
                      {[variant.size, variant.color].filter(Boolean).join(" / ")}
                    </p>
                    <p className="mt-2 font-bold">{formatMoney(product.price, locale)}</p>
                  </div>
                  <div className="flex items-center gap-2 self-end">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={dictionary.cart.decreaseQuantity}
                      onClick={() => cart.updateQuantity(line.variantId, line.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{line.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={dictionary.cart.increaseQuantity}
                      onClick={() => cart.updateQuantity(line.variantId, line.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={dictionary.cart.remove}
                      onClick={() => cart.removeLine(line.variantId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Card className="h-fit">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between font-semibold">
              <span>{dictionary.cart.subtotal}</span>
              <span>{formatMoney(cart.total, locale)}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Shipping, VAT, and payment are finalized in the Stripe-ready checkout boundary.
            </p>
            <Separator />
            {cart.lines.length === 0 ? (
              <Button className="w-full" size="lg" disabled>
                {dictionary.cart.checkout}
              </Button>
            ) : (
              <Button asChild className="w-full" size="lg">
                <Link href={`/${locale}/checkout`}>{dictionary.cart.checkout}</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </PageHeader>
  );
}
