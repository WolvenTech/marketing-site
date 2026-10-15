import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { CTA } from "./CTA";

describe("CTA component", () => {
  it("renders primary variant with children and href", () => {
    const html = renderToString(<CTA href="/contact">Get Started</CTA>);
    expect(html).toContain('href="/contact"');
    expect(html).toContain("Get Started");
    expect(html).toContain("bg-primary");
  });

  it("renders ghost variant with arrow indicator", () => {
    const html = renderToString(
      <CTA href="/learn-more" variant="ghost">
        Learn More
      </CTA>
    );
    expect(html).toContain("Learn More");
    expect(html).toContain("→");
  });
});
