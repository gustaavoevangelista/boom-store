"use client";

import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/store/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function AddToCartPanel({
  product,
  dictionary,
}: {
  product: Product;
  dictionary: Dictionary;
}) {
  const cart = useCart();
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [color, setColor] = useState(product.colors?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(
    () =>
      product.variants.find(
        (item) => (!item.size || item.size === size) && (!item.color || item.color === color),
      ),
    [color, product.variants, size],
  );

  return (
    <div className="space-y-4">
      {product.sizes ? (
        <div className="grid gap-2">
          <span className="font-semibold text-sm">{dictionary.product.size}</span>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger aria-label={dictionary.product.size}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
      {product.colors ? (
        <div className="grid gap-2">
          <span className="font-semibold text-sm">{dictionary.product.color}</span>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger aria-label={dictionary.product.color}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.colors.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
      <div className="grid gap-2">
        <span className="font-semibold text-sm">{dictionary.product.quantity}</span>
        <Select value={String(quantity)} onValueChange={(value) => setQuantity(Number(value))}>
          <SelectTrigger aria-label={dictionary.product.quantity}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((item) => (
              <SelectItem value={String(item)} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3">
        <Button
          className="flex-1"
          size="lg"
          disabled={!variant || variant.stock < 1}
          onClick={() =>
            variant && cart.addLine({ productId: product.id, variantId: variant.id, quantity })
          }
        >
          {variant?.stock === 0 ? dictionary.common.soldOut : dictionary.common.addToCart}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={() => cart.toggleFavorite(product.id)}
        >
          <Heart
            className={cn("h-5 w-5", cart.isFavorite(product.id) && "fill-primary text-primary")}
          />
        </Button>
      </div>
    </div>
  );
}
