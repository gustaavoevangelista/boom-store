import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { FavoritesButton } from '@/components/layout/favorites-button';
import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import type { Dictionary, Locale } from '@/config/i18n';

const navItems = [
	['shop', 'shop'],
	['tshirts', 'collections/t-shirts'],
	['prints', 'collections/prints'],
	['about', 'about'],
	['contact', 'contact'],
] as const;

export function SiteHeader({
	locale,
	dictionary,
}: {
	locale: Locale;
	dictionary: Dictionary;
}) {
	return (
		<header className='sticky top-0 z-40 border-b bg-background/90 backdrop-blur'>
			<div className='bg-primary px-4 py-2 text-center text-primary-foreground text-sm font-semibold'>
				{dictionary.announcement}
			</div>
			<div className='mx-auto flex h-18 max-w-7xl items-center gap-4 px-4'>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='md:hidden transition-transform duration-200 hover:scale-105'
							aria-label={dictionary.nav.menu}>
							<Menu className='h-5 w-5' />
						</Button>
					</SheetTrigger>
					<SheetContent side='left'>
						<SheetTitle className='sr-only'>
							{dictionary.nav.menu}
						</SheetTitle>
						<SheetDescription className='sr-only'>
							{dictionary.nav.menuDescription}
						</SheetDescription>
						<Link
							href={`/${locale}`}
							className='mb-8 flex items-center gap-3'>
							<Image
								src='/boom-logo.png'
								alt='BOOM T-Shirteria'
								width={56}
								height={56}
								className='rounded-md'
							/>
							<span className='font-black text-xl'>BOOM</span>
						</Link>
						<nav className='grid gap-2'>
							{navItems.map(([key, href]) => (
								<Link
									className='rounded-md px-3 py-3 font-semibold transition-transform duration-200 hover:-translate-x-1 hover:bg-accent'
									href={`/${locale}/${href}`}
									key={key}>
									{dictionary.nav[key]}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
				<Link
					href={`/${locale}`}
					className='flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]'>
					<Image
						src='/boom-logo.png'
						alt='BOOM T-Shirteria'
						width={44}
						height={44}
						className='rounded-md'
						priority
					/>
					<span className='hidden font-black text-xl sm:inline'>
						BOOM
					</span>
				</Link>
				<nav className='hidden flex-1 items-center justify-center gap-1 md:flex'>
					{navItems.map(([key, href]) => (
						<Button asChild variant='ghost' key={key}>
							<Link href={`/${locale}/${href}`}>
								{dictionary.nav[key]}
							</Link>
						</Button>
					))}
				</nav>
				<div className='ml-auto flex items-center gap-1'>
					<LocaleSwitcher
						locale={locale}
						label={dictionary.common.language}
					/>
					<ThemeToggle
						label={dictionary.common.theme}
						options={{
							light: dictionary.common.themeLight,
							dark: dictionary.common.themeDark,
							system: dictionary.common.themeSystem,
						}}
					/>
					<FavoritesButton
						locale={locale}
						label={dictionary.nav.favorites}
					/>
					<CartDrawer locale={locale} dictionary={dictionary} />
				</div>
			</div>
		</header>
	);
}
