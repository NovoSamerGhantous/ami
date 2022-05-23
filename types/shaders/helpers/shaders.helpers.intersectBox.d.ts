declare var _default: IntersectBox;
export default _default;
declare class IntersectBox extends ShadersBase {
    _rayOrigin: string;
    _rayDirection: string;
    _aabbMin: string;
    _aabbMax: string;
    _tNear: string;
    _tFar: string;
    _intersect: string;
    api(baseFragment?: any, rayOrigin?: string, rayDirection?: string, aabbMin?: string, aabbMax?: string, tNear?: string, tFar?: string, intersect?: string): string;
    _base: any;
    compute(rayOrigin: any, rayDirection: any, aabbMin: any, aabbMax: any, tNear: any, tFar: any, intersect: any): string;
    computeDefinition(): void;
}
import ShadersBase from "../shaders.base";
//# sourceMappingURL=shaders.helpers.intersectBox.d.ts.map