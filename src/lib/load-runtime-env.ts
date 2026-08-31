import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let loaded = false;

function parseEnvValue(raw: string): string {
  const value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadEnvFile(envPath: string): void {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = parseEnvValue(trimmed.slice(separatorIndex + 1));
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function findEnvFilePaths(fileName: string): string[] {
  const candidates = new Set<string>();
  let dir = process.cwd();

  for (let depth = 0; depth < 6; depth += 1) {
    candidates.add(resolve(dir, fileName));
    const parent = resolve(dir, "..");
    if (parent === dir) {
      break;
    }
    dir = parent;
  }

  try {
    const moduleDir = dirname(fileURLToPath(import.meta.url));
    dir = moduleDir;
    for (let depth = 0; depth < 6; depth += 1) {
      candidates.add(resolve(dir, fileName));
      const parent = resolve(dir, "..");
      if (parent === dir) {
        break;
      }
      dir = parent;
    }
  } catch {
    // import.meta.url may be unavailable in some test environments.
  }

  return [...candidates].filter((envPath) => existsSync(envPath));
}

export function loadRuntimeEnv(): void {
  if (loaded) {
    return;
  }
  loaded = true;

  for (const fileName of [".env", ".env.local"]) {
    for (const envPath of findEnvFilePaths(fileName)) {
      loadEnvFile(envPath);
    }
  }
}
