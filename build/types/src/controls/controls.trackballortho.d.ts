/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Patrick Fuller / http://patrick-fuller.com
 * @author Max Smolens / https://github.com/msmolens
 */
export class trackballOrtho extends EventDispatcher<import("three").Event> {
    constructor(object: any, domElement: any, state?: {
        NONE: number;
        ROTATE: number;
        ZOOM: number;
        PAN: number;
        SCROLL: number;
        TOUCH_ROTATE: number;
        TOUCH_ZOOM_PAN: number;
    });
    object: any;
    domElement: any;
    enabled: boolean;
    screen: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    radius: number;
    zoomSpeed: number;
    noZoom: boolean;
    noPan: boolean;
    staticMoving: boolean;
    dynamicDampingFactor: number;
    keys: number[];
    target: Vector3;
    target0: Vector3;
    position0: any;
    up0: any;
    left0: any;
    right0: any;
    top0: any;
    bottom0: any;
    /** @type Class */
    handleResize: Class;
    handleEvent: (event: any) => void;
    zoomCamera: () => void;
    panCamera: () => void;
    update: () => void;
    reset: () => void;
    dispose: () => void;
}
import { EventDispatcher } from "three/src/core/EventDispatcher";
import { Vector3 } from "three/src/math/Vector3";
