import { afterEach, describe, expect, it } from "vitest";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadRuntimeEnv } from "./load-runtime-env";

describe("loadRuntimeEnv", () => {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.chdir(originalCwd);
    process.env = { ...originalEnv };
  });

  it("loads missing variables from .env at runtime", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "payka-env-"));
    writeFileSync(
      join(tempDir, ".env"),
      'PAYKA_RUNTIME_ENV_TEST="loaded-from-file"\n',
      "utf8",
    );

    delete process.env.PAYKA_RUNTIME_ENV_TEST;
    process.chdir(tempDir);

    loadRuntimeEnv();

    expect(process.env.PAYKA_RUNTIME_ENV_TEST).toBe("loaded-from-file");
    expect(existsSync(join(tempDir, ".env"))).toBe(true);
    rmSync(tempDir, { recursive: true, force: true });
  });

  it("does not override variables already present in process.env", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "payka-env-"));
    writeFileSync(
      join(tempDir, ".env"),
      "PAYKA_RUNTIME_ENV_TEST=from-file\n",
      "utf8",
    );

    process.env.PAYKA_RUNTIME_ENV_TEST = "from-process";
    process.chdir(tempDir);

    loadRuntimeEnv();

    expect(process.env.PAYKA_RUNTIME_ENV_TEST).toBe("from-process");
    rmSync(tempDir, { recursive: true, force: true });
  });
});
