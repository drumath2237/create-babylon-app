import { MeshBuilder, Vector3 } from "@babylonjs/core";

export const createSphere = (size: number, position: Vector3) => {
  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: size });
  sphere.position = position;
  return sphere;
};
