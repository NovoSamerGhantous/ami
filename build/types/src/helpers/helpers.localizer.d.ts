/**
 * @module helpers/localizer
 */
export class helpersLocalizer extends Object3D<import("three").Event> {
    constructor(stack: any, geometry: any, referencePlane: any);
    _stack: any;
    _referencePlane: any;
    _plane1: any;
    _color1: any;
    _plane2: any;
    _color2: any;
    _plane3: any;
    _color3: any;
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
            type: string; /**
             * @module helpers/localizer
             */
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
    _material: ShaderMaterial;
    _geometry: any;
    _create(): void;
    _mesh: Mesh<any, ShaderMaterial>;
    _prepareMaterial(): void;
    update(): void;
    dispose(): void;
    set geometry(arg: any);
    get geometry(): any;
    set referencePlane(arg: any);
    get referencePlane(): any;
    set plane1(arg: any);
    get plane1(): any;
    set color1(arg: any);
    get color1(): any;
    set plane2(arg: any);
    get plane2(): any;
    set color2(arg: any);
    get color2(): any;
    set plane3(arg: any);
    get plane3(): any;
    set color3(arg: any);
    get color3(): any;
    set canvasWidth(arg: number);
    get canvasWidth(): number;
    set canvasHeight(arg: number);
    get canvasHeight(): number;
}
import { Object3D } from "three/src/core/Object3D";
import ShadersFragment from "../shaders/shaders.localizer.fragment";
import ShadersVertex from "../shaders/shaders.localizer.vertex";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import { Mesh } from "three/src/objects/Mesh";
