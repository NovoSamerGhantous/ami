/**
 * @module helpers/boundingbox
 */
export class helpersBoundingBox extends Object3D<import("three").Event> {
    constructor(stack: any);
    _stack: any;
    _visible: boolean;
    _color: number;
    _material: import("three").Material | import("three").Material[] | MeshBasicMaterial;
    _geometry: BoxGeometry;
    _mesh: BoxHelper;
    _meshStack: Mesh<BoxGeometry, any>;
    set color(arg: number);
    get color(): number;
    _create(): void;
    _update(): void;
    dispose(): void;
}
import { Object3D } from "three/src/core/Object3D";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import { BoxHelper } from "three/src/helpers/BoxHelper";
import { Mesh } from "three/src/objects/Mesh";
