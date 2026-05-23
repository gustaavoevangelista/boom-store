import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";
import { dictionaries } from "@/config/i18n";

vi.mock("@/components/layout/favorites-button", () => ({
  FavoritesButton: ({ label }: { label: string }) => <button type="button" aria-label={label} />,
}));

vi.mock("@/components/cart/cart-drawer", () => ({
  CartDrawer: ({ locale }: { locale: string }) => (
    <button type="button" data-testid={`cart-${locale}`} />
  ),
}));

vi.mock("@/components/shared/locale-switcher", () => ({
  LocaleSwitcher: ({ label }: { label: string }) => <button type="button" aria-label={label} />,
}));

vi.mock("@/components/shared/theme-toggle", () => ({
  ThemeToggle: ({ label }: { label: string }) => <button type="button" aria-label={label} />,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: ReactNode;
    href: string;
    className?: string;
  }) => (
    <a className={className} href={href}>
      {children}
    </a>
  ),
}));

describe("SiteHeader", () => {
  it("renders without touching browser storage at module scope", () => {
    const { container } = render(<SiteHeader locale="en" dictionary={dictionaries.en} />);

    expect(screen.getByText(dictionaries.en.announcement)).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
  });
});
