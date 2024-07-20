import { log } from "node:console";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { input, select } from "@inquirer/prompts";
import { runMain as _runMain, defineCommand } from "citty";
import { copy, readJSON, writeJson } from "fs-extra/esm";

export const runMain = () => _runMain(mainCommand);

const mainCommand = defineCommand({
  meta: {
    description:
      "create-babylon-app is a CLI for scaffolding Babylon.js web application project from templates!",
  },
  run: () => {
    main();
  },
});

const main = async (): Promise<void> => {
  const projectName = await input({
    message: "Project Name:",
    default: "Babylon-App",
    validate: (name) => name !== "",
  });

  const buildTool = await select({
    message: "Build Tools:",
    choices: [
      { value: "vite", name: "Vite" },
      { value: "webpack", name: "Webpack(not ready)", disabled: true },
    ],
  });

  const language = await select({
    message: "Language:",
    choices: [
      { value: "ts", name: "TypeScript" },
      { value: "js", name: "JavaScript" },
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

  log("\nDone!");
  log(`  cd ${projectName}\n`);
};
