import { Playground } from './createScene';
import './style.css';
import { Engine } from '@babylonjs/core';

const main = () => {
  const renderCanvas = document.getElementById(
    'renderCanvas'
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas, true);

  const scene = Playground.CreateScene(engine, renderCanvas);

  window.addEventListener('resize', () => {
    engine.resize();
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
