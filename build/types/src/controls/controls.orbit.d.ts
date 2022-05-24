/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
export default class OrbitControls extends EventDispatcher<import("three").Event> {
    constructor(object: any, domElement: any);
    get center(): Vector3;
    set noZoom(arg: boolean);
    get noZoom(): boolean;
    enableZoom: boolean;
    set noRotate(arg: boolean);
    get noRotate(): boolean;
    enableRotate: boolean;
    set noPan(arg: boolean);
    get noPan(): boolean;
    enablePan: boolean;
    set noKeys(arg: boolean);
    get noKeys(): boolean;
    enableKeys: boolean;
    set staticMoving(arg: boolean);
    get staticMoving(): boolean;
    enableDamping: boolean;
    set dynamicDampingFactor(arg: number);
    get dynamicDampingFactor(): number;
    dampingFactor: number;
    object: any;
    domElement: any;
    enabled: boolean;
    preventDefault: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    zoomSpeed: number;
    rotateSpeed: number;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    keys: {
        LEFT: number;
        UP: number;
        RIGHT: number;
        BOTTOM: number;
    };
    mouseButtons: {
        LEFT: MOUSE;
        MIDDLE: MOUSE;
        RIGHT: MOUSE;
    };
    target0: Vector3;
    position0: any;
    zoom0: any;
    getPolarAngle: () => number;
    getAzimuthalAngle: () => number;
    saveState: () => void;
    reset: () => void;
    handleResize: () => void;
    update: () => boolean;
    dispose: () => void;
}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import { Vector3 } from "three/src/math/Vector3";
import { MOUSE } from "three/src/constants";
