import type { Locale } from "@/lib/i18n";

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

export const collections = [
  {
    slug: "t-shirts",
    type: "t-shirt" as const,
    label: { pt: "T-shirts", en: "T-shirts", es: "Camisetas" },
  },
  { slug: "prints", type: "print" as const, label: { pt: "Prints", en: "Prints", es: "Prints" } },
];

const tshirtVariants = (id: string, colors: string[]) =>
  ["S", "M", "L", "XL"].flatMap((size) =>
    colors.map((color) => ({
      id: `${id}-${size.toLowerCase()}-${color.toLowerCase()}`,
      sku: `BOOM-${id.toUpperCase()}-${size}-${color.toUpperCase()}`,
      size,
      color,
      stock: size === "XL" && color === "Black" ? 0 : 8,
    })),
  );

export const products: Product[] = [
  {
    id: "sun-burst",
    slug: "sun-burst-tee",
    type: "t-shirt",
    price: 29,
    featured: true,
    badge: "new",
    images: ["/products/sun-burst.svg"],
    colors: ["White", "Black"],
    sizes: ["S", "M", "L", "XL"],
    variants: tshirtVariants("sun", ["White", "Black"]),
    copy: {
      pt: {
        name: "T-shirt Sun Burst",
        description: "Uma t-shirt gráfica com energia solar e acabamento macio.",
        details: "Algodão penteado, corte unissexo e print frontal de alto contraste.",
        care: "Lavar do avesso a 30 graus. Não passar diretamente sobre o print.",
      },
      en: {
        name: "Sun Burst T-shirt",
        description: "A graphic tee with sunny energy and a soft finish.",
        details: "Combed cotton, unisex cut, and high-contrast front print.",
        care: "Wash inside out at 30 degrees. Do not iron directly over the print.",
      },
      es: {
        name: "Camiseta Sun Burst",
        description: "Una camiseta gráfica con energía solar y tacto suave.",
        details: "Algodón peinado, corte unisex y print frontal de alto contraste.",
        care: "Lavar del revés a 30 grados. No planchar directamente sobre el print.",
      },
    },
  },
  {
    id: "loud-heart",
    slug: "loud-heart-tee",
    type: "t-shirt",
    price: 32,
    compareAt: 38,
    featured: true,
    badge: "sale",
    images: ["/products/loud-heart.svg"],
    colors: ["Pink", "White"],
    sizes: ["S", "M", "L", "XL"],
    variants: tshirtVariants("heart", ["Pink", "White"]),
    copy: {
      pt: {
        name: "T-shirt Loud Heart",
        description: "Coração grande, cor forte, presença imediata.",
        details: "Print vermelho BOOM em base clara, ideal para looks simples e expressivos.",
        care: "Lavar com cores semelhantes e secar ao ar.",
      },
      en: {
        name: "Loud Heart T-shirt",
        description: "Big heart, strong color, instant presence.",
        details: "BOOM red print on a light base, ideal for simple expressive outfits.",
        care: "Wash with similar colors and air dry.",
      },
      es: {
        name: "Camiseta Loud Heart",
        description: "Corazón grande, color fuerte, presencia inmediata.",
        details: "Print rojo BOOM sobre base clara, ideal para looks simples y expresivos.",
        care: "Lavar con colores similares y secar al aire.",
      },
    },
  },
  {
    id: "boom-type",
    slug: "boom-type-print",
    type: "print",
    price: 18,
    featured: true,
    badge: "new",
    images: ["/products/boom-type.svg"],
    variants: [{ id: "boom-type-a3", sku: "BOOM-PRINT-TYPE-A3", stock: 20 }],
    copy: {
      pt: {
        name: "Print BOOM Type",
        description: "Poster A3 com composição tipográfica vermelha e rosa.",
        details: "Impresso em papel mate de 250 g, sem moldura.",
        care: "Enviar plano ou enrolado. Manter longe de humidade direta.",
      },
      en: {
        name: "BOOM Type Print",
        description: "A3 poster with a red and pink typographic composition.",
        details: "Printed on 250 gsm matte paper, frame not included.",
        care: "Ships flat or rolled. Keep away from direct moisture.",
      },
      es: {
        name: "Print BOOM Type",
        description: "Póster A3 con composición tipográfica roja y rosa.",
        details: "Impreso en papel mate de 250 g, sin marco.",
        care: "Enviar plano o enrollado. Mantener lejos de humedad directa.",
      },
    },
  },
  {
    id: "pink-noise",
    slug: "pink-noise-print",
    type: "print",
    price: 16,
    images: ["/products/pink-noise.svg"],
    variants: [{ id: "pink-noise-a4", sku: "BOOM-PRINT-PINK-A4", stock: 24 }],
    copy: {
      pt: {
        name: "Print Pink Noise",
        description: "Print A4 minimal com textura rosa e assinatura BOOM.",
        details: "Papel mate de 250 g, pronto para emoldurar.",
        care: "Manusear com mãos limpas e guardar plano.",
      },
      en: {
        name: "Pink Noise Print",
        description: "Minimal A4 print with pink texture and BOOM signature.",
        details: "250 gsm matte paper, ready to frame.",
        care: "Handle with clean hands and store flat.",
      },
      es: {
        name: "Print Pink Noise",
        description: "Print A4 minimal con textura rosa y firma BOOM.",
        details: "Papel mate de 250 g, listo para enmarcar.",
        care: "Manipular con manos limpias y guardar plano.",
      },
    },
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
