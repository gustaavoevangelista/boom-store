import type { Locale } from "@/config/i18n";

export type ProductType = "t-shirt" | "print";

export type ProductVariant = {
  id: string;
  sku: string;
  size?: string;
  color?: string;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  type: ProductType;
  price: number;
  compareAt?: number;
  featured?: boolean;
  badge?: "new" | "sale";
  images: string[];
  colors?: string[];
  sizes?: string[];
  variants: ProductVariant[];
  copy: Record<Locale, { name: string; description: string; details: string; care: string }>;
};

export type Collection = {
  slug: string;
  type: ProductType;
  label: Record<Locale, string>;
};
