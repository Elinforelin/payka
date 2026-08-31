import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("loadRuntimeEnv", () => {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  let loadRuntimeEnv: () => void;

  beforeEach(async () => {
    vi.resetModules();
    loadRuntimeEnv = (await import("./load-runtime-env")).loadRuntimeEnv;
  });

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

  it("loads .env from a parent directory when cwd is nested", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "payka-env-"));
    const nestedDir = join(tempDir, ".output", "server");
    mkdirSync(nestedDir, { recursive: true });
    writeFileSync(
      join(tempDir, ".env"),
      "PAYKA_RUNTIME_ENV_TEST=nested-load\n",
      "utf8",
    );

    delete process.env.PAYKA_RUNTIME_ENV_TEST;
    process.chdir(nestedDir);

    loadRuntimeEnv();

    expect(process.env.PAYKA_RUNTIME_ENV_TEST).toBe("nested-load");
    rmSync(tempDir, { recursive: true, force: true });
  });
});
