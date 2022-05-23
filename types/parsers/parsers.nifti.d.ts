/**
 * @module parsers/nifti
 */
export default class ParsersNifti extends ParsersVolume {
    constructor(data: any, id: any);
    /**
     * @member
     * @type {arraybuffer}
     */
    _id: arraybuffer;
    _arrayBuffer: any;
    _url: any;
    _dataSet: any;
    _niftiHeader: any;
    _niftiImage: any;
    _ordered: boolean;
    _orderedData: Float32Array | Uint8Array | Int8Array | Uint16Array | Int16Array;
    _qfac: number;
    seriesInstanceUID(): any;
    numberOfFrames(): any;
    sopInstanceUID(frameIndex?: number): number;
    rows(frameIndex?: number): any;
    columns(frameIndex?: number): any;
    pixelType(frameIndex?: number): number;
    bitsAllocated(frameIndex?: number): any;
    pixelSpacing(frameIndex?: number): any[];
    imageOrientation(frameIndex?: number): any[];
    imagePosition(frameIndex?: number): any[];
    rescaleSlope(frameIndex?: number): any;
    rescaleIntercept(frameIndex?: number): any;
    extractPixelData(frameIndex?: number): Float32Array | Uint8Array | Int8Array | Uint16Array | Int16Array | Int32Array;
    _decompressUncompressed(frameIndex?: number): Float32Array | Uint8Array | Int8Array | Uint16Array | Int16Array | Int32Array;
    _reorderData(): void;
}
import ParsersVolume from "./parsers.volume";
//# sourceMappingURL=parsers.nifti.d.ts.map