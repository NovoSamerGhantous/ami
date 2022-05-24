/**
 * Original authors from THREEJS repo
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */
export class trackball extends EventDispatcher<import("three").Event> {
    constructor(object: any, domElement: any);
    object: any;
    domElement: any;
    enabled: boolean;
    screen: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noRotate: boolean;
    noZoom: boolean;
    noPan: boolean;
    noCustom: boolean;
    forceState: number;
    staticMoving: boolean;
    dynamicDampingFactor: number;
    minDistance: number;
    maxDistance: number;
    keys: number[];
    target: Vector3;
    target0: Vector3;
    position0: any;
    up0: any;
    handleResize: () => void;
    handleEvent: (event: any) => void;
    rotateCamera: () => void;
    zoomCamera: () => void;
    panCamera: () => void;
    checkDistances: () => void;
    update: () => void;
    reset: () => void;
    setState: (targetState: any) => void;
    custom: (customStart: any, customEnd: any) => void;
    dispose: () => void;
}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import { Vector3 } from "three/src/math/Vector3";
