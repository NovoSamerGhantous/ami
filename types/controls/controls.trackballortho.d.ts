declare var _default: {
    new (object: any, domElement: any, state?: {
        NONE: number;
        ROTATE: number;
        ZOOM: number;
        PAN: number;
        SCROLL: number;
        TOUCH_ROTATE: number;
        TOUCH_ZOOM_PAN: number;
    }): {
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
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
};
export default _default;
export function trackballOrtho(): {
    new (object: any, domElement: any, state?: {
        NONE: number;
        ROTATE: number;
        ZOOM: number;
        PAN: number;
        SCROLL: number;
        TOUCH_ROTATE: number;
        TOUCH_ZOOM_PAN: number;
    }): {
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
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
};
import { Vector3 } from "three/src/math/Vector3";
//# sourceMappingURL=controls.trackballortho.d.ts.map