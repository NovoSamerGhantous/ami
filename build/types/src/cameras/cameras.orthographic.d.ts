/**
 * Orthographic camera from THREE.JS with some extra convenience
 * functionalities.
 *
 * @example
 * //
 * //
 *
 * @module cameras/orthographic
 */
export class camerasOrthographic extends OrthographicCamera {
    constructor(left: any, right: any, top: any, bottom: any, near: any, far: any);
    _front: any;
    _back: any;
    _directions: Vector3[];
    _directionsLabel: string[];
    _orientation: string;
    _convention: string;
    _stackOrientation: number;
    _right: any;
    _up: any;
    _direction: any;
    _controls: any;
    _box: any;
    _canvas: {
        width: any;
        height: any;
    };
    _fromFront: boolean;
    _angle: number;
    /**
     * Initialize orthographic camera variables
     */
    init(xCosine: any, yCosine: any, zCosine: any, controls: any, box: any, canvas: any): boolean;
    update(): void;
    leftDirection(): number;
    posteriorDirection(): number;
    superiorDirection(): number;
    /**
     * Invert rows in the current slice.
     * Inverting rows in 2 steps:
     *   * Flip the "up" vector
     *   * Look at the slice from the other side
     */
    invertRows(): void;
    /**
     * Invert rows in the current slice.
     * Inverting rows in 1 step:
     *   * Look at the slice from the other side
     */
    invertColumns(): void;
    /**
     * Center slice in the camera FOV.
     * It also updates the controllers properly.
     * We can center a camera from the front or from the back.
     */
    center(): void;
    /**
     * Pi/2 rotation around the zCosine axis.
     * Clock-wise rotation from the user point of view.
     */
    rotate(angle?: any): void;
    fitBox(direction?: number, factor?: number): boolean;
    _adjustTopDirection(horizontalDirection: any, verticalDirection: any): any;
    _getMaxIndex(vector: any): number;
    _findMaxIndex(directions: any, target: any): number;
    _getMaxIndices(directions: any): number[];
    _orderIntersections(intersections: any, direction: any): any;
    _updateCanvas(): void;
    _oppositePosition(position: any): any;
    _computeZoom(dimension: any, direction: any): number | false;
    _updatePositionAndTarget(position: any, target: any): void;
    _updateMatrices(): void;
    _updateLabels(): void;
    _vector2Label(direction: any): string;
    _updateDirections(): void;
    set controls(arg: any);
    get controls(): any;
    set box(arg: any);
    get box(): any;
    set canvas(arg: {
        width: any;
        height: any;
    });
    get canvas(): {
        width: any;
        height: any;
    };
    set angle(arg: number);
    get angle(): number;
    set directions(arg: Vector3[]);
    get directions(): Vector3[];
    set convention(arg: string);
    get convention(): string;
    set orientation(arg: string);
    get orientation(): string;
    set directionsLabel(arg: string[]);
    get directionsLabel(): string[];
    set stackOrientation(arg: number);
    get stackOrientation(): number;
}
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera";
import { Vector3 } from "three/src/math/Vector3";
