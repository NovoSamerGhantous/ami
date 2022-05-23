declare var _default: {
    new (stack: any, index?: number, position?: Vector3, direction?: Vector3, aabbSpace?: string): {
        _stack: any;
        _invert: any;
        _lut: string;
        _lutTexture: any;
        _intensityAuto: boolean;
        _interpolation: number;
        _index: number;
        _windowWidth: any;
        _windowCenter: any;
        _opacity: number;
        _rescaleSlope: any;
        _rescaleIntercept: any;
        _spacing: number;
        _thickness: number;
        _thicknessMethod: number;
        _lowerThreshold: any;
        _upperThreshold: any;
        _canvasWidth: number;
        _canvasHeight: number;
        _borderColor: any;
        _planePosition: Vector3;
        _planeDirection: Vector3;
        _aaBBspace: string;
        _material: import("three").ShaderMaterial;
        _textures: any[];
        _shadersFragment: typeof ShadersFragment;
        _shadersVertex: typeof ShadersVertex;
        _uniforms: {
            uTextureSize: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureContainer: {
                type: string;
                value: any[];
                typeGLSL: string;
                length: number;
            };
            uDataDimensions: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uWorldToData: {
                type: string;
                value: Matrix4;
                typeGLSL: string;
            };
            uWindowCenterWidth: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uLowerUpperThreshold: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uRescaleSlopeIntercept: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uNumberOfChannels: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBitsAllocated: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uInvert: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLut: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureLUT: {
                type: string;
                value: any[];
                typeGLSL: string;
            };
            uLutSegmentation: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureLUTSegmentation: {
                type: string;
                value: any[];
                typeGLSL: string;
            };
            uPixelType: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uPackedPerPixel: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uInterpolation: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uCanvasWidth: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uCanvasHeight: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uBorderWidth: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderMargin: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderDashLength: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uOpacity: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpacing: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uThickness: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uThicknessMethod: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        _geometry: any;
        _mesh: any;
        _visible: boolean;
        stack: any;
        spacing: number;
        thickness: number;
        thicknessMethod: number;
        windowWidth: any;
        windowCenter: any;
        opacity: number;
        upperThreshold: any;
        lowerThreshold: any;
        rescaleSlope: any;
        rescaleIntercept: any;
        invert: any;
        lut: string;
        lutTexture: any;
        intensityAuto: boolean;
        interpolation: number;
        index: number;
        planePosition: Vector3;
        planeDirection: Vector3;
        halfDimensions: any;
        _halfDimensions: any;
        center: any;
        _center: any;
        aabbSpace: string;
        mesh: any;
        geometry: any;
        canvasWidth: number;
        canvasHeight: number;
        borderColor: any;
        _init(): void;
        _toAABB: any;
        _create(): void;
        updateIntensitySettings(): void;
        updateIntensitySettingsUniforms(): void;
        updateIntensitySetting(setting: any): void;
        _update(): void;
        dispose(): void;
        cartesianEquation(): Vector4;
        _createMaterial(extraOptions: any): void;
        _updateMaterial(): void;
        _prepareTexture(): void;
        id: number;
        uuid: string;
        name: string;
        type: string;
        parent: Object3D<import("three").Event>;
        children: Object3D<import("three").Event>[];
        up: Vector3;
        readonly position: Vector3;
        readonly rotation: import("three").Euler;
        readonly quaternion: import("three").Quaternion;
        readonly scale: Vector3;
        readonly modelViewMatrix: Matrix4;
        readonly normalMatrix: import("three").Matrix3;
        matrix: Matrix4;
        matrixWorld: Matrix4;
        matrixAutoUpdate: boolean;
        matrixWorldNeedsUpdate: boolean;
        layers: import("three").Layers;
        visible: boolean;
        castShadow: boolean;
        receiveShadow: boolean;
        frustumCulled: boolean;
        renderOrder: number;
        animations: import("three").AnimationClip[];
        userData: {
            [key: string]: any;
        };
        customDepthMaterial: import("three").Material;
        customDistanceMaterial: import("three").Material;
        readonly isObject3D: true;
        onBeforeRender: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
        onAfterRender: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
        applyMatrix4(matrix: Matrix4): void;
        applyQuaternion(quaternion: import("three").Quaternion): any;
        setRotationFromAxisAngle(axis: Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: Matrix4): void;
        setRotationFromQuaternion(q: import("three").Quaternion): void;
        rotateOnAxis(axis: Vector3, angle: number): any;
        rotateOnWorldAxis(axis: Vector3, angle: number): any;
        rotateX(angle: number): any;
        rotateY(angle: number): any;
        rotateZ(angle: number): any;
        translateOnAxis(axis: Vector3, distance: number): any;
        translateX(distance: number): any;
        translateY(distance: number): any;
        translateZ(distance: number): any;
        localToWorld(vector: Vector3): Vector3;
        worldToLocal(vector: Vector3): Vector3;
        lookAt(vector: number | Vector3, y?: number, z?: number): void;
        add(...object: Object3D<import("three").Event>[]): any;
        remove(...object: Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: Object3D<import("three").Event>): any;
        getObjectById(id: number): Object3D<import("three").Event>;
        getObjectByName(name: string): Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): Object3D<import("three").Event>;
        getWorldPosition(target: Vector3): Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: Vector3): Vector3;
        getWorldDirection(target: Vector3): Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: Object3D<import("three").Event>) => any): void;
        updateMatrix(): void;
        updateMatrixWorld(force?: boolean): void;
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;
        toJSON(meta?: {
            geometries: any;
            materials: any;
            textures: any;
            images: any;
        }): any;
        clone(recursive?: boolean): any;
        copy(source: any, recursive?: boolean): any;
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
    DefaultUp: Vector3;
    DefaultMatrixAutoUpdate: boolean;
};
export default _default;
/**
 * @module helpers/slice
 */
export function helpersSlice(): {
    new (stack: any, index?: number, position?: Vector3, direction?: Vector3, aabbSpace?: string): {
        _stack: any;
        _invert: any;
        _lut: string;
        _lutTexture: any;
        _intensityAuto: boolean;
        _interpolation: number;
        _index: number;
        _windowWidth: any;
        _windowCenter: any;
        _opacity: number;
        _rescaleSlope: any;
        _rescaleIntercept: any;
        _spacing: number;
        _thickness: number;
        _thicknessMethod: number;
        _lowerThreshold: any;
        _upperThreshold: any;
        _canvasWidth: number;
        _canvasHeight: number;
        _borderColor: any;
        _planePosition: Vector3;
        _planeDirection: Vector3;
        _aaBBspace: string;
        _material: import("three").ShaderMaterial;
        _textures: any[];
        _shadersFragment: typeof ShadersFragment;
        _shadersVertex: typeof ShadersVertex;
        _uniforms: {
            uTextureSize: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureContainer: {
                type: string;
                value: any[];
                typeGLSL: string;
                length: number;
            };
            uDataDimensions: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uWorldToData: {
                type: string;
                value: Matrix4;
                typeGLSL: string;
            };
            uWindowCenterWidth: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uLowerUpperThreshold: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uRescaleSlopeIntercept: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uNumberOfChannels: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBitsAllocated: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uInvert: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLut: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureLUT: {
                type: string;
                value: any[];
                typeGLSL: string;
            };
            uLutSegmentation: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uTextureLUTSegmentation: {
                type: string;
                value: any[];
                typeGLSL: string;
            };
            uPixelType: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uPackedPerPixel: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uInterpolation: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uCanvasWidth: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uCanvasHeight: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uBorderWidth: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderMargin: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uBorderDashLength: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uOpacity: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpacing: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uThickness: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uThicknessMethod: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        _geometry: any;
        _mesh: any;
        _visible: boolean;
        stack: any;
        spacing: number;
        thickness: number;
        thicknessMethod: number;
        windowWidth: any;
        windowCenter: any;
        opacity: number;
        upperThreshold: any;
        lowerThreshold: any;
        rescaleSlope: any;
        rescaleIntercept: any;
        invert: any;
        lut: string;
        lutTexture: any;
        intensityAuto: boolean;
        interpolation: number;
        index: number;
        planePosition: Vector3;
        planeDirection: Vector3;
        halfDimensions: any;
        _halfDimensions: any;
        center: any;
        _center: any;
        aabbSpace: string;
        mesh: any;
        geometry: any;
        canvasWidth: number;
        canvasHeight: number;
        borderColor: any;
        _init(): void;
        _toAABB: any;
        _create(): void;
        updateIntensitySettings(): void;
        updateIntensitySettingsUniforms(): void;
        updateIntensitySetting(setting: any): void;
        _update(): void;
        dispose(): void;
        cartesianEquation(): Vector4;
        _createMaterial(extraOptions: any): void;
        _updateMaterial(): void;
        _prepareTexture(): void;
        id: number;
        uuid: string;
        name: string;
        type: string;
        parent: Object3D<import("three").Event>;
        children: Object3D<import("three").Event>[];
        up: Vector3;
        readonly position: Vector3;
        readonly rotation: import("three").Euler;
        readonly quaternion: import("three").Quaternion;
        readonly scale: Vector3;
        readonly modelViewMatrix: Matrix4;
        readonly normalMatrix: import("three").Matrix3;
        matrix: Matrix4;
        matrixWorld: Matrix4;
        matrixAutoUpdate: boolean;
        matrixWorldNeedsUpdate: boolean;
        layers: import("three").Layers;
        visible: boolean;
        castShadow: boolean;
        receiveShadow: boolean;
        frustumCulled: boolean;
        renderOrder: number;
        animations: import("three").AnimationClip[];
        userData: {
            [key: string]: any;
        };
        customDepthMaterial: import("three").Material;
        customDistanceMaterial: import("three").Material;
        readonly isObject3D: true;
        onBeforeRender: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
        onAfterRender: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
        applyMatrix4(matrix: Matrix4): void;
        applyQuaternion(quaternion: import("three").Quaternion): any;
        setRotationFromAxisAngle(axis: Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: Matrix4): void;
        setRotationFromQuaternion(q: import("three").Quaternion): void;
        rotateOnAxis(axis: Vector3, angle: number): any;
        rotateOnWorldAxis(axis: Vector3, angle: number): any;
        rotateX(angle: number): any;
        rotateY(angle: number): any;
        rotateZ(angle: number): any;
        translateOnAxis(axis: Vector3, distance: number): any;
        translateX(distance: number): any;
        translateY(distance: number): any;
        translateZ(distance: number): any;
        localToWorld(vector: Vector3): Vector3;
        worldToLocal(vector: Vector3): Vector3;
        lookAt(vector: number | Vector3, y?: number, z?: number): void;
        add(...object: Object3D<import("three").Event>[]): any;
        remove(...object: Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: Object3D<import("three").Event>): any;
        getObjectById(id: number): Object3D<import("three").Event>;
        getObjectByName(name: string): Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): Object3D<import("three").Event>;
        getWorldPosition(target: Vector3): Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: Vector3): Vector3;
        getWorldDirection(target: Vector3): Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: Object3D<import("three").Event>) => any): void;
        updateMatrix(): void;
        updateMatrixWorld(force?: boolean): void;
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;
        toJSON(meta?: {
            geometries: any;
            materials: any;
            textures: any;
            images: any;
        }): any;
        clone(recursive?: boolean): any;
        copy(source: any, recursive?: boolean): any;
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
    DefaultUp: Vector3;
    DefaultMatrixAutoUpdate: boolean;
};
import { Vector3 } from "three/src/math/Vector3";
import ShadersFragment from "../shaders/shaders.data.fragment";
import ShadersVertex from "../shaders/shaders.data.vertex";
import { Matrix4 } from "three/src/math/Matrix4";
import { Vector4 } from "three/src/math/Vector4";
import { Object3D } from "three/src/core/Object3D";
//# sourceMappingURL=helpers.slice.d.ts.map