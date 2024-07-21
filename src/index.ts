import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runMain as _runMain, defineCommand } from "citty";
import { consola } from "consola";
import { colorize } from "consola/utils";
import { copy, readJSON, writeJson } from "fs-extra/esm";
import { readPackageJSON } from "pkg-types";

export const runMain = () => _runMain(mainCommand);

const mainCommand = defineCommand({
  meta: async () => {
    const packageJson = await readPackageJSON();
    return {
      name: "create-babylon-app",
      version: packageJson.version,
      description:
        "A CLI for scaffolding Babylon.js web application project from templates!",
    };
  },
  run: async () => {
    const projectName = await consola.prompt("Project Name", {
      type: "text",
      default: "Babylon-App",
      placeholder: "Babylon-App",
    });

    const buildTool = await consola.prompt("Build Tools", {
      type: "select",
      options: [{ value: "vite", label: "Vite" }],
    });

    const language = await consola.prompt("Language", {
      type: "select",
      options: [
        { value: "ts", label: `${colorize("blue", "TypeScript")}` },
        { value: "js", label: `${colorize("yellow", "JavaScript")}` },
      ],
    });

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      "../..",
      "templates",
      `${buildTool}-${language}`,
    );

    const workingDir = process.cwd();
    const appDir = path.join(workingDir, projectName);

    await mkdir(appDir);
    await copy(templateDir, appDir);

    const packageJsonPath = path.join(appDir, "package.json");
    const packageJson = await readJSON(packageJsonPath);
    packageJson.name = projectName;
    await writeJson(packageJsonPath, packageJson, { spaces: "\t" });

    console.log("\nDone!");
    console.log(`  cd ${projectName}\n`);
  },
});
