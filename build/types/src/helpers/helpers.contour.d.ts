/**
 * @module helpers/contour
 */
export class helpersContour extends Object3D<import("three").Event> {
    constructor(stack: any, geometry: any, texture: any);
    _stack: any;
    _textureToFilter: any;
    _contourWidth: number;
    _contourOpacity: number;
    _canvasWidth: number;
    _canvasHeight: number;
    _shadersFragment: typeof ShadersFragment;
    _shadersVertex: typeof ShadersVertex;
    _uniforms: {
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
    _material: ShaderMaterial;
    _geometry: any;
    _create(): void;
    _mesh: Mesh<any, ShaderMaterial>;
    _prepareMaterial(): void;
    update(): void;
    dispose(): void;
    set geometry(arg: any);
    get geometry(): any;
    set textureToFilter(arg: any);
    get textureToFilter(): any;
    set contourOpacity(arg: number);
    get contourOpacity(): number;
    set contourWidth(arg: number);
    get contourWidth(): number;
    set canvasWidth(arg: number);
    get canvasWidth(): number;
    set canvasHeight(arg: number);
    get canvasHeight(): number;
}
import { Object3D } from "three/src/core/Object3D";
import ShadersFragment from "../shaders/shaders.contour.fragment";
import ShadersVertex from "../shaders/shaders.contour.vertex";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import { Mesh } from "three/src/objects/Mesh";
