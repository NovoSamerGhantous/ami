import { COLORS } from '../core/core.colors';
import * as AMIThree from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferGeometry, Material, Matrix4, Mesh, Object3D, Vector3 } from 'three';
interface WidgetParameter {
    calibrationFactor: number;
    frameIndex: number;
    hideMesh: boolean;
    hideHandleMesh: boolean;
    ijk2LPS: Matrix4;
    lps2IJK: Matrix4;
    pixelSpacing: number;
    stack: {};
    ultrasoundRegions: Array<USRegion & {
        unitsX: string;
        unitsY: string;
    }>;
    worldPosition: Vector3;
}
interface USRegion {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    axisX: number;
    axisY: number;
    deltaX: number;
    deltaY: number;
}
/**
 * @module Abstract Widget
 */
declare class widgetsBase extends Object3D {
    _widgetType: string;
    _params: WidgetParameter;
    _enabled: boolean;
    _selected: boolean;
    _hovered: boolean;
    _active: boolean;
    _colors: {
        default: COLORS;
        active: COLORS;
        hover: COLORS;
        select: COLORS;
        text: COLORS;
        error: COLORS;
    };
    _color: any;
    _dragged: boolean;
    _displayed: boolean;
    _targetMesh: Mesh<BufferGeometry, Material | Material[]>;
    _controls: OrbitControls;
    _camera: any;
    _container: any;
    _worldPosition: Vector3;
    _offsets: {
        top: number;
        left: number;
    };
    _handles: any[];
    constructor(targetMesh: Mesh, controls: OrbitControls, params: WidgetParameter);
    initOffsets(): void;
    getMouseOffsets(event: MouseEvent, container: HTMLDivElement): {
        x: number;
        y: number;
        screenX: number;
        screenY: number;
    };
    /**
     * Get area of polygon.
     *
     * @param {Array} points Ordered vertices' coordinates
     *
     * @returns {Number}
     */
    getArea(points: Vector3[]): number;
    /**
     * Get index of ultrasound region by data coordinates.
     *
     * @param {Array}   regions US regions
     * @param {Vector3} point   Data coordinates
     *
     * @returns {Number|null}
     */
    getRegionByXY(regions: USRegion[], point: Vector3): number;
    /**
     * Get point inside ultrasound region by data coordinates.
     *
     * @param {Object}  region US region data
     * @param {Vector3} point  Data coordinates
     *
     * @returns {Vector2|null}
     */
    getPointInRegion(region: USRegion, point: Vector3): AMIThree.Vector2;
    /**
     * Get point's ultrasound coordinates by data coordinates.
     *
     * @param {Array}   regions US regions
     * @param {Vector3} point   Data coordinates
     *
     * @returns {Vector2|null}
     */
    getUsPoint(regions: USRegion[], point: Vector3): AMIThree.Vector2;
    /**
     * Get distance between points inside ultrasound region.
     *
     * @param {Vector3} pointA Begin data coordinates
     * @param {Vector3} pointB End data coordinates
     *
     * @returns {Number|null}
     */
    getUsDistance(pointA: Vector3, pointB: Vector3): number;
    /**
     * Get distance between points
     *
     * @param {Vector3} pointA Begin world coordinates
     * @param {Vector3} pointB End world coordinates
     * @param {number}  cf     Calibration factor
     *
     * @returns {Object}
     */
    getDistanceData(pointA: Vector3, pointB: Vector3, calibrationFactor: number): {
        distance: number;
        units: string;
    };
    getLineData(pointA: Vector3, pointB: Vector3): {
        line: AMIThree.Vector3;
        length: number;
        transformX: number;
        transformY: number;
        transformAngle: number;
        center: AMIThree.Vector3;
    };
    getRectData(pointA: Vector3, pointB: Vector3): {
        width: number;
        height: number;
        transformX: number;
        transformY: number;
        paddingVector: AMIThree.Vector3;
    };
    /**
     * @param {HTMLElement} label
     * @param {Vector3}     point  label's center coordinates (default)
     * @param {Boolean}     corner if true, then point is the label's top left corner coordinates
     */
    adjustLabelTransform(label: HTMLDivElement, point: Vector3, corner: boolean): AMIThree.Vector2;
    worldToScreen(worldCoordinate: Vector3): AMIThree.Vector3;
    update(): void;
    updateColor(): void;
    setDefaultColor(color: any): void;
    show(): void;
    hide(): void;
    hideDOM(): void;
    showDOM(): void;
    hideMesh(): void;
    showMesh(): void;
    free(): void;
    get widgetType(): string;
    get targetMesh(): Mesh;
    set targetMesh(targetMesh: Mesh);
    get worldPosition(): Vector3;
    set worldPosition(worldPosition: Vector3);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get selected(): boolean;
    set selected(selected: boolean);
    get hovered(): boolean;
    set hovered(hovered: boolean);
    get dragged(): boolean;
    set dragged(dragged: boolean);
    get displayed(): boolean;
    set displayed(displayed: boolean);
    get active(): boolean;
    set active(active: boolean);
    get color(): any;
    set color(color: any);
}
export { widgetsBase };
