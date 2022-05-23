declare var _default: {
    new (halfDimensions: any, center: any, position: any, direction: any, toAABB?: Matrix4): {
        type: string;
        vertices: any[];
        id: number;
        uuid: string;
        name: string;
        index: import("three").BufferAttribute;
        attributes: {
            [name: string]: import("three").BufferAttribute | import("three").InterleavedBufferAttribute;
        };
        morphAttributes: {
            [name: string]: (import("three").BufferAttribute | import("three").InterleavedBufferAttribute)[];
        };
        morphTargetsRelative: boolean;
        groups: {
            start: number;
            count: number;
            materialIndex?: number;
        }[];
        boundingBox: import("three").Box3;
        boundingSphere: import("three").Sphere;
        drawRange: {
            start: number;
            count: number;
        };
        userData: {
            [key: string]: any;
        };
        readonly isBufferGeometry: true;
        getIndex(): import("three").BufferAttribute;
        setIndex(index: number[] | import("three").BufferAttribute): import("three").BufferGeometry;
        setAttribute(name: import("three").BuiltinShaderAttributeName | (string & {}), attribute: import("three").BufferAttribute | import("three").InterleavedBufferAttribute): import("three").BufferGeometry;
        getAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): import("three").BufferAttribute | import("three").InterleavedBufferAttribute;
        deleteAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): import("three").BufferGeometry;
        hasAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): boolean;
        addGroup(start: number, count: number, materialIndex?: number): void;
        clearGroups(): void;
        setDrawRange(start: number, count: number): void;
        applyMatrix4(matrix: Matrix4): import("three").BufferGeometry;
        applyQuaternion(q: import("three").Quaternion): import("three").BufferGeometry;
        rotateX(angle: number): import("three").BufferGeometry;
        rotateY(angle: number): import("three").BufferGeometry;
        rotateZ(angle: number): import("three").BufferGeometry;
        translate(x: number, y: number, z: number): import("three").BufferGeometry;
        scale(x: number, y: number, z: number): import("three").BufferGeometry;
        lookAt(v: import("three").Vector3): void;
        center(): import("three").BufferGeometry;
        setFromPoints(points: import("three").Vector3[] | import("three").Vector2[]): import("three").BufferGeometry;
        computeBoundingBox(): void;
        computeBoundingSphere(): void;
        computeTangents(): void;
        computeVertexNormals(): void;
        merge(geometry: import("three").BufferGeometry, offset?: number): import("three").BufferGeometry;
        normalizeNormals(): void;
        toNonIndexed(): import("three").BufferGeometry;
        toJSON(): any;
        clone(): import("three").BufferGeometry;
        copy(source: import("three").BufferGeometry): any;
        dispose(): void;
        drawcalls: any;
        offsets: any;
        addIndex(index: any): void;
        addDrawCall(start: any, count: any, indexOffset?: any): void;
        clearDrawCalls(): void;
        addAttribute(name: string, attribute: import("three").BufferAttribute | import("three").InterleavedBufferAttribute): import("three").BufferGeometry;
        addAttribute(name: any, array: any, itemSize: any): any;
        removeAttribute(name: string): import("three").BufferGeometry;
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
    fromJSON(data: any): ShapeBufferGeometry;
};
export default _default;
export function geometriesSlice(): {
    new (halfDimensions: any, center: any, position: any, direction: any, toAABB?: Matrix4): {
        type: string;
        vertices: any[];
        id: number;
        uuid: string;
        name: string;
        index: import("three").BufferAttribute;
        attributes: {
            [name: string]: import("three").BufferAttribute | import("three").InterleavedBufferAttribute;
        };
        morphAttributes: {
            [name: string]: (import("three").BufferAttribute | import("three").InterleavedBufferAttribute)[];
        };
        morphTargetsRelative: boolean;
        groups: {
            start: number;
            count: number;
            materialIndex?: number;
        }[];
        boundingBox: import("three").Box3;
        boundingSphere: import("three").Sphere;
        drawRange: {
            start: number;
            count: number;
        };
        userData: {
            [key: string]: any;
        };
        readonly isBufferGeometry: true;
        getIndex(): import("three").BufferAttribute;
        setIndex(index: number[] | import("three").BufferAttribute): import("three").BufferGeometry;
        setAttribute(name: import("three").BuiltinShaderAttributeName | (string & {}), attribute: import("three").BufferAttribute | import("three").InterleavedBufferAttribute): import("three").BufferGeometry;
        getAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): import("three").BufferAttribute | import("three").InterleavedBufferAttribute;
        deleteAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): import("three").BufferGeometry;
        hasAttribute(name: import("three").BuiltinShaderAttributeName | (string & {})): boolean;
        addGroup(start: number, count: number, materialIndex?: number): void;
        clearGroups(): void;
        setDrawRange(start: number, count: number): void;
        applyMatrix4(matrix: Matrix4): import("three").BufferGeometry;
        applyQuaternion(q: import("three").Quaternion): import("three").BufferGeometry;
        rotateX(angle: number): import("three").BufferGeometry;
        rotateY(angle: number): import("three").BufferGeometry;
        rotateZ(angle: number): import("three").BufferGeometry;
        translate(x: number, y: number, z: number): import("three").BufferGeometry;
        scale(x: number, y: number, z: number): import("three").BufferGeometry;
        lookAt(v: import("three").Vector3): void;
        center(): import("three").BufferGeometry;
        setFromPoints(points: import("three").Vector3[] | import("three").Vector2[]): import("three").BufferGeometry;
        computeBoundingBox(): void;
        computeBoundingSphere(): void;
        computeTangents(): void;
        computeVertexNormals(): void;
        merge(geometry: import("three").BufferGeometry, offset?: number): import("three").BufferGeometry;
        normalizeNormals(): void;
        toNonIndexed(): import("three").BufferGeometry;
        toJSON(): any;
        clone(): import("three").BufferGeometry;
        copy(source: import("three").BufferGeometry): any;
        dispose(): void;
        drawcalls: any;
        offsets: any;
        addIndex(index: any): void;
        addDrawCall(start: any, count: any, indexOffset?: any): void;
        clearDrawCalls(): void;
        addAttribute(name: string, attribute: import("three").BufferAttribute | import("three").InterleavedBufferAttribute): import("three").BufferGeometry;
        addAttribute(name: any, array: any, itemSize: any): any;
        removeAttribute(name: string): import("three").BufferGeometry;
        addEventListener<T extends string>(type: T, listener: import("three").EventListener<import("three").Event, T, any>): void;
        hasEventListener<T_1 extends string>(type: T_1, listener: import("three").EventListener<import("three").Event, T_1, any>): boolean;
        removeEventListener<T_2 extends string>(type: T_2, listener: import("three").EventListener<import("three").Event, T_2, any>): void;
        dispatchEvent(event: import("three").Event): void;
    };
    fromJSON(data: any): ShapeBufferGeometry;
};
import { Matrix4 } from "three/src/math/Matrix4";
import { ShapeBufferGeometry } from "three/src/geometries/ShapeGeometry";
//# sourceMappingURL=geometries.slice.d.ts.map