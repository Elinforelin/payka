/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [viteTsConfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
