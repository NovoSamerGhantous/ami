export default class HelpersSegmentationLut {
    constructor(domTarget: any, segmentation?: {
        0: {
            color: number[];
            opacity: number;
            label: string;
        };
        1: {
            color: number[];
            opacity: number;
            label: string;
        };
    });
    _dom: any;
    _segmentation: {
        0: {
            color: number[];
            opacity: number;
            label: string;
        };
        1: {
            color: number[];
            opacity: number;
            label: string;
        };
    };
    initCanvas(): void;
    _canvasContainer: any;
    _canvasBg: HTMLCanvasElement;
    _canvas: HTMLCanvasElement;
    initCanvasContainer(dom: any): any;
    createCanvas(): HTMLCanvasElement;
    paintCanvas(): void;
    get texture(): Texture;
    /**
     * Set and get the segmentation object
     * (you can create it or get it from the presets file)
     *
     * @param {*} segmentation
     */
    set segmentation(arg: any);
    get segmentation(): any;
}
import { Texture } from "three/src/textures/Texture";
