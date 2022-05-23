declare var _default: Texture3d;
export default _default;
declare class Texture3d extends ShadersBase {
    _dataCoordinates: string;
    _dataValue: string;
    _offset: string;
    api(baseFragment?: any, dataCoordinates?: string, dataValue?: string, offset?: string): string;
    _base: any;
    compute(dataCoordinates: any, dataValue: any, offset: any): string;
    computeDefinition(): void;
}
import ShadersBase from "../shaders.base";
//# sourceMappingURL=shaders.helpers.texture3d.d.ts.map