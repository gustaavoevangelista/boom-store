import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/reveal";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { ProductGrid } from "@/components/product/product-grid";
import { PageHeader } from "@/components/shared/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Dictionary, Locale } from "@/config/i18n";
import { formatMoney } from "@/lib/utils";
import { getProduct, products } from "@/services/catalog";

export function ProductPage({
  slug,
  locale,
  dictionary,
}: {
  slug: string;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const product = getProduct(slug);
  if (!product) notFound();

  const copy = product.copy[locale];
  const related = products
    .filter((item) => item.id !== product.id && item.type === product.type)
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal distance={32}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
            <Image src={product.images[0]} alt={copy.name} fill className="object-cover" priority />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <PageHeader
            title={copy.name}
            description={copy.description}
            eyebrow={
              product.badge ? (
                <Badge>
                  {product.badge === "sale" ? dictionary.common.sale : dictionary.common.new}
                </Badge>
              ) : null
            }
            className="mx-0 max-w-none px-0 py-0"
          >
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="flex items-center gap-3">
                  <span className="font-black text-2xl">{formatMoney(product.price, locale)}</span>
                  {product.compareAt ? (
                    <span className="text-muted-foreground line-through">
                      {formatMoney(product.compareAt, locale)}
                    </span>
                  ) : null}
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <AddToCartPanel product={product} dictionary={dictionary} />
              </Reveal>
              <Reveal delay={0.2}>
                <Separator />
              </Reveal>
              <Reveal delay={0.25}>
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
                      {dictionary.product.shippingBody}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="care">
                    <AccordionTrigger>{dictionary.product.care}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      {copy.care}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Reveal>
            </div>
          </PageHeader>
        </Reveal>
      </div>
      {related.length > 0 ? (
        <div className="mt-14">
          <Reveal>
            <h2 className="mb-6 font-black text-3xl">{dictionary.product.related}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ProductGrid products={related} locale={locale} dictionary={dictionary} />
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
