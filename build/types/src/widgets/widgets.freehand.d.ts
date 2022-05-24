/**
 * @module widgets/freehand
 */
export class widgetsFreehand extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _stack: any;
    _calibrationFactor: any;
    _area: number;
    _units: string;
    _initialized: boolean;
    _moving: boolean;
    _domHovered: boolean;
    _material: AMIThree.MeshBasicMaterial;
    _geometry: AMIThree.ShapeGeometry;
    _mesh: AMIThree.Mesh<AMIThree.ShapeGeometry, AMIThree.MeshBasicMaterial>;
    _lines: any[];
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
    createMaterial(): void;
    createDOM(): void;
    createLine(): void;
    updateMesh(): void;
    _shapeWarn: boolean;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    isPointOnLine(pointA: any, pointB: any, pointToCheck: any): boolean;
    pushPopHandle(): boolean;
    updateDOMColor(): void;
    updateDOMContent(clear: any): void;
    updateDOMPosition(): void;
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
import * as AMIThree from "three";
