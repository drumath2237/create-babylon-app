import path from "node:path";
import { fileURLToPath } from "node:url";
import { runMain as _runMain, defineCommand } from "citty";
import { consola } from "consola";
import { colorize } from "consola/utils";
import { downloadTemplate } from "giget";
import { readPackageJSON, writePackageJSON } from "pkg-types";
import { templates } from "./projectTemplates";
import { constructTemplateNameAsync } from "./templateSelector";

export const runMain = () => _runMain(mainCommand);

const mainCommand = defineCommand({
  meta: async () => {
    const execDir = path.resolve(fileURLToPath(import.meta.url), "../..");
    const packageJson = await readPackageJSON(execDir);
    return {
      name: "create-babylon-app",
      version: packageJson.version,
      description:
        "A CLI for scaffolding Babylon.js web application project from templates!",
    };
  },
  run: async () => {
    const projectName = await consola.prompt("Project Name?", {
      type: "text",
      default: "babylon-app",
      placeholder: "babylon-app",
    });

    const templateDirName = await constructTemplateNameAsync(
      templates,
      async ({ message, selection }) => {
        const val = await consola.prompt(message, {
          type: "select",
          options: selection,
        });
        const valStr = val as unknown as string;
        const index = selection.map((sel) => sel.value).indexOf(valStr);

        return { index };
      },
    );

    const doInstall = await consola.prompt("Install Dependencies?", {
      type: "confirm",
      initial: false,
    });

    const githubRepoUrlBase = "gh:drumath2237/create-babylon-app/templates";
    const { dir: appDir } = await downloadTemplate(
      `${githubRepoUrlBase}/${templateDirName}`,
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

    consola.log("\n");
    consola.success("Done!✨");
    consola.log(`  cd ${projectName}`);
  },
});
