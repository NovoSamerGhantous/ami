/**
 * @module widgets/velocityTimeIntegral
 */
export class widgetsVelocityTimeIntegral extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _regions: any;
    _vMax: number;
    _vMean: number;
    _gMax: number;
    _gMean: number;
    _envTi: number;
    _vti: number;
    _extraInfo: any;
    _initialized: boolean;
    _isHandleActive: boolean;
    _domHovered: boolean;
    _initialRegion: number;
    _usPoints: any[];
    _material: AMIThree.LineBasicMaterial;
    _geometry: AMIThree.BufferGeometry;
    _mesh: AMIThree.Line<AMIThree.BufferGeometry, AMIThree.LineBasicMaterial>;
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
    isCorrectRegion(shift: any): boolean;
    checkHandle(index: any, shift: any): boolean;
    create(): void;
    createMaterial(): void;
    createDOM(): void;
    createLine(): void;
    pushPopHandle(): boolean;
    isPointOnLine(pointA: any, pointB: any, pointToCheck: any): boolean;
    finalize(): void;
    updateValues(): void;
    _shapeWarn: boolean;
    updateMesh(): void;
    updateMeshColor(): void;
    updateDOMColor(): void;
    updateDOMContent(clear: any): void;
    updateDOMPosition(): void;
    getMeasurements(): {
        vMax: number;
        vMean: number;
        gMax: number;
        gMean: number;
        envTi: number;
        vti: number;
    };
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    set extraInfo(arg: any);
    get extraInfo(): any;
}
import { widgetsBase } from "./widgets.base";
import * as AMIThree from "three";
