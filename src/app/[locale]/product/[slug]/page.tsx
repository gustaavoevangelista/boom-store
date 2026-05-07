import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { ProductGrid } from "@/components/product-grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProduct, products } from "@/lib/catalog";
import { dictionaries, isLocale } from "@/lib/i18n";
import { formatMoney } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const product = getProduct(slug);
  if (!product) notFound();
  const dictionary = dictionaries[locale];
  const copy = product.copy[locale];
  const related = products
    .filter((item) => item.id !== product.id && item.type === product.type)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
          <Image src={product.images[0]} alt={copy.name} fill className="object-cover" priority />
        </div>
        <div className="space-y-6">
          {product.badge ? (
            <Badge>
              {product.badge === "sale" ? dictionary.common.sale : dictionary.common.new}
            </Badge>
          ) : null}
          <div>
            <h1 className="font-black text-4xl">{copy.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{copy.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl">{formatMoney(product.price, locale)}</span>
            {product.compareAt ? (
              <span className="text-muted-foreground line-through">
                {formatMoney(product.compareAt, locale)}
              </span>
            ) : null}
          </div>
          <AddToCartPanel product={product} dictionary={dictionary} />
          <Separator />
          <Accordion type="single" collapsible defaultValue="details">
            <AccordionItem value="details">
              <AccordionTrigger>{dictionary.product.details}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {copy.details}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>{dictionary.product.shipping}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                EU-wide shipping is planned. Final delivery rates and return copy must be confirmed
                before production.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>{dictionary.product.care}</AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {copy.care}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {related.length > 0 ? (
        <div className="mt-14">
          <h2 className="mb-6 font-black text-3xl">{dictionary.product.related}</h2>
          <ProductGrid products={related} locale={locale} dictionary={dictionary} />
        </div>
      ) : null}
    </section>
  );
}
