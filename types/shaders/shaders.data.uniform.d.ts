/**
 * @module shaders/data
 */
export default class ShadersUniform {
    /**
     * Shaders data uniforms
     */
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
}
import { Matrix4 } from "three/src/math/Matrix4";
//# sourceMappingURL=shaders.data.uniform.d.ts.map