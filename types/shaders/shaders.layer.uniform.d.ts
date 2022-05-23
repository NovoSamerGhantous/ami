/**
 * @module shaders/data
 */
export default class ShadersUniform {
    static uniforms(): {
        uTextureBackTest0: {
            type: string;
            value: any[];
            typeGLSL: string;
        };
        uTextureBackTest1: {
            type: string;
            value: any[];
            typeGLSL: string;
        };
        uOpacity0: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uOpacity1: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uType0: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uType1: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uTrackMouse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uMouse: {
            type: string;
            value: Vector2;
            typeGLSL: string;
        };
    };
}
import { Vector2 } from "three/src/math/Vector2";
//# sourceMappingURL=shaders.layer.uniform.d.ts.map