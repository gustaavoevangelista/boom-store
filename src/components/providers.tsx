"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/store/cart-provider";
import type { Locale } from "@/lib/i18n";

export function Providers({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider locale={locale}>
        {children}
        <Toaster richColors />
      </CartProvider>
    </ThemeProvider>
  );
}
