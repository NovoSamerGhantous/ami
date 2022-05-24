/**
 * @module shaders/localizer/uniforms
 */
export default class _default {
    /**
     * Shaders data uniforms
     */
    static uniforms(): {
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
        uSlice: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlane1: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlaneColor1: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlane2: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlaneColor2: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlane3: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uPlaneColor3: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
    };
}
