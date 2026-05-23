"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/store/cart-provider";
import { MotionProvider } from "@/components/store/motion-provider";
import { ThemeProvider } from "@/components/store/theme-provider";
import type { Locale } from "@/config/i18n";

export function Providers({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <MotionProvider>
      <ThemeProvider>
        <CartProvider locale={locale}>
          {children}
          <Toaster richColors />
        </CartProvider>
      </ThemeProvider>
    </MotionProvider>
  );
}
