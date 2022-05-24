/**
 * @module widgets/pressureHalfTime
 */
export class widgetsPressureHalfTime extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _regions: any;
    _vMax: any;
    _gMax: number;
    _pht: number;
    _mva: number;
    _dt: number;
    _ds: number;
    _domHovered: boolean;
    _initialRegion: number;
    _material: AMIThree.LineBasicMaterial;
    _geometry: any;
    _mesh: AMIThree.Line<any, AMIThree.LineBasicMaterial>;
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
    isCorrectRegion(shift: any): boolean;
    checkHandle(index: any, shift: any): boolean;
    create(): void;
    createMesh(): void;
    createDOM(): void;
    updateValues(): void;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    getMeasurements(): {
        vMax: any;
        gMax: number;
        pht: number;
        mva: number;
        dt: number;
        ds: number;
    };
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
}
import { widgetsBase } from "./widgets.base";
import * as AMIThree from "three";
