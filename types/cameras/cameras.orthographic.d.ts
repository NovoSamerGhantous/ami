declare var _default: {
    new (left: any, right: any, top: any, bottom: any, near: any, far: any): {
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
        zoom: number;
        _adjustTopDirection(horizontalDirection: any, verticalDirection: any): any;
        _getMaxIndex(vector: any): number;
        _findMaxIndex(directions: any, target: any): number;
        _getMaxIndices(directions: any): number[];
        _orderIntersections(intersections: any, direction: any): any;
        _updateCanvas(): void;
        left: number;
        right: number;
        top: number;
        bottom: number;
        _oppositePosition(position: any): any;
        _computeZoom(dimension: any, direction: any): number | false;
        _updatePositionAndTarget(position: any, target: any): void;
        _updateMatrices(): void;
        _updateLabels(): void;
        _vector2Label(direction: any): string;
        _updateDirections(): void;
        controls: any;
        box: any;
        canvas: {
            width: any;
            height: any;
        };
        angle: number;
        directions: Vector3[];
        convention: string;
        orientation: string;
        directionsLabel: string[];
        stackOrientation: number;
        type: "OrthographicCamera";
        readonly isOrthographicCamera: true;
        view: {
            enabled: boolean;
            fullWidth: number;
            fullHeight: number;
            offsetX: number;
            offsetY: number;
            width: number;
            height: number;
        };
        near: number;
        far: number;
        updateProjectionMatrix(): void;
        setViewOffset(fullWidth: number, fullHeight: number, offsetX: number, offsetY: number, width: number, height: number): void;
        clearViewOffset(): void;
        toJSON(meta?: any): any;
        matrixWorldInverse: Matrix4;
        projectionMatrix: Matrix4;
        projectionMatrixInverse: Matrix4;
        readonly isCamera: true;
        getWorldDirection(target: Vector3): Vector3;
        updateMatrixWorld(force?: boolean): void;
        id: number;
        uuid: string;
        name: string;
        parent: import("three").Object3D<import("three").Event>;
        children: import("three").Object3D<import("three").Event>[];
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
        add(...object: import("three").Object3D<import("three").Event>[]): any;
        remove(...object: import("three").Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: import("three").Object3D<import("three").Event>): any;
        getObjectById(id: number): import("three").Object3D<import("three").Event>;
        getObjectByName(name: string): import("three").Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): import("three").Object3D<import("three").Event>;
        getWorldPosition(target: Vector3): Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: Vector3): Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<import("three").Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        updateMatrix(): void;
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;
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
export function camerasOrthographic(): {
    new (left: any, right: any, top: any, bottom: any, near: any, far: any): {
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
        zoom: number;
        _adjustTopDirection(horizontalDirection: any, verticalDirection: any): any;
        _getMaxIndex(vector: any): number;
        _findMaxIndex(directions: any, target: any): number;
        _getMaxIndices(directions: any): number[];
        _orderIntersections(intersections: any, direction: any): any;
        _updateCanvas(): void;
        left: number;
        right: number;
        top: number;
        bottom: number;
        _oppositePosition(position: any): any;
        _computeZoom(dimension: any, direction: any): number | false;
        _updatePositionAndTarget(position: any, target: any): void;
        _updateMatrices(): void;
        _updateLabels(): void;
        _vector2Label(direction: any): string;
        _updateDirections(): void;
        controls: any;
        box: any;
        canvas: {
            width: any;
            height: any;
        };
        angle: number;
        directions: Vector3[];
        convention: string;
        orientation: string;
        directionsLabel: string[];
        stackOrientation: number;
        type: "OrthographicCamera";
        readonly isOrthographicCamera: true;
        view: {
            enabled: boolean;
            fullWidth: number;
            fullHeight: number;
            offsetX: number;
            offsetY: number;
            width: number;
            height: number;
        };
        near: number;
        far: number;
        updateProjectionMatrix(): void;
        setViewOffset(fullWidth: number, fullHeight: number, offsetX: number, offsetY: number, width: number, height: number): void;
        clearViewOffset(): void;
        toJSON(meta?: any): any;
        matrixWorldInverse: Matrix4;
        projectionMatrix: Matrix4;
        projectionMatrixInverse: Matrix4;
        readonly isCamera: true;
        getWorldDirection(target: Vector3): Vector3;
        updateMatrixWorld(force?: boolean): void;
        id: number;
        uuid: string;
        name: string;
        parent: import("three").Object3D<import("three").Event>;
        children: import("three").Object3D<import("three").Event>[];
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
        add(...object: import("three").Object3D<import("three").Event>[]): any;
        remove(...object: import("three").Object3D<import("three").Event>[]): any;
        removeFromParent(): any;
        clear(): any;
        attach(object: import("three").Object3D<import("three").Event>): any;
        getObjectById(id: number): import("three").Object3D<import("three").Event>;
        getObjectByName(name: string): import("three").Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): import("three").Object3D<import("three").Event>;
        getWorldPosition(target: Vector3): Vector3;
        getWorldQuaternion(target: import("three").Quaternion): import("three").Quaternion;
        getWorldScale(target: Vector3): Vector3;
        raycast(raycaster: import("three").Raycaster, intersects: import("three").Intersection<import("three").Object3D<import("three").Event>>[]): void;
        traverse(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseVisible(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        traverseAncestors(callback: (object: import("three").Object3D<import("three").Event>) => any): void;
        updateMatrix(): void;
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void;
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
import { Matrix4 } from "three/src/math/Matrix4";
//# sourceMappingURL=cameras.orthographic.d.ts.map