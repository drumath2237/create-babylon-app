import "./style.css";

import { Engine, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

const main = () => {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);
  scene.createDefaultEnvironment();

  const box = MeshBuilder.CreateBox("box", { size: 0.5 });
  box.position = new Vector3(0, 0.25, 0);

  window.addEventListener("resize", () => engine.resize());
  engine.runRenderLoop(() => scene.render());
};

main();

