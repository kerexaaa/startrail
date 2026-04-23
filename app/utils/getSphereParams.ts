import { Group, Object3DEventMap } from "three";
import * as THREE from "three";
import { SphereGeometryParameters } from "../types/index";

export const getSphereParams = (
  parentRef: Group<Object3DEventMap>,
): SphereGeometryParameters | null => {
  let result: SphereGeometryParameters | null = null;

  parentRef.traverse((child) => {
    if (result) return;

    if (
      child.name === "planet" &&
      child instanceof THREE.Mesh &&
      child.geometry instanceof THREE.SphereGeometry
    ) {
      result = child.geometry.parameters;
    }
  });

  return result;
};
