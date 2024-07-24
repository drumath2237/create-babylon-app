import path from "node:path";
import { runMain as _runMain, defineCommand } from "citty";
import { consola } from "consola";
import { colorize } from "consola/utils";
import { readPackageJSON, writePackageJSON } from "pkg-types";
import { downloadTemplate } from "giget";

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

    const doInstall = await consola.prompt("Install Dependencies?", {
      type: "confirm",
      initial: false,
    });

    const githubRepoUrlBase = "gh:drumath2237/create-babylon-app/templates";
    const templateName = `${buildTool}-${language}`;
    const { dir: appDir } = await downloadTemplate(
      `${githubRepoUrlBase}/${templateName}`,
      {
        dir: projectName,
        install: doInstall,
      },
    );

    const packageJson = await readPackageJSON(appDir);
    if (packageJson.name) {
      packageJson.name = projectName;
      const jsonPath = path.resolve(appDir, "package.json");
      await writePackageJSON(jsonPath, packageJson);
    }

    console.log("\nDone!");
    console.log(`  cd ${projectName}\n`);
  },
});
