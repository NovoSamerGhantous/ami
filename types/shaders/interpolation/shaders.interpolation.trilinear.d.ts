declare var _default: InterpolationTrilinear;
export default _default;
declare class InterpolationTrilinear extends ShadersBase {
    _currentVoxel: string;
    _dataValue: string;
    _gradient: string;
    api(baseFragment?: any, currentVoxel?: string, dataValue?: string, gradient?: string): string;
    _base: any;
    compute(currentVoxel: any, dataValue: any, gradient: any): string;
    computeDefinition(): void;
}
import ShadersBase from "../shaders.base";
//# sourceMappingURL=shaders.interpolation.trilinear.d.ts.map