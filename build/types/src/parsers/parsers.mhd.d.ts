/**
 * @module parsers/mhd
 */
export default class ParsersMHD extends ParsersVolume {
    constructor(data: any, id: any);
    /**
     * @member
     * @type {arraybuffer}
     */
    _id: arraybuffer;
    _url: any;
    _header: {};
    _buffer: any;
    seriesInstanceUID(): any;
    numberOfFrames(): number;
    sopInstanceUID(frameIndex?: number): number;
    rows(frameIndex?: number): number;
    columns(frameIndex?: number): number;
    pixelType(frameIndex?: number): number;
    bitsAllocated(frameIndex?: number): number;
    /**
     * https://itk.org/Wiki/ITK/MetaIO/Documentation
     * ElementSpacing[0] spacing between elements along X axis (i.e. column spacing)
     * ElementSpacing[1] spacing between elements along Y axis (i.e. row spacing)
     *
     * @param {*} frameIndex
     */
    pixelSpacing(frameIndex?: any): number[];
    imageOrientation(frameIndex?: number): number[];
    imagePosition(frameIndex?: number): number[];
    extractPixelData(frameIndex?: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array;
    _decompressUncompressed(frameIndex?: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array;
}
import ParsersVolume from "./parsers.volume";
