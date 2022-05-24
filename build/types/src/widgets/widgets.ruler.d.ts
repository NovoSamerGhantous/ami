/**
 * @module widgets/ruler
 */
export class widgetsRuler extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _calibrationFactor: any;
    _distance: number;
    _units: string;
    _moving: boolean;
    _domHovered: boolean;
    _material: LineBasicMaterial;
    _geometry: any;
    _mesh: Line<any, LineBasicMaterial>;
    _line: HTMLDivElement;
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
    getMeasurements(): {
        distance: number;
        units: string;
    };
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    set calibrationFactor(arg: any);
    get calibrationFactor(): any;
}
import { widgetsBase } from "./widgets.base";
import { LineBasicMaterial } from "three/src/materials/LineBasicMaterial";
import { Line } from "three/src/objects/Line";
