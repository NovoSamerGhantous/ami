/**
 * @module shaders/data
 */
export default class ShadersUniform {
    static uniforms(): {
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
        uTextureBack: {
            type: string;
            value: any[];
            typeGLSL: string;
        };
    };
}
import { Matrix4 } from "three/src/math/Matrix4";
//# sourceMappingURL=shaders.vr.secondpass.uniform.d.ts.map