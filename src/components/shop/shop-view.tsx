"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Dictionary, Locale } from "@/config/i18n";
import type { Product, ProductType } from "@/types/product";

export function ShopView({
  products,
  locale,
  dictionary,
  initialType,
}: {
  products: Product[];
  locale: Locale;
  dictionary: Dictionary;
  initialType?: ProductType;
}) {
  const [type, setType] = useState<ProductType | "all">(initialType ?? "all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const list = type === "all" ? products : products.filter((product) => product.type === type);
    return [...list].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return a.id.localeCompare(b.id);
    });
  }, [products, sort, type]);

  const filters = (
    <div className="grid gap-3">
      {[
        ["all", dictionary.shop.all],
        ["t-shirt", dictionary.nav.tshirts],
        ["print", dictionary.nav.prints],
      ].map(([value, label]) => (
        <Button
          className="justify-start"
          variant={type === value ? "default" : "outline"}
          onClick={() => setType(value as ProductType | "all")}
          key={value}
        >
          {label}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <Reveal className="hidden lg:block">
        <aside>
          <p className="mb-3 font-semibold">{dictionary.shop.filters}</p>
          {filters}
        </aside>
      </Reveal>
      <div>
        <Reveal className="mb-5 flex items-center justify-between gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden transition-transform duration-200 hover:scale-[1.02]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {dictionary.shop.filters}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="mb-2 text-xl font-bold">{dictionary.shop.filters}</SheetTitle>
              <SheetDescription className="mb-5">
                {dictionary.shop.filtersDescription}
              </SheetDescription>
              {filters}
            </SheetContent>
          </Sheet>
          <div className="ml-auto w-44">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger aria-label={dictionary.shop.sort}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{dictionary.shop.newest}</SelectItem>
                <SelectItem value="price-low">{dictionary.shop.priceLow}</SelectItem>
                <SelectItem value="price-high">{dictionary.shop.priceHigh}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Reveal>
        {filtered.length > 0 ? (
          <Reveal delay={0.05}>
            <ProductGrid products={filtered} locale={locale} dictionary={dictionary} />
          </Reveal>
        ) : (
          <p className="rounded-lg border p-8 text-center text-muted-foreground">
            {dictionary.shop.empty}
          </p>
        )}
      </div>
    </div>
  );
}
