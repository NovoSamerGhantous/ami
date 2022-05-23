declare var _default: InterpolationIdentity;
export default _default;
declare class InterpolationIdentity extends ShadersBase {
    _currentVoxel: string;
    _dataValue: string;
    api(baseFragment?: any, currentVoxel?: string, dataValue?: string): string;
    _base: any;
    compute(currentVoxel: any, dataValue: any): string;
    computeDefinition(): void;
}
import ShadersBase from "../shaders.base";
//# sourceMappingURL=shaders.interpolation.identity.d.ts.map