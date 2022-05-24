/**
 * @module helpers/slice
 */
export class helpersSlice extends helpersMaterialMixin {
    constructor(stack: any, index?: number, position?: Vector3, direction?: Vector3, aabbSpace?: string);
    _stack: any;
    _invert: any;
    _lut: string;
    _lutTexture: any;
    _intensityAuto: boolean;
    _interpolation: number;
    _index: number;
    _windowWidth: any;
    _windowCenter: any;
    _opacity: number;
    _rescaleSlope: any;
    _rescaleIntercept: any;
    _spacing: number;
    _thickness: number;
    _thicknessMethod: number;
    _lowerThreshold: any;
    _upperThreshold: any;
    _canvasWidth: number;
    _canvasHeight: number;
    _borderColor: any;
    _planePosition: Vector3;
    _planeDirection: Vector3;
    _aaBBspace: string;
    _shadersFragment: typeof ShadersFragment;
    _shadersVertex: typeof ShadersVertex;
    _uniforms: {
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
        }; /**
         * @module helpers/slice
         */
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
    _geometry: any;
    _mesh: any;
    _visible: boolean;
    set stack(arg: any);
    get stack(): any;
    set spacing(arg: number);
    get spacing(): number;
    set thickness(arg: number);
    get thickness(): number;
    set thicknessMethod(arg: number);
    get thicknessMethod(): number;
    set windowWidth(arg: any);
    get windowWidth(): any;
    set windowCenter(arg: any);
    get windowCenter(): any;
    set opacity(arg: number);
    get opacity(): number;
    set upperThreshold(arg: any);
    get upperThreshold(): any;
    set lowerThreshold(arg: any);
    get lowerThreshold(): any;
    set rescaleSlope(arg: any);
    get rescaleSlope(): any;
    set rescaleIntercept(arg: any);
    get rescaleIntercept(): any;
    set invert(arg: any);
    get invert(): any;
    set lut(arg: string);
    get lut(): string;
    set lutTexture(arg: any);
    get lutTexture(): any;
    set intensityAuto(arg: boolean);
    get intensityAuto(): boolean;
    set interpolation(arg: number);
    get interpolation(): number;
    set index(arg: number);
    get index(): number;
    set planePosition(arg: Vector3);
    get planePosition(): Vector3;
    set planeDirection(arg: Vector3);
    get planeDirection(): Vector3;
    set halfDimensions(arg: any);
    get halfDimensions(): any;
    _halfDimensions: any;
    set center(arg: any);
    get center(): any;
    _center: any;
    set aabbSpace(arg: string);
    get aabbSpace(): string;
    set mesh(arg: any);
    get mesh(): any;
    set geometry(arg: any);
    get geometry(): any;
    set canvasWidth(arg: number);
    get canvasWidth(): number;
    set canvasHeight(arg: number);
    get canvasHeight(): number;
    set borderColor(arg: any);
    get borderColor(): any;
    _init(): void;
    _toAABB: any;
    _create(): void;
    updateIntensitySettings(): void;
    updateIntensitySettingsUniforms(): void;
    updateIntensitySetting(setting: any): void;
    _update(): void;
    dispose(): void;
    cartesianEquation(): Vector4;
}
import { helpersMaterialMixin } from "../helpers/helpers.material.mixin";
import { Vector3 } from "three/src/math/Vector3";
import ShadersFragment from "../shaders/shaders.data.fragment";
import ShadersVertex from "../shaders/shaders.data.vertex";
import { Matrix4 } from "three/src/math/Matrix4";
import { Vector4 } from "three/src/math/Vector4";
