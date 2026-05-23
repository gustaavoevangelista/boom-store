"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Dictionary, Locale } from "@/config/i18n";
import { useCart } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/utils";
import { products } from "@/services/catalog";

export function CartDrawer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const cart = useCart();
  const count = cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					aria-label={dictionary.nav.cart}
					className='relative transition-transform duration-200 hover:scale-105 '>
					<ShoppingBag className='h-5 w-5' />
					{count > 0 ? (
						<span className='-right-1 -top-1 absolute grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] text-primary-foreground'>
							{count}
						</span>
					) : null}
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col'>
				<SheetTitle className='pr-8 text-2xl font-bold'>
					{dictionary.cart.title}
				</SheetTitle>
				<SheetDescription>
					{dictionary.cart.drawerDescription}
				</SheetDescription>
				<div className='flex-1 space-y-4 overflow-auto py-6'>
					{cart.lines.length === 0 ? (
						<p className='text-muted-foreground'>
							{dictionary.cart.empty}
						</p>
					) : null}
					{cart.lines.map((line) => {
						const product = products.find(
							(item) => item.id === line.productId,
						);
						const variant = product?.variants.find(
							(item) => item.id === line.variantId,
						);
						if (!product || !variant) return null;
						return (
							<div className='flex gap-3' key={line.variantId}>
								<div className='grid h-20 w-20 place-items-center rounded-md bg-secondary text-xs font-bold'>
									BOOM
								</div>
								<div className='min-w-0 flex-1'>
									<p className='font-semibold'>
										{product.copy[locale].name}
									</p>
									<p className='text-muted-foreground text-sm'>
										{[variant.size, variant.color]
											.filter(Boolean)
											.join(' / ')}
									</p>
									<p className='mt-1 font-semibold'>
										{formatMoney(product.price, locale)}
									</p>
									<div className='mt-2 flex items-center gap-2'>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8'
											aria-label={
												dictionary.cart.decreaseQuantity
											}
											onClick={() =>
												cart.updateQuantity(
													line.variantId,
													line.quantity - 1,
												)
											}>
											<Minus className='h-3 w-3' />
										</Button>
										<span className='w-6 text-center text-sm'>
											{line.quantity}
										</span>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8'
											aria-label={
												dictionary.cart.increaseQuantity
											}
											onClick={() =>
												cart.updateQuantity(
													line.variantId,
													line.quantity + 1,
												)
											}>
											<Plus className='h-3 w-3' />
										</Button>
										<Button
											variant='ghost'
											size='icon'
											className='ml-auto h-8 w-8'
											onClick={() =>
												cart.removeLine(line.variantId)
											}
											aria-label={dictionary.cart.remove}>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Separator />
				<div className='space-y-4 pt-4'>
					<div className='flex items-center justify-between font-semibold'>
						<span>{dictionary.cart.subtotal}</span>
						<span>{formatMoney(cart.total, locale)}</span>
					</div>
					{cart.lines.length === 0 ? (
						<Button className='w-full' size='lg' disabled>
							{dictionary.cart.checkout}
						</Button>
					) : (
						<Button asChild className='w-full' size='lg'>
							<Link href={`/${locale}/checkout`}>
								{dictionary.cart.checkout}
							</Link>
						</Button>
					)}
					<Button asChild variant='outline' className='w-full'>
						<Link href={`/${locale}/cart`}>
							{dictionary.cart.title}
						</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
  );
}
