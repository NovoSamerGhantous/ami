/**
 * @module shaders/data
 */
export default class ShadersUniform {
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
        uWidth: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uOpacity: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uTextureFilled: {
            type: string;
            value: any[];
            typeGLSL: string;
        };
    };
}
