declare var _default: {
    new (stack: any): {
        _stack: any;
        _bBox: {
            _stack: any;
            _visible: boolean;
            _color: number;
            _material: import("three").Material | import("three").Material[] | import("three").MeshBasicMaterial;
            _geometry: import("three").BoxGeometry;
            _mesh: import("three").BoxHelper;
            _meshStack: import("three").Mesh<import("three").BoxGeometry, any>;
            visible: boolean;
            color: number;
            _create(): void;
            _update(): void; /**
             * Get border helper.
             *
             * @type {HelpersSlice}
             */
            dispose(): void;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
            matrixAutoUpdate: boolean;
            matrixWorldNeedsUpdate: boolean;
            layers: import("three").Layers;
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
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
        _slice: {
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
            _shadersFragment: typeof import("../ami").DataFragmentShader;
            _shadersVertex: typeof import("../ami").DataVertexShader;
            _uniforms: {
                uTextureSize: {
                    type: string;
                    /**
                     * Helper to easily display and interact with a stack.<br>
                     *<br>
                     * Defaults:<br>
                     *   - orientation: 0 (acquisition direction)<br>
                     *   - index: middle slice in acquisition direction<br>
                     *<br>
                     * Features:<br>
                     *   - slice from the stack (in any direction)<br>
                     *   - slice border<br>
                     *   - stack bounding box<br>
                     *<br>
                     * Live demo at: {@link http://jsfiddle.net/gh/get/library/pure/fnndsc/ami/tree/master/lessons/01#run|Lesson 01}
                     *
                     * @example
                     * let stack = new VJS.Models.Stack();
                     * ... // prepare the stack
                     *
                     * let helpersStack = new VJS.Helpers.Stack(stack);
                     * stackHelper.bbox.color = 0xF9F9F9;
                     * stackHelper.border.color = 0xF9F9F9;
                     *
                     * let scene = new Scene();
                     * scene.add(stackHelper);
                     *
                     * @see module:helpers/border
                     * @see module:helpers/boundingbox
                     * @see module:helpers/slice
                     *
                     * @module helpers/stack
                     */
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
                    value: import("three").Matrix4;
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
                    /**
                     * Get bounding box helper.
                     *
                     * @type {HelpersBoundingBox}
                     */
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
                    /**
                     * Get border helper.
                     *
                     * @type {HelpersSlice}
                     */
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
            cartesianEquation(): import("three").Vector4;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
            toJSON(meta?: {
                geometries: any;
                materials: any;
                textures: any;
                images: any;
            }): any;
            clone(recursive?: boolean): any;
            copy(source: any, recursive?: boolean): any;
            addEventListener<T_3 extends string>(type: T_3, listener: import("three").EventListener<import("three").Event, T_3, any>): void;
            hasEventListener<T_4 extends string>(type: T_4, listener: import("three").EventListener<import("three").Event, T_4, any>): boolean;
            removeEventListener<T_5 extends string>(type: T_5, listener: import("three").EventListener<import("three").Event, T_5, any>): void;
            dispatchEvent(event: import("three").Event): void;
        };
        _border: {
            _helpersSlice: any;
            _visible: boolean;
            _color: number;
            _material: import("three").LineBasicMaterial;
            _geometry: import("three").BufferGeometry;
            _mesh: import("three").Line<import("three").BufferGeometry, import("three").LineBasicMaterial>;
            helpersSlice: any;
            visible: boolean;
            color: number;
            _create(): void;
            _update(): void;
            dispose(): void;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
            matrixAutoUpdate: boolean;
            matrixWorldNeedsUpdate: boolean;
            layers: import("three").Layers;
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
            toJSON(meta?: {
                geometries: any;
                materials: any;
                textures: any;
                images: any;
            }): any;
            clone(recursive?: boolean): any;
            copy(source: any, recursive?: boolean): any;
            addEventListener<T_6 extends string>(type: T_6, listener: import("three").EventListener<import("three").Event, T_6, any>): void;
            hasEventListener<T_7 extends string>(type: T_7, listener: import("three").EventListener<import("three").Event, T_7, any>): boolean;
            removeEventListener<T_8 extends string>(type: T_8, listener: import("three").EventListener<import("three").Event, T_8, any>): void;
            dispatchEvent(event: import("three").Event): void;
        };
        _dummy: any;
        _orientation: number;
        _index: number;
        _uniforms: any;
        _autoWindowLevel: boolean;
        _outOfBounds: boolean;
        _orientationMaxIndex: number;
        _orientationSpacing: number;
        _canvasWidth: number;
        _canvasHeight: number;
        _borderColor: any;
        /**
         * Get stack.
         *
         * @type {ModelsStack}
         */
        stack: ModelsStack;
        /**
         * Get bounding box helper.
         *
         * @type {HelpersBoundingBox}
         */
        readonly bbox: HelpersBoundingBox;
        /**
         * Get slice helper.
         *
         * @type {HelpersSlice}
         */
        readonly slice: HelpersSlice;
        /**
         * Get border helper.
         *
         * @type {HelpersSlice}
         */
        readonly border: HelpersSlice;
        /**
         * Set/get current slice index.<br>
         * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
         * <br>
         * Internally updates the sliceHelper index and position. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
        index: number;
        /**
         * Set/get current slice orientation.<br>
         * Values: <br>
         *   - 0: acquisition direction (slice normal is z_cosine)<br>
         *   - 1: next direction (slice normal is x_cosine)<br>
         *   - 2: next direction (slice normal is y_cosine)<br>
         *   - n: set orientation to 0<br>
         * <br>
         * Internally updates the sliceHelper direction. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
        orientation: number;
        /**
         * Set/get the outOfBound flag.
         *
         * @type {boolean}
         */
        outOfBounds: boolean;
        /**
         * Set/get the orientationMaxIndex.
         *
         * @type {number}
         */
        orientationMaxIndex: number;
        /**
         * Set/get the orientationSpacing.
         *
         * @type {number}
         */
        orientationSpacing: number;
        canvasWidth: number;
        canvasHeight: number;
        borderColor: any;
        /**
         * Initial setup, including stack prepare, bbox prepare, slice prepare and
         * border prepare.
         *
         * @private
         */
        _create(): void;
        _computeOrientationSpacing(): void;
        _computeOrientationMaxIndex(): void;
        /**
         * Given orientation, check if index is in/out of bounds.
         *
         * @private
         */
        _isIndexOutOfBounds(): void;
        /**
         * Prepare a stack for visualization. (image to world transform, frames order,
         * pack data into 8 bits textures, etc.)
         *
         * @private
         */
        _prepareStack(): void;
        /**
         * Setup bounding box helper given prepared stack and add bounding box helper
         * to stack helper.
         *
         * @private
         */
        _prepareBBox(): void;
        /**
         * Setup border helper given slice helper and add border helper
         * to stack helper.
         *
         * @private
         */
        _prepareBorder(): void;
        /**
         * Setup slice helper given prepared stack helper and add slice helper
         * to stack helper.
         *
         * @private
         */
        _prepareSlice(): void;
        /**
         * Compute slice index depending on orientation.
         *
         * @param {Vector3} indices - Indices in each direction.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        _prepareSliceIndex(indices: Vector3): number;
        /**
         * Compute slice position depending on orientation.
         * Sets index in proper location of reference position.
         *
         * @param {Vector3} rPosition - Reference position.
         * @param {number} index - Current index.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        _prepareSlicePosition(rPosition: Vector3, index: number): number;
        /**
         * Compute slice direction depending on orientation.
         *
         * @param {number} orientation - Slice orientation.
         *
         * @returns {Vector3} Slice direction
         *
         * @private
         */
        _prepareDirection(orientation: number): Vector3;
        /**
         * Release the stack helper memory including the slice memory.
         *
         * @public
         */
        dispose(): void;
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
        readonly modelViewMatrix: import("three").Matrix4;
        readonly normalMatrix: import("three").Matrix3;
        matrix: import("three").Matrix4;
        matrixWorld: import("three").Matrix4; /**
         * Set/get current slice index.<br>
         * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
         * <br>
         * Internally updates the sliceHelper index and position. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
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
        applyMatrix4(matrix: import("three").Matrix4): void;
        applyQuaternion(quaternion: import("three").Quaternion): any;
        setRotationFromAxisAngle(axis: Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: import("three").Matrix4): void;
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
        clear(): any; /**
         * Compute slice index depending on orientation.
         *
         * @param {Vector3} indices - Indices in each direction.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        attach(object: Object3D<import("three").Event>): any;
        getObjectById(id: number): Object3D<import("three").Event>;
        getObjectByName(name: string): Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
         * Compute slice position depending on orientation.
         * Sets index in proper location of reference position.
         *
         * @param {Vector3} rPosition - Reference position.
         * @param {number} index - Current index.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
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
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
         * Compute slice direction depending on orientation.
         *
         * @param {number} orientation - Slice orientation.
         *
         * @returns {Vector3} Slice direction
         *
         * @private
         */
        toJSON(meta?: {
            geometries: any;
            materials: any;
            textures: any;
            images: any;
        }): any;
        clone(recursive?: boolean): any;
        copy(source: any, recursive?: boolean): any;
        addEventListener<T_9 extends string>(type: T_9, listener: import("three").EventListener<import("three").Event, T_9, any>): void;
        hasEventListener<T_10 extends string>(type: T_10, listener: import("three").EventListener<import("three").Event, T_10, any>): boolean;
        removeEventListener<T_11 extends string>(type: T_11, listener: import("three").EventListener<import("three").Event, T_11, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
    DefaultUp: Vector3;
    DefaultMatrixAutoUpdate: boolean;
};
export default _default;
/**
 * Helper to easily display and interact with a stack.<br>
 *<br>
 * Defaults:<br>
 *   - orientation: 0 (acquisition direction)<br>
 *   - index: middle slice in acquisition direction<br>
 *<br>
 * Features:<br>
 *   - slice from the stack (in any direction)<br>
 *   - slice border<br>
 *   - stack bounding box<br>
 *<br>
 * Live demo at: {@link http://jsfiddle.net/gh/get/library/pure/fnndsc/ami/tree/master/lessons/01#run|Lesson 01}
 *
 * @example
 * let stack = new VJS.Models.Stack();
 * ... // prepare the stack
 *
 * let helpersStack = new VJS.Helpers.Stack(stack);
 * stackHelper.bbox.color = 0xF9F9F9;
 * stackHelper.border.color = 0xF9F9F9;
 *
 * let scene = new Scene();
 * scene.add(stackHelper);
 *
 * @see module:helpers/border
 * @see module:helpers/boundingbox
 * @see module:helpers/slice
 *
 * @module helpers/stack
 */
export function helpersStack(): {
    new (stack: any): {
        _stack: any;
        _bBox: {
            _stack: any;
            _visible: boolean;
            _color: number;
            _material: import("three").Material | import("three").Material[] | import("three").MeshBasicMaterial;
            _geometry: import("three").BoxGeometry;
            _mesh: import("three").BoxHelper;
            _meshStack: import("three").Mesh<import("three").BoxGeometry, any>;
            visible: boolean;
            color: number;
            _create(): void;
            _update(): void; /**
             * Get border helper.
             *
             * @type {HelpersSlice}
             */
            dispose(): void;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
            matrixAutoUpdate: boolean;
            matrixWorldNeedsUpdate: boolean;
            layers: import("three").Layers;
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
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
        _slice: {
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
            _shadersFragment: typeof import("../ami").DataFragmentShader;
            _shadersVertex: typeof import("../ami").DataVertexShader;
            _uniforms: {
                uTextureSize: {
                    type: string;
                    /**
                     * Helper to easily display and interact with a stack.<br>
                     *<br>
                     * Defaults:<br>
                     *   - orientation: 0 (acquisition direction)<br>
                     *   - index: middle slice in acquisition direction<br>
                     *<br>
                     * Features:<br>
                     *   - slice from the stack (in any direction)<br>
                     *   - slice border<br>
                     *   - stack bounding box<br>
                     *<br>
                     * Live demo at: {@link http://jsfiddle.net/gh/get/library/pure/fnndsc/ami/tree/master/lessons/01#run|Lesson 01}
                     *
                     * @example
                     * let stack = new VJS.Models.Stack();
                     * ... // prepare the stack
                     *
                     * let helpersStack = new VJS.Helpers.Stack(stack);
                     * stackHelper.bbox.color = 0xF9F9F9;
                     * stackHelper.border.color = 0xF9F9F9;
                     *
                     * let scene = new Scene();
                     * scene.add(stackHelper);
                     *
                     * @see module:helpers/border
                     * @see module:helpers/boundingbox
                     * @see module:helpers/slice
                     *
                     * @module helpers/stack
                     */
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
                    value: import("three").Matrix4;
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
                    /**
                     * Get bounding box helper.
                     *
                     * @type {HelpersBoundingBox}
                     */
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
                    /**
                     * Get border helper.
                     *
                     * @type {HelpersSlice}
                     */
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
            cartesianEquation(): import("three").Vector4;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
            toJSON(meta?: {
                geometries: any;
                materials: any;
                textures: any;
                images: any;
            }): any;
            clone(recursive?: boolean): any;
            copy(source: any, recursive?: boolean): any;
            addEventListener<T_3 extends string>(type: T_3, listener: import("three").EventListener<import("three").Event, T_3, any>): void;
            hasEventListener<T_4 extends string>(type: T_4, listener: import("three").EventListener<import("three").Event, T_4, any>): boolean;
            removeEventListener<T_5 extends string>(type: T_5, listener: import("three").EventListener<import("three").Event, T_5, any>): void;
            dispatchEvent(event: import("three").Event): void;
        };
        _border: {
            _helpersSlice: any;
            _visible: boolean;
            _color: number;
            _material: import("three").LineBasicMaterial;
            _geometry: import("three").BufferGeometry;
            _mesh: import("three").Line<import("three").BufferGeometry, import("three").LineBasicMaterial>;
            helpersSlice: any;
            visible: boolean;
            color: number;
            _create(): void;
            _update(): void;
            dispose(): void;
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
            readonly modelViewMatrix: import("three").Matrix4;
            readonly normalMatrix: import("three").Matrix3;
            matrix: import("three").Matrix4;
            matrixWorld: import("three").Matrix4; /**
             * Set/get current slice index.<br>
             * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
             * <br>
             * Internally updates the sliceHelper index and position. Also updates the
             * borderHelper with the updated sliceHelper.
             *
             * @type {number}
             */
            matrixAutoUpdate: boolean;
            matrixWorldNeedsUpdate: boolean;
            layers: import("three").Layers;
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
            applyMatrix4(matrix: import("three").Matrix4): void;
            applyQuaternion(quaternion: import("three").Quaternion): any;
            setRotationFromAxisAngle(axis: Vector3, angle: number): void;
            setRotationFromEuler(euler: import("three").Euler): void;
            setRotationFromMatrix(m: import("three").Matrix4): void;
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
            clear(): any; /**
             * Compute slice index depending on orientation.
             *
             * @param {Vector3} indices - Indices in each direction.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
            attach(object: Object3D<import("three").Event>): any;
            getObjectById(id: number): Object3D<import("three").Event>;
            getObjectByName(name: string): Object3D<import("three").Event>;
            getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
             * Compute slice position depending on orientation.
             * Sets index in proper location of reference position.
             *
             * @param {Vector3} rPosition - Reference position.
             * @param {number} index - Current index.
             *
             * @returns {number} Slice index according to current orientation.
             *
             * @private
             */
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
            updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
             * Compute slice direction depending on orientation.
             *
             * @param {number} orientation - Slice orientation.
             *
             * @returns {Vector3} Slice direction
             *
             * @private
             */
            toJSON(meta?: {
                geometries: any;
                materials: any;
                textures: any;
                images: any;
            }): any;
            clone(recursive?: boolean): any;
            copy(source: any, recursive?: boolean): any;
            addEventListener<T_6 extends string>(type: T_6, listener: import("three").EventListener<import("three").Event, T_6, any>): void;
            hasEventListener<T_7 extends string>(type: T_7, listener: import("three").EventListener<import("three").Event, T_7, any>): boolean;
            removeEventListener<T_8 extends string>(type: T_8, listener: import("three").EventListener<import("three").Event, T_8, any>): void;
            dispatchEvent(event: import("three").Event): void;
        };
        _dummy: any;
        _orientation: number;
        _index: number;
        _uniforms: any;
        _autoWindowLevel: boolean;
        _outOfBounds: boolean;
        _orientationMaxIndex: number;
        _orientationSpacing: number;
        _canvasWidth: number;
        _canvasHeight: number;
        _borderColor: any;
        /**
         * Get stack.
         *
         * @type {ModelsStack}
         */
        stack: ModelsStack;
        /**
         * Get bounding box helper.
         *
         * @type {HelpersBoundingBox}
         */
        readonly bbox: HelpersBoundingBox;
        /**
         * Get slice helper.
         *
         * @type {HelpersSlice}
         */
        readonly slice: HelpersSlice;
        /**
         * Get border helper.
         *
         * @type {HelpersSlice}
         */
        readonly border: HelpersSlice;
        /**
         * Set/get current slice index.<br>
         * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
         * <br>
         * Internally updates the sliceHelper index and position. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
        index: number;
        /**
         * Set/get current slice orientation.<br>
         * Values: <br>
         *   - 0: acquisition direction (slice normal is z_cosine)<br>
         *   - 1: next direction (slice normal is x_cosine)<br>
         *   - 2: next direction (slice normal is y_cosine)<br>
         *   - n: set orientation to 0<br>
         * <br>
         * Internally updates the sliceHelper direction. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
        orientation: number;
        /**
         * Set/get the outOfBound flag.
         *
         * @type {boolean}
         */
        outOfBounds: boolean;
        /**
         * Set/get the orientationMaxIndex.
         *
         * @type {number}
         */
        orientationMaxIndex: number;
        /**
         * Set/get the orientationSpacing.
         *
         * @type {number}
         */
        orientationSpacing: number;
        canvasWidth: number;
        canvasHeight: number;
        borderColor: any;
        /**
         * Initial setup, including stack prepare, bbox prepare, slice prepare and
         * border prepare.
         *
         * @private
         */
        _create(): void;
        _computeOrientationSpacing(): void;
        _computeOrientationMaxIndex(): void;
        /**
         * Given orientation, check if index is in/out of bounds.
         *
         * @private
         */
        _isIndexOutOfBounds(): void;
        /**
         * Prepare a stack for visualization. (image to world transform, frames order,
         * pack data into 8 bits textures, etc.)
         *
         * @private
         */
        _prepareStack(): void;
        /**
         * Setup bounding box helper given prepared stack and add bounding box helper
         * to stack helper.
         *
         * @private
         */
        _prepareBBox(): void;
        /**
         * Setup border helper given slice helper and add border helper
         * to stack helper.
         *
         * @private
         */
        _prepareBorder(): void;
        /**
         * Setup slice helper given prepared stack helper and add slice helper
         * to stack helper.
         *
         * @private
         */
        _prepareSlice(): void;
        /**
         * Compute slice index depending on orientation.
         *
         * @param {Vector3} indices - Indices in each direction.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        _prepareSliceIndex(indices: Vector3): number;
        /**
         * Compute slice position depending on orientation.
         * Sets index in proper location of reference position.
         *
         * @param {Vector3} rPosition - Reference position.
         * @param {number} index - Current index.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        _prepareSlicePosition(rPosition: Vector3, index: number): number;
        /**
         * Compute slice direction depending on orientation.
         *
         * @param {number} orientation - Slice orientation.
         *
         * @returns {Vector3} Slice direction
         *
         * @private
         */
        _prepareDirection(orientation: number): Vector3;
        /**
         * Release the stack helper memory including the slice memory.
         *
         * @public
         */
        dispose(): void;
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
        readonly modelViewMatrix: import("three").Matrix4;
        readonly normalMatrix: import("three").Matrix3;
        matrix: import("three").Matrix4;
        matrixWorld: import("three").Matrix4; /**
         * Set/get current slice index.<br>
         * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
         * <br>
         * Internally updates the sliceHelper index and position. Also updates the
         * borderHelper with the updated sliceHelper.
         *
         * @type {number}
         */
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
        applyMatrix4(matrix: import("three").Matrix4): void;
        applyQuaternion(quaternion: import("three").Quaternion): any;
        setRotationFromAxisAngle(axis: Vector3, angle: number): void;
        setRotationFromEuler(euler: import("three").Euler): void;
        setRotationFromMatrix(m: import("three").Matrix4): void;
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
        clear(): any; /**
         * Compute slice index depending on orientation.
         *
         * @param {Vector3} indices - Indices in each direction.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
        attach(object: Object3D<import("three").Event>): any;
        getObjectById(id: number): Object3D<import("three").Event>;
        getObjectByName(name: string): Object3D<import("three").Event>;
        getObjectByProperty(name: string, value: string): Object3D<import("three").Event>; /**
         * Compute slice position depending on orientation.
         * Sets index in proper location of reference position.
         *
         * @param {Vector3} rPosition - Reference position.
         * @param {number} index - Current index.
         *
         * @returns {number} Slice index according to current orientation.
         *
         * @private
         */
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
        updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void; /**
         * Compute slice direction depending on orientation.
         *
         * @param {number} orientation - Slice orientation.
         *
         * @returns {Vector3} Slice direction
         *
         * @private
         */
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
import { Object3D } from "three/src/core/Object3D";
import { Vector3 } from "three/src/math/Vector3";
//# sourceMappingURL=helpers.stack.d.ts.map