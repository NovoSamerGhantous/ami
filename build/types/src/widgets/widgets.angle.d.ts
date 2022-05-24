/**
 * @module widgets/angle
 */
export class widgetsAngle extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _opangle: any;
    _moving: boolean;
    _domHovered: boolean;
    _defaultAngle: boolean;
    _material: LineBasicMaterial;
    _geometry: BufferGeometry;
    _mesh: LineSegments<BufferGeometry, LineBasicMaterial>;
    _line: HTMLDivElement;
    _line2: HTMLDivElement;
    _label: HTMLDivElement;
    _moveHandle: any;
    onMove(evt: any): void;
    onHover(evt: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    hoverMesh(): void;
    hoverDom(evt: any): void;
    onStart(evt: any): void;
    onEnd(): void;
    create(): void;
    createMesh(): void;
    createDOM(): void;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    toggleDefaultAngle(): void;
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    get angle(): any;
}
import { widgetsBase } from "./widgets.base";
import { LineBasicMaterial } from "three/src/materials/LineBasicMaterial";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { LineSegments } from "three/src/objects/LineSegments";
