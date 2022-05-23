declare var _default: {
    new (stack: any): {
        _stack: any;
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
            uWorldBBox: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uSteps: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAlphaCorrection: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uFrequence: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmplitude: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShading: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbientColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecular: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecularColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uDiffuseColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShininess: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLightPosition: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uLightPositionInCamera: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uIntensity: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uAlgorithm: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        _material: import("three").ShaderMaterial;
        _geometry: BoxGeometry;
        _mesh: any;
        _algorithm: number;
        _alphaCorrection: number;
        _interpolation: number;
        _shading: number;
        _shininess: number;
        _steps: number;
        _offset: number;
        _windowCenter: number;
        _windowWidth: number;
        _create(): void;
        _prepareStack(): void;
        _prepareMaterial(): void;
        _prepareGeometry(): void;
        uniforms: {
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
            uWorldBBox: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uSteps: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAlphaCorrection: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uFrequence: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmplitude: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShading: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbientColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecular: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecularColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uDiffuseColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShininess: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLightPosition: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uLightPositionInCamera: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uIntensity: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uAlgorithm: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        mesh: any;
        stack: any;
        windowCenter: number;
        windowWidth: number;
        steps: number;
        alphaCorrection: number;
        interpolation: number;
        shading: number;
        shininess: number;
        algorithm: number;
        dispose(): void;
        _createMaterial(extraOptions: any): void;
        _updateMaterial(): void;
        _prepareTexture(): void;
        id: number;
        uuid: string;
        name: string;
        type: string;
        parent: import("three").Object3D<import("three").Event>;
        children: import("three").Object3D<import("three").Event>[];
        up: import("three").Vector3;
        readonly position: import("three").Vector3;
        readonly rotation: import("three").Euler;
        readonly quaternion: import("three").Quaternion;
        readonly scale: import("three").Vector3;
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
        setRotationFromAxisAngle(axis: import("three").Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: Matrix4): void;
        setRotationFromQuaternion(q: import("three").Quaternion): void;
        rotateOnAxis(axis: import("three").Vector3, angle: number): any;
        rotateOnWorldAxis(axis: import("three").Vector3, angle: number): any;
        rotateX(angle: number): any;
        rotateY(angle: number): any;
        rotateZ(angle: number): any;
        translateOnAxis(axis: import("three").Vector3, distance: number): any;
        translateX(distance: number): any;
        translateY(distance: number): any;
        translateZ(distance: number): any;
        localToWorld(vector: import("three").Vector3): import("three").Vector3;
        worldToLocal(vector: import("three").Vector3): import("three").Vector3;
        lookAt(vector: number | import("three").Vector3, y?: number, z?: number): void;
        add(...object: import("three").Object3D<import("three").Event>[]): any;
        remove(...object: import("three").Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: import("three").Object3D<import("three").Event>): any;
        getObjectById(id: number): import("three").Object3D<import("three").Event>;
        getObjectByName(name: string): import("three").Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): import("three").Object3D<import("three").Event>;
        getWorldPosition(target: import("three").Vector3): import("three").Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: import("three").Vector3): import("three").Vector3;
        getWorldDirection(target: import("three").Vector3): import("three").Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<import("three").Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
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
    DefaultUp: import("three").Vector3;
    DefaultMatrixAutoUpdate: boolean;
};
export default _default;
export function helpersVolumeRendering(): {
    new (stack: any): {
        _stack: any;
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
            uWorldBBox: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uSteps: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAlphaCorrection: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uFrequence: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmplitude: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShading: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbientColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecular: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecularColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uDiffuseColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShininess: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLightPosition: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uLightPositionInCamera: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uIntensity: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uAlgorithm: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        _material: import("three").ShaderMaterial;
        _geometry: BoxGeometry;
        _mesh: any;
        _algorithm: number;
        _alphaCorrection: number;
        _interpolation: number;
        _shading: number;
        _shininess: number;
        _steps: number;
        _offset: number;
        _windowCenter: number;
        _windowWidth: number;
        _create(): void;
        _prepareStack(): void;
        _prepareMaterial(): void;
        _prepareGeometry(): void;
        uniforms: {
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
            uWorldBBox: {
                type: string;
                value: number[];
                typeGLSL: string;
                length: number;
            };
            uSteps: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAlphaCorrection: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uFrequence: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmplitude: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShading: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uAmbientColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToAmbient: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecular: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uSpecularColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uDiffuseColor: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uSampleColorToDiffuse: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uShininess: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uLightPosition: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uLightPositionInCamera: {
                type: string;
                value: number;
                typeGLSL: string;
            };
            uIntensity: {
                type: string;
                value: number[];
                typeGLSL: string;
            };
            uAlgorithm: {
                type: string;
                value: number;
                typeGLSL: string;
            };
        };
        mesh: any;
        stack: any;
        windowCenter: number;
        windowWidth: number;
        steps: number;
        alphaCorrection: number;
        interpolation: number;
        shading: number;
        shininess: number;
        algorithm: number;
        dispose(): void;
        _createMaterial(extraOptions: any): void;
        _updateMaterial(): void;
        _prepareTexture(): void;
        id: number;
        uuid: string;
        name: string;
        type: string;
        parent: import("three").Object3D<import("three").Event>;
        children: import("three").Object3D<import("three").Event>[];
        up: import("three").Vector3;
        readonly position: import("three").Vector3;
        readonly rotation: import("three").Euler;
        readonly quaternion: import("three").Quaternion;
        readonly scale: import("three").Vector3;
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
        setRotationFromAxisAngle(axis: import("three").Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: Matrix4): void;
        setRotationFromQuaternion(q: import("three").Quaternion): void;
        rotateOnAxis(axis: import("three").Vector3, angle: number): any;
        rotateOnWorldAxis(axis: import("three").Vector3, angle: number): any;
        rotateX(angle: number): any;
        rotateY(angle: number): any;
        rotateZ(angle: number): any;
        translateOnAxis(axis: import("three").Vector3, distance: number): any;
        translateX(distance: number): any;
        translateY(distance: number): any;
        translateZ(distance: number): any;
        localToWorld(vector: import("three").Vector3): import("three").Vector3;
        worldToLocal(vector: import("three").Vector3): import("three").Vector3;
        lookAt(vector: number | import("three").Vector3, y?: number, z?: number): void;
        add(...object: import("three").Object3D<import("three").Event>[]): any;
        remove(...object: import("three").Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: import("three").Object3D<import("three").Event>): any;
        getObjectById(id: number): import("three").Object3D<import("three").Event>;
        getObjectByName(name: string): import("three").Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): import("three").Object3D<import("three").Event>;
        getWorldPosition(target: import("three").Vector3): import("three").Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: import("three").Vector3): import("three").Vector3;
        getWorldDirection(target: import("three").Vector3): import("three").Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<import("three").Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
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
    DefaultUp: import("three").Vector3;
    DefaultMatrixAutoUpdate: boolean;
};
import ShadersFragment from "../shaders/shaders.vr.fragment";
import ShadersVertex from "../shaders/shaders.vr.vertex";
import { Matrix4 } from "three/src/math/Matrix4";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
//# sourceMappingURL=helpers.volumerendering.d.ts.map