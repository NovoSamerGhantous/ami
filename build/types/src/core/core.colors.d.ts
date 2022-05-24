export declare enum COLORS {
    blue = "#00B0FF",
    yellow = "#FFEB3B",
    red = "#F50057",
    green = "#76FF03",
    white = "#FFF",
    lightRed = "#F77"
}
/**
 * Colors utility functions
 */
export default class Colors {
    /**
     * Convert LAB to XYZ
     * http://www.easyrgb.com/index.php?X=MATH&H=08#text8
     *
     * @param {*} l
     * @param {*} a
     * @param {*} b
     *
     * @return {*}
     */
    static cielab2XYZ(l: number, a: number, b: number): number[];
    /**
     * Convert XYZ to RGB space
     *
     * @param {*} x
     * @param {*} y
     * @param {*} z
     *
     * @return {*}
     */
    static xyz2RGB(x: number, y: number, z: number): number[];
    /**
     * Convert LAB to RGB
     *
     * @param {*} l
     * @param {*} a
     * @param {*} b
     *
     * @return {*}
     */
    static cielab2RGB(l?: number, a?: number, b?: number): number[];
}
