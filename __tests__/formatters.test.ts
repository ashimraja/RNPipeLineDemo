// __tests__/formatters.test.ts
import {
  formatVersion,
  truncate,
  isValidVersion,
} from "../src/utils/formatters";

describe("formatVersion", () => {
  it("formats version and build number correctly", () => {
    expect(formatVersion("1.2.3", 202401011200)).toBe(
      "v1.2.3 (202401011200)"
    );
  });

  it("handles single-digit versions", () => {
    expect(formatVersion("1.0.0", 1)).toBe("v1.0.0 (1)");
  });
});

describe("truncate", () => {
  it("returns original string when within limit", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("truncates and adds ellipsis when over limit", () => {
    expect(truncate("Hello World Foo", 8)).toBe("Hello...");
  });

  it("handles exact length boundary", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });
});

describe("isValidVersion", () => {
  it("validates correct semver", () => {
    expect(isValidVersion("1.0.0")).toBe(true);
    expect(isValidVersion("12.3.45")).toBe(true);
  });

  it("rejects invalid versions", () => {
    expect(isValidVersion("1.0")).toBe(false);
    expect(isValidVersion("1.0.0-beta")).toBe(false);
    expect(isValidVersion("abc")).toBe(false);
  });
});
