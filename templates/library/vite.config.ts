import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readPackageJSON } from "pkg-types";
import { LibraryFormats } from "vite";

export default defineConfig(async () => {
  const packageName = await readPackageJSON().then((json) => json.name);
  if (!packageName) {
    throw new Error("name is not defined in package.json");
  }

  return {
    plugins: [dts()],
    build: {
      lib: {
        entry: resolve(__dirname, "./lib/index.ts"),
        name: packageName,
        fileName: "index",
        formats: ["es", "umd"] as LibraryFormats[],
      },
      rollupOptions: {
        external: ["@babylonjs/core"],
        output: {
          globals: {
            "@babylonjs/core": "BABYLON",
          },
        },
      },
    },
  };
});
