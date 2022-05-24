/**
 * @module helpers/border
 */
export class helpersBorder extends Object3D<import("three").Event> {
    constructor(helpersSlice: any);
    _helpersSlice: any;
    _visible: boolean;
    _color: number;
    _material: LineBasicMaterial;
    _geometry: BufferGeometry;
    _mesh: Line<BufferGeometry, LineBasicMaterial>;
    set helpersSlice(arg: any);
    get helpersSlice(): any;
    set color(arg: number);
    get color(): number;
    _create(): void;
    _update(): void;
    dispose(): void;
}
import { Object3D } from "three/src/core/Object3D";
import { LineBasicMaterial } from "three/src/materials/LineBasicMaterial";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { Line } from "three/src/objects/Line";
