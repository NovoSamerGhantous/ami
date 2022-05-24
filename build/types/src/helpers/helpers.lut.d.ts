/**
 * @module helpers/lut
 */
export class helpersLut extends Object3D<import("three").Event> {
    static presetLuts(): {
        default: number[][];
        spectrum: number[][];
        hot_and_cold: number[][];
        gold: number[][];
        red: number[][];
        green: number[][];
        blue: number[][];
        walking_dead: number[][];
        random: number[][];
        muscle_bone: number[][];
    };
    static presetLutsO(): {
        linear: number[][];
        lowpass: number[][];
        bandpass: number[][];
        highpass: number[][];
        flat: number[][];
        random: number[][];
        linear_full: number[][];
    };
    constructor(domTarget: any, lut?: string, lutO?: string, color?: number[][], opacity?: number[][], discrete?: boolean);
    _dom: any;
    _discrete: boolean;
    _color: number[][];
    _lut: string;
    _luts: {
        [x: string]: number[][];
    };
    _opacity: number[][];
    _lutO: string;
    _lutsO: {
        [x: string]: number[][];
    };
    initCanvas(): void;
    _canvasContainer: any;
    _canvasBg: HTMLCanvasElement;
    _canvas: HTMLCanvasElement;
    initCanvasContainer(dom: any): any;
    createCanvas(): HTMLCanvasElement;
    paintCanvas(): void;
    get texture(): Texture;
    set lut(arg: string);
    get lut(): string;
    set luts(arg: {
        [x: string]: number[][];
    });
    get luts(): {
        [x: string]: number[][];
    };
    set lutO(arg: string);
    get lutO(): string;
    set lutsO(arg: {
        [x: string]: number[][];
    });
    get lutsO(): {
        [x: string]: number[][];
    };
    set discrete(arg: boolean);
    get discrete(): boolean;
    lutsAvailable(type?: string): string[];
}
import { Object3D } from "three/src/core/Object3D";
import { Texture } from "three/src/textures/Texture";
