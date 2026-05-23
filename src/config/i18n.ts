export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  pt: {
    announcement: "Envios para toda a UE. Pagamento Stripe em breve.",
    nav: {
      menu: "Menu",
      menuDescription: "Main site navigation.",
      shop: "Loja",
      tshirts: "T-shirts",
      prints: "Prints",
      about: "Sobre",
      contact: "Contacto",
      favorites: "Favoritos",
      cart: "Carrinho",
    },
    home: {
      heroTitle: "BOOM T-Shirteria",
      heroCopy:
        "T-shirts e prints com energia gráfica, feitos para looks fortes e presentes memoráveis.",
      eyebrow: "T-shirts + prints",
      shopNow: "Comprar agora",
      viewPrints: "Ver prints",
      featured: "Destaques",
      categories: "Escolhe a tua vibração",
      storyTitle: "Uma marca pequena com uma presença grande.",
      story:
        "BOOM nasce para transformar frases, cores e ilustrações em peças fáceis de usar, oferecer e repetir.",
      benefits: [
        "Envios para toda a UE",
        "Checkout seguro pronto",
        "Drops pequenos, gráficos fortes",
      ],
    },
    shop: {
      title: "Loja",
      copy: "T-shirts e prints prontos a comprar.",
      filters: "Filtros",
      filtersDescription: "Refina a lista de produtos por categoria.",
      all: "Todos",
      sort: "Ordenar",
      newest: "Novidades",
      priceLow: "Preço baixo",
      priceHigh: "Preço alto",
      empty: "Não encontrámos produtos com estes filtros.",
    },
    product: {
      size: "Tamanho",
      color: "Cor",
      quantity: "Quantidade",
      add: "Adicionar",
      favorite: "Favorito",
      details: "Detalhes",
      shipping: "Envio e devoluções",
      shippingBody:
        "Envios para toda a UE estão previstos. As tarifas finais, tempos de entrega e instruções de devolução serão confirmados antes do lançamento.",
      care: "Cuidados",
      related: "Também vais gostar",
      chooseVariant: "Escolhe as opções antes de adicionar.",
    },
    cart: {
      title: "Carrinho",
      empty: "O teu carrinho está vazio.",
      drawerDescription: "Revê os teus itens antes de avançar para o checkout.",
      subtotal: "Subtotal",
      checkout: "Finalizar compra",
      increaseQuantity: "Aumentar quantidade",
      decreaseQuantity: "Diminuir quantidade",
      remove: "Remover",
      continue: "Continuar a comprar",
    },
    footer: {
      info: "Info",
      links: {
        faq: "FAQ",
        shippingReturns: "Envio e devoluções",
        privacy: "Política de privacidade",
        terms: "Termos",
        cookies: "Cookies",
      },
    },
    favorites: {
      title: "Favoritos",
      empty: "Guarda produtos para voltar a eles mais tarde.",
    },
    checkout: {
      title: "Checkout",
      contact: "Contacto",
      shipping: "Morada de envio",
      paymentSoon: "Pagamento seguro com Stripe será ligado em breve.",
      placeOrder: "Guardar intenção de compra",
    },
    common: {
      addToCart: "Adicionar ao carrinho",
      soldOut: "Esgotado",
      inStock: "Em stock",
      new: "Novo",
      sale: "Promo",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Escuro",
      themeSystem: "Sistema",
      language: "Idioma",
    },
    pages: {
      about: {
        title: "Sobre a BOOM",
        sections: [
          {
            paragraphs: [
              "A BOOM T-Shirteria cria t-shirts gráficas e prints com uma identidade visual forte e divertida.",
            ],
          },
          {
            title: "O que fazemos",
            bullets: [
              "Peças pensadas para uso diário e presentes.",
              "Edições pequenas para manter o catálogo vivo.",
              "Ilustrações simples, cores diretas e presença imediata.",
            ],
          },
        ],
      },
      contact: {
        title: "Contacto",
        sections: [
          {
            paragraphs: [
              "Se precisares de ajuda com um pedido, colaboração ou revenda, fala connosco por email ou redes sociais.",
            ],
            bullets: [
              "Email: hello@boom.example",
              "Instagram: @boomtshirteria",
              "Ateliê: Lisboa, Portugal",
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        sections: [
          {
            title: "Pedidos",
            bullets: [
              "Quando a encomenda é enviada?",
              "Como acompanho a entrega?",
              "Posso cancelar antes do envio?",
            ],
          },
          {
            title: "Produtos",
            bullets: [
              "Como escolho tamanho e cor?",
              "Como devo cuidar da peça?",
              "Os prints incluem moldura?",
            ],
          },
        ],
      },
      shippingReturns: {
        title: "Envio e devoluções",
        sections: [
          {
            paragraphs: [
              "Envios para toda a UE estão previstos. As tarifas finais, tempos de entrega e instruções de devolução serão confirmados antes do lançamento.",
            ],
          },
          {
            title: "Devoluções",
            bullets: [
              "Confirma sempre a morada antes de finalizar.",
              "Reporta problemas de produção assim que receberes a encomenda.",
              "As condições finais serão publicadas antes da primeira venda.",
            ],
          },
        ],
      },
      privacy: {
        title: "Política de privacidade",
        sections: [
          {
            paragraphs: [
              "Esta página irá explicar como tratamos dados de contacto, checkout, analytics e retenção, em conformidade com o RGPD.",
            ],
          },
        ],
      },
      terms: {
        title: "Termos",
        sections: [
          {
            paragraphs: [
              "Esta página irá reunir a identidade do vendedor, condições de compra, métodos de pagamento e direitos do consumidor.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookies",
        sections: [
          {
            paragraphs: [
              "Esta página irá listar os cookies usados no site e explicar como gerir consentimento e preferências.",
            ],
          },
        ],
      },
    },
  },
  en: {
    announcement: "EU-wide shipping. Stripe payments coming soon.",
    nav: {
      menu: "Menu",
      menuDescription: "Main site navigation.",
      shop: "Shop",
      tshirts: "T-shirts",
      prints: "Prints",
      about: "About",
      contact: "Contact",
      favorites: "Favorites",
      cart: "Cart",
    },
    home: {
      heroTitle: "BOOM T-Shirteria",
      heroCopy: "Graphic t-shirts and prints made for bold outfits and memorable gifts.",
      eyebrow: "T-shirts + prints",
      shopNow: "Shop now",
      viewPrints: "View prints",
      featured: "Featured",
      categories: "Choose your vibe",
      storyTitle: "A small brand with a big presence.",
      story:
        "BOOM turns phrases, colors, and illustrations into pieces that are easy to wear, gift, and repeat.",
      benefits: ["EU-wide shipping", "Secure checkout ready", "Small drops, strong graphics"],
    },
    shop: {
      title: "Shop",
      copy: "Ready-to-buy t-shirts and prints.",
      filters: "Filters",
      filtersDescription: "Refine the product list by category.",
      all: "All",
      sort: "Sort",
      newest: "Newest",
      priceLow: "Price low",
      priceHigh: "Price high",
      empty: "No products match these filters.",
    },
    product: {
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      add: "Add",
      favorite: "Favorite",
      details: "Details",
      shipping: "Shipping and returns",
      shippingBody:
        "EU-wide shipping is planned. Final delivery rates, timing, and return instructions will be confirmed before launch.",
      care: "Care",
      related: "You may also like",
      chooseVariant: "Choose the options before adding.",
    },
    cart: {
      title: "Cart",
      empty: "Your cart is empty.",
      drawerDescription: "Review your items before heading to checkout.",
      subtotal: "Subtotal",
      checkout: "Checkout",
      increaseQuantity: "Increase quantity",
      decreaseQuantity: "Decrease quantity",
      remove: "Remove",
      continue: "Continue shopping",
    },
    footer: {
      info: "Info",
      links: {
        faq: "FAQ",
        shippingReturns: "Shipping & returns",
        privacy: "Privacy policy",
        terms: "Terms",
        cookies: "Cookies",
      },
    },
    favorites: {
      title: "Favorites",
      empty: "Save products to revisit them later.",
    },
    checkout: {
      title: "Checkout",
      contact: "Contact",
      shipping: "Shipping address",
      paymentSoon: "Secure Stripe payment will be connected soon.",
      placeOrder: "Save order intent",
    },
    common: {
      addToCart: "Add to cart",
      soldOut: "Sold out",
      inStock: "In stock",
      new: "New",
      sale: "Sale",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      language: "Language",
    },
    pages: {
      about: {
        title: "About BOOM",
        sections: [
          {
            paragraphs: [
              "BOOM T-Shirteria creates graphic t-shirts and prints with a loud, playful visual identity.",
            ],
          },
          {
            title: "What we make",
            bullets: [
              "Wearable pieces designed for everyday use and gifts.",
              "Small drops that keep the catalog moving.",
              "Simple illustrations, direct colors, and immediate presence.",
            ],
          },
        ],
      },
      contact: {
        title: "Contact",
        sections: [
          {
            paragraphs: [
              "For order help, collaborations, or wholesale inquiries, reach out by email or social media.",
            ],
            bullets: [
              "Email: hello@boom.example",
              "Instagram: @boomtshirteria",
              "Studio: Lisbon, Portugal",
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        sections: [
          {
            title: "Orders",
            bullets: [
              "When will my order ship?",
              "How can I track delivery?",
              "Can I cancel before shipping?",
            ],
          },
          {
            title: "Products",
            bullets: [
              "How do I choose size and color?",
              "How should I care for the piece?",
              "Do prints include a frame?",
            ],
          },
        ],
      },
      shippingReturns: {
        title: "Shipping & Returns",
        sections: [
          {
            paragraphs: [
              "EU-wide shipping is planned. Final delivery rates, timing, and return instructions will be confirmed before launch.",
            ],
          },
          {
            title: "Returns",
            bullets: [
              "Double-check the address before checkout.",
              "Report production issues as soon as your order arrives.",
              "The final terms will be published before the first sale.",
            ],
          },
        ],
      },
      privacy: {
        title: "Privacy Policy",
        sections: [
          {
            paragraphs: [
              "This page will explain how we handle contact data, checkout details, analytics, and retention under GDPR.",
            ],
          },
        ],
      },
      terms: {
        title: "Terms",
        sections: [
          {
            paragraphs: [
              "This page will gather seller identity, purchase conditions, payment methods, and consumer rights details.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookies",
        sections: [
          {
            paragraphs: [
              "This page will list the cookies used on the site and explain how to manage consent and preferences.",
            ],
          },
        ],
      },
    },
  },
  es: {
    announcement: "Envíos a toda la UE. Pagos con Stripe muy pronto.",
    nav: {
      menu: "Menú",
      menuDescription: "Navegación principal del sitio.",
      shop: "Tienda",
      tshirts: "Camisetas",
      prints: "Prints",
      about: "Sobre",
      contact: "Contacto",
      favorites: "Favoritos",
      cart: "Carrito",
    },
    home: {
      heroTitle: "BOOM T-Shirteria",
      heroCopy: "Camisetas y prints gráficos para looks potentes y regalos memorables.",
      eyebrow: "Camisetas + prints",
      shopNow: "Comprar ahora",
      viewPrints: "Ver prints",
      featured: "Destacados",
      categories: "Elige tu vibra",
      storyTitle: "Una marca pequeña con gran presencia.",
      story:
        "BOOM convierte frases, colores e ilustraciones en piezas fáciles de llevar, regalar y repetir.",
      benefits: [
        "Envíos a toda la UE",
        "Checkout seguro listo",
        "Drops pequeños, gráficos fuertes",
      ],
    },
    shop: {
      title: "Tienda",
      copy: "Camisetas y prints listos para comprar.",
      filters: "Filtros",
      filtersDescription: "Filtra la lista de productos por categoría.",
      all: "Todos",
      sort: "Ordenar",
      newest: "Novedades",
      priceLow: "Precio bajo",
      priceHigh: "Precio alto",
      empty: "No encontramos productos con estos filtros.",
    },
    product: {
      size: "Talla",
      color: "Color",
      quantity: "Cantidad",
      add: "Añadir",
      favorite: "Favorito",
      details: "Detalles",
      shipping: "Envíos y devoluciones",
      shippingBody:
        "Se prevén envíos a toda la UE. Las tarifas finales, los tiempos de entrega y las instrucciones de devolución se confirmarán antes del lanzamiento.",
      care: "Cuidados",
      related: "También te gustará",
      chooseVariant: "Elige las opciones antes de añadir.",
    },
    cart: {
      title: "Carrito",
      empty: "Tu carrito está vacío.",
      drawerDescription: "Revisa tus artículos antes de ir al checkout.",
      subtotal: "Subtotal",
      checkout: "Finalizar compra",
      increaseQuantity: "Aumentar cantidad",
      decreaseQuantity: "Disminuir cantidad",
      remove: "Eliminar",
      continue: "Seguir comprando",
    },
    footer: {
      info: "Info",
      links: {
        faq: "FAQ",
        shippingReturns: "Envíos y devoluciones",
        privacy: "Política de privacidad",
        terms: "Términos",
        cookies: "Cookies",
      },
    },
    favorites: {
      title: "Favoritos",
      empty: "Guarda productos para verlos más tarde.",
    },
    checkout: {
      title: "Checkout",
      contact: "Contacto",
      shipping: "Dirección de envío",
      paymentSoon: "El pago seguro con Stripe se conectará pronto.",
      placeOrder: "Guardar intención de compra",
    },
    common: {
      addToCart: "Añadir al carrito",
      soldOut: "Agotado",
      inStock: "En stock",
      new: "Nuevo",
      sale: "Oferta",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Oscuro",
      themeSystem: "Sistema",
      language: "Idioma",
    },
    pages: {
      about: {
        title: "Sobre BOOM",
        sections: [
          {
            paragraphs: [
              "BOOM T-Shirteria crea camisetas gráficas y prints con una identidad visual llamativa y divertida.",
            ],
          },
          {
            title: "Lo que hacemos",
            bullets: [
              "Piezas pensadas para uso diario y regalos.",
              "Pequeños lanzamientos para mantener vivo el catálogo.",
              "Ilustraciones simples, colores directos y presencia inmediata.",
            ],
          },
        ],
      },
      contact: {
        title: "Contacto",
        sections: [
          {
            paragraphs: [
              "Si necesitas ayuda con un pedido, una colaboración o venta al por mayor, escríbenos por email o redes sociales.",
            ],
            bullets: [
              "Email: hello@boom.example",
              "Instagram: @boomtshirteria",
              "Estudio: Lisboa, Portugal",
            ],
          },
        ],
      },
      faq: {
        title: "FAQ",
        sections: [
          {
            title: "Pedidos",
            bullets: [
              "¿Cuándo se envía mi pedido?",
              "¿Cómo sigo la entrega?",
              "¿Puedo cancelar antes del envío?",
            ],
          },
          {
            title: "Productos",
            bullets: [
              "¿Cómo elijo talla y color?",
              "¿Cómo debo cuidar la prenda?",
              "¿Los prints incluyen marco?",
            ],
          },
        ],
      },
      shippingReturns: {
        title: "Envíos y devoluciones",
        sections: [
          {
            paragraphs: [
              "Se prevén envíos a toda la UE. Las tarifas finales, los tiempos de entrega y las instrucciones de devolución se confirmarán antes del lanzamiento.",
            ],
          },
          {
            title: "Devoluciones",
            bullets: [
              "Comprueba la dirección antes de finalizar.",
              "Comunica cualquier problema de producción en cuanto llegue el pedido.",
              "Las condiciones finales se publicarán antes de la primera venta.",
            ],
          },
        ],
      },
      privacy: {
        title: "Política de privacidad",
        sections: [
          {
            paragraphs: [
              "Esta página explicará cómo tratamos datos de contacto, checkout, analítica y retención bajo el RGPD.",
            ],
          },
        ],
      },
      terms: {
        title: "Términos",
        sections: [
          {
            paragraphs: [
              "Esta página reunirá la identidad del vendedor, las condiciones de compra, los métodos de pago y los derechos del consumidor.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookies",
        sections: [
          {
            paragraphs: [
              "Esta página listará las cookies usadas en el sitio y explicará cómo gestionar el consentimiento y las preferencias.",
            ],
          },
        ],
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
