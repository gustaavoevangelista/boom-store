import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = dictionaries[locale];
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 font-black text-4xl">{dictionary.checkout.title}</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.checkout.contact}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="email@example.com" type="email" />
            <Input placeholder="Name" />
            <CardTitle className="pt-2">{dictionary.checkout.shipping}</CardTitle>
            <Input placeholder="Address" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="City" />
              <Input placeholder="Country" />
            </div>
            <Textarea placeholder="Order notes" />
            <Button size="lg">{dictionary.checkout.placeOrder}</Button>
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardContent className="p-6">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-md bg-secondary">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <p className="font-semibold">{dictionary.checkout.paymentSoon}</p>
            <p className="mt-2 text-muted-foreground text-sm">
              This page is the Stripe-ready checkout shell. No payment is charged in v1.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
