/**
 * @module widgets/crossRuler
 */
export class widgetsCrossRuler extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _calibrationFactor: any;
    _distances: any[];
    _line01: any;
    _normal: any;
    _distance: number;
    _distance2: number;
    _units: string;
    _domHovered: boolean;
    _moving: boolean;
    _material: AMIThree.LineBasicMaterial;
    _geometry: any;
    _mesh: AMIThree.LineSegments<any, AMIThree.LineBasicMaterial>;
    _line: HTMLDivElement;
    _line2: HTMLDivElement;
    _label: HTMLDivElement;
    _label2: HTMLDivElement;
    _moveHandle: any;
    onHover(evt: any): void;
    onMove(evt: any): void;
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
    initLineAndNormal(): void;
    initOrtho(): void;
    repositionOrtho(): void;
    recalculateOrtho(): void;
    /**
     * Get length of rulers
     *
     * @return {Array}
     */
    getDimensions(): any[];
    /**
     * Get CrossRuler handles position
     *
     * @return {Array.<Vector3>} First begin, first end, second begin, second end
     */
    getCoordinates(): Array<Vector3>;
    /**
     * Set CrossRuler handles position
     *
     * @param {Vector3} first   The beginning of the first line
     * @param {Vector3} second  The end of the first line
     * @param {Vector3} third   The beginning of the second line (clockwise relative to the first line)
     * @param {Vector3} fourth  The end of the second line
     */
    initCoordinates(first: Vector3, second: Vector3, third: Vector3, fourth: Vector3): void;
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
    set calibrationFactor(arg: any);
    get calibrationFactor(): any;
}
import { widgetsBase } from "./widgets.base";
import * as AMIThree from "three";
import { Vector3 } from "three/src/math/Vector3";
