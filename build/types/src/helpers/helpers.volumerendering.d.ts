/**
 * @module helpers/volumerendering
 */
export class helpersVolumeRendering extends helpersMaterialMixin {
    constructor(stack: any);
    _stack: any;
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
        uShading: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbientColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecular: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecularColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uDiffuseColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uShininess: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uLightPosition: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uLightPositionInCamera: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uIntensity: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uAlgorithm: {
            type: string;
            value: number;
            typeGLSL: string;
        };
    };
    _geometry: BoxGeometry;
    _mesh: any;
    _algorithm: number;
    _alphaCorrection: number;
    _interpolation: number;
    _shading: number;
    _shininess: number;
    _steps: number;
    _offset: number;
    _windowCenter: number;
    _windowWidth: number;
    _create(): void;
    _prepareStack(): void;
    _prepareMaterial(): void;
    _prepareGeometry(): void;
    set uniforms(arg: {
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
        uShading: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbientColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecular: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecularColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uDiffuseColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uShininess: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uLightPosition: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uLightPositionInCamera: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uIntensity: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uAlgorithm: {
            type: string;
            value: number;
            typeGLSL: string;
        };
    });
    get uniforms(): {
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
        uShading: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uAmbientColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToAmbient: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecular: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uSpecularColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uDiffuseColor: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uSampleColorToDiffuse: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uShininess: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uLightPosition: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uLightPositionInCamera: {
            type: string;
            value: number;
            typeGLSL: string;
        };
        uIntensity: {
            type: string;
            value: number[];
            typeGLSL: string;
        };
        uAlgorithm: {
            type: string;
            value: number;
            typeGLSL: string;
        };
    };
    set mesh(arg: any);
    get mesh(): any;
    set stack(arg: any);
    get stack(): any;
    set windowCenter(arg: number);
    get windowCenter(): number;
    set windowWidth(arg: number);
    get windowWidth(): number;
    set steps(arg: number);
    get steps(): number;
    set alphaCorrection(arg: number);
    get alphaCorrection(): number;
    set interpolation(arg: number);
    get interpolation(): number;
    set shading(arg: number);
    get shading(): number;
    set shininess(arg: number);
    get shininess(): number;
    set algorithm(arg: number);
    get algorithm(): number;
    dispose(): void;
}
import { helpersMaterialMixin } from "../helpers/helpers.material.mixin";
import ShadersFragment from "../shaders/shaders.vr.fragment";
import ShadersVertex from "../shaders/shaders.vr.vertex";
import { Matrix4 } from "three/src/math/Matrix4";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
