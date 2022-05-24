/**
 * @module widgets/biruler
 */
export class widgetsBiruler extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _calibrationFactor: any;
    _distance: number;
    _distance2: number;
    _units: string;
    _material: LineBasicMaterial;
    _geometry: any;
    _mesh: LineSegments<any, LineBasicMaterial>;
    _line: HTMLDivElement;
    _label: HTMLDivElement;
    _line2: HTMLDivElement;
    _label2: HTMLDivElement;
    _dashline: HTMLDivElement;
    onMove(evt: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    onStart(evt: any): void;
    onEnd(): void;
    create(): void;
    createMesh(): void;
    createDOM(): void;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    /**
     * Get length of rulers
     *
     * @return {Array}
     */
    getDistances(): any[];
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    set calibrationFactor(arg: any);
    get calibrationFactor(): any;
    get shotestDistance(): number;
    get longestDistance(): number;
}
import { widgetsBase } from "./widgets.base";
import { LineBasicMaterial } from "three/src/materials/LineBasicMaterial";
import { LineSegments } from "three/src/objects/LineSegments";
