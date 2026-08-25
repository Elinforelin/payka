import { describe, expect, it } from "vitest";
import { getCharityPercent } from "./product-charity";

describe("getCharityPercent", () => {
  it("returns valid percents", () => {
    expect(getCharityPercent({ charityPercent: 100 })).toBe(100);
    expect(getCharityPercent({ charityPercent: 50.4 })).toBe(50);
  });

  it("returns null when unset or invalid", () => {
    expect(getCharityPercent({})).toBeNull();
    expect(getCharityPercent({ charityPercent: 0 })).toBeNull();
    expect(getCharityPercent({ charityPercent: 101 })).toBeNull();
  });
});
