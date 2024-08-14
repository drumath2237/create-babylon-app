import path from "node:path";
import { fileURLToPath } from "node:url";
import { runMain as _runMain, defineCommand } from "citty";
import { consola } from "consola";
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
  args: {
    name: {
      type: "string",
      alias: ["n"],
      description: "project name.",
      valueHint: "project name",
      required: false,
    },
    template: {
      type: "string",
      alias: ["t"],
      description: "project template name (e.g. simple-ts, library)",
      valueHint: "template name",
      required: false,
    },
    install: {
      type: "boolean",
      alias: ["i"],
      description: "install dependencies after copying template.",
      required: false,
      valueHint: "true or false",
    },
  },
  run: async ({ args }) => {
    const settings = {
      projectName: args.name,
      templateDirName: args.template,
      doInstall: args.install,
    };

    settings.projectName ??= await consola.prompt("Project Name?", {
      type: "text",
      default: "babylon-app",
      placeholder: "babylon-app",
    });

    settings.templateDirName ??= await constructTemplateNameAsync(
      templates,
      async ({ message, selections }) => {
        const val = await consola.prompt(message, {
          type: "select",
          options: selections.map((s) => ({ label: s.label, value: s.value })),
        });

        // latest version of consola, prompt returns only value.
        // return val <-- this will cause runtime type error
        const valStr = val as unknown as string;
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const selected = selections.find((s) => s.value === valStr)!;

        return selected;
      },
    );

    settings.doInstall ??= await consola.prompt("Install Dependencies?", {
      type: "confirm",
      initial: false,
    });

    const { projectName, templateDirName, doInstall } = settings;
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
