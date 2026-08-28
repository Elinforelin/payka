import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let loadedFromCwd: string | null = null;

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

export function loadRuntimeEnv(): void {
  const cwd = process.cwd();
  if (loadedFromCwd === cwd) {
    return;
  }
  loadedFromCwd = cwd;

  for (const fileName of [".env", ".env.local"]) {
    const envPath = resolve(process.cwd(), fileName);
    if (!existsSync(envPath)) {
      continue;
    }

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
}
