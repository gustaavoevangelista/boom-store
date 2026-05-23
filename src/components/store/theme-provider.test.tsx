import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@/components/store/theme-provider";

describe("ThemeProvider", () => {
  it("does not inject script tags", () => {
    const { container } = render(
      <ThemeProvider>
        <div>theme</div>
      </ThemeProvider>,
    );

    expect(container.querySelector("script")).toBeNull();
  });
});
