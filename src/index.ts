import { input, select } from '@inquirer/prompts';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';
import { copy } from 'fs-extra';

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
    fileURLToPath(import.meta.url),
    '../..',
    'templates',
    `${buildTool}-${language}`
  );

  const workingDir = process.cwd();
  const appDir = path.join(workingDir, projectName);

  await mkdir(appDir);
  await copy(templateDir, appDir);
};

main();
