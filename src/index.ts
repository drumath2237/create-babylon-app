import { input, select } from '@inquirer/prompts';
import path from 'path';
import { mkdir } from 'fs/promises';
import { copy, readJSON, writeJson } from 'fs-extra';
import { log } from 'console';

const main = async (): Promise<void> => {
  const projectName = await input({
    message: 'Project Name:',
    default: 'Babylon-App',
    validate: (name) => name !== '',
  });

  const buildTool = await select({
    message: 'Build Tools:',
    choices: [
      { value: 'vite', name: 'Vite' },
      { value: 'webpack', name: 'Webpack(not ready)', disabled: true },
    ],
  });

  const language = await select({
    message: 'Language:',
    choices: [
      { value: 'ts', name: 'TypeScript' },
      { value: 'js', name: 'JavaScript' },
    ],
  });

  const templateDir = path.resolve(
    __filename,
    '../..',
    'templates',
    `${buildTool}-${language}`
  );

  const workingDir = process.cwd();
  const appDir = path.join(workingDir, projectName);

  await mkdir(appDir);
  await copy(templateDir, appDir);

  const packageJsonPath = path.join(appDir, 'package.json');
  const packageJson = await readJSON(packageJsonPath);
  packageJson.name = projectName;
  await writeJson(packageJsonPath, packageJson, { spaces: '\t' });

  log('\nDone!');
  log(`  cd ${projectName}\n`);
};

main();
