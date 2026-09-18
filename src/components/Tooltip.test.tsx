import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children correctly", () => {
    const html = renderToStaticMarkup(
      <Tooltip content="Favorites">
        <button type="button">Favorites Button</button>
      </Tooltip>
    );

    expect(html).toContain("Favorites Button");
    expect(html).toContain("Favorites");
    expect(html).toContain('role="tooltip"');
  });

  it("applies position class correctly", () => {
    const topHtml = renderToStaticMarkup(
      <Tooltip content="Top tooltip" position="top">
        <button type="button">Top</button>
      </Tooltip>
    );
    expect(topHtml).toContain("bottom-full");

    const bottomHtml = renderToStaticMarkup(
      <Tooltip content="Bottom tooltip" position="bottom">
        <button type="button">Bottom</button>
      </Tooltip>
    );
    expect(bottomHtml).toContain("top-full");
  });
});
