/**
 * @module widgets/rectangle
 */
export class widgetsRectangle extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _stack: any;
    _calibrationFactor: any;
    _area: number;
    _units: string;
    _moving: boolean;
    _domHovered: boolean;
    _material: MeshBasicMaterial;
    _geometry: PlaneGeometry;
    _mesh: Mesh<PlaneGeometry, MeshBasicMaterial>;
    _rectangle: HTMLDivElement;
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
    updateRoI(clear: any): void;
    updateDOMColor(): void;
    updateDOM(): void;
    getMeasurements(): {
        area: number;
        units: string;
    };
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    set calibrationFactor(arg: any);
    get calibrationFactor(): any;
}
import { widgetsBase } from "./widgets.base";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry";
import { Mesh } from "three/src/objects/Mesh";
