declare var _default: Unpack;
export default _default;
/**
 * Set of methods to unpack values from [r][b][g][a] -> float
 */
declare class Unpack extends ShadersBase {
    _packedData: string;
    _offset: string;
    _unpackedData: string;
    api(baseFragment?: any, packedData?: string, offset?: string, unpackedData?: string): string;
    _base: any;
    compute(packedData: any, offset: any, unpackedData: any): string;
    computeDefinition(): void;
    upack8(): string;
    upack16(): string;
    upack32(): "\nuInt32(\n  packedData.r,\n  packedData.g,\n  packedData.b,\n  packedData.a,\n  unpackedData.x);\n      " | "\nuFloat32(\n  packedData.r,\n  packedData.g,\n  packedData.b,\n  packedData.a,\n  unpackedData.x);\n      ";
    upackIdentity(): string;
    uInt8(): string;
    uInt16(): string;
    uInt32(): string;
    uFloat32(): string;
}
import ShadersBase from "../shaders.base";
