import { input, select } from '@inquirer/prompts';

const main = async (): Promise<void> => {
  console.log('working directory: ', process.cwd());
  console.log('url: ', import.meta.url);

  // const projectName = await input({
  //   message: 'Project Name:',
  //   default: 'Babylon-App',
  //   validate: (name) => name !== '',
  // });

  // const buildTool = await select({
  //   message: 'Build Tools:',
  //   choices: [
  //     { value: 'vite', name: 'Vite' },
  //     { value: 'webpack', name: 'Webpack(not ready)', disabled: true },
  //   ],
  // });

  // const language = await select({
  //   message: 'Language:',
  //   choices: [
  //     { value: 'ts', name: 'TypeScript' },
  //     { value: 'js', name: 'JavaScript' },
  //   ],
  // });

  // console.log(projectName, buildTool, language);
};

main();
