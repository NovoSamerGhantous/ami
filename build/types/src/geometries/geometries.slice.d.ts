/**
 *
 * It is typically used for creating an irregular 3D planar shape given a box and the cut-plane.
 *
 * Demo: {@link https://fnndsc.github.io/vjs#geometry_slice}
 *
 * @module geometries/slice
 *
 * @param {Vector3} halfDimensions - Half-dimensions of the box to be sliced.
 * @param {Vector3} center - Center of the box to be sliced.
 * @param {Vector3<Vector3>} orientation - Orientation of the box to be sliced. (might not be necessary..?)
 * @param {Vector3} position - Position of the cutting plane.
 * @param {Vector3} direction - Cross direction of the cutting plane.
 *
 * @example
 * // Define box to be sliced
 * let halfDimensions = new THREE.Vector(123, 45, 67);
 * let center = new Vector3(0, 0, 0);
 * let orientation = new Vector3(
 *   new Vector3(1, 0, 0),
 *   new Vector3(0, 1, 0),
 *   new Vector3(0, 0, 1)
 * );
 *
 * // Define slice plane
 * let position = center.clone();
 * let direction = new Vector3(-0.2, 0.5, 0.3);
 *
 * // Create the slice geometry & materials
 * let sliceGeometry = new VJS.geometries.slice(halfDimensions, center, orientation, position, direction);
 * let sliceMaterial = new THREE.MeshBasicMaterial({
 *   'side': THREE.DoubleSide,
 *   'color': 0xFF5722
 * });
 *
 *  // Create mesh and add it to the scene
 *  let slice = new THREE.Mesh(sliceGeometry, sliceMaterial);
 *  scene.add(slice);
 */
export class geometriesSlice extends ShapeBufferGeometry {
    constructor(halfDimensions: any, center: any, position: any, direction: any, toAABB?: Matrix4);
    vertices: Object[];
}
import { ShapeBufferGeometry } from "three/src/geometries/ShapeGeometry";
import { Matrix4 } from "three/src/math/Matrix4";
