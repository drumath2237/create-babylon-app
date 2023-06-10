import { input, select } from '@inquirer/prompts';

const main = async (): Promise<void> => {
  const formatProjectName = (name: string) => name.trim();

  console.log(typeof formatProjectName === 'function');

  const projectName = await input({
    message: 'Project Name:',
    default: 'Babylon-App',
    validate: (name) => name !== '',
  });

  const buildTool = await select({
    message: 'Build Tools:',
    choices: [{ value: 'Vite' }, { value: 'Webpack' }],
  });

  const language = await select({
    message: 'Language:',
    choices: [{ value: 'TypeScript' }, { value: 'JavaScript' }],
  });

  console.log(projectName, buildTool, language);
};

main();
