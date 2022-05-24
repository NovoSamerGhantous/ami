/**
 * @module parsers/mgh
 */
declare class ParsersMgh extends ParsersVolume {
    constructor(data: any, id: any);
    /**
     * @member
     * @type {arraybuffer}
     */
    _id: arraybuffer;
    _url: any;
    _buffer: any;
    _bufferPos: number;
    _dataPos: number;
    _pixelData: number | Uint8Array | Int16Array | Int32Array | Float32Array;
    _version: number;
    _width: number | Int32Array;
    _height: number | Int32Array;
    _depth: number | Int32Array;
    _nframes: number | Int32Array;
    _type: number;
    _dof: number | Int32Array;
    _goodRASFlag: number | Int16Array;
    _spacingXYZ: number | Float32Array;
    _Xras: number | Float32Array;
    _Yras: number | Float32Array;
    _Zras: number | Float32Array;
    _Cras: number | Float32Array;
    _tr: number | Float32Array;
    _flipAngle: number | Float32Array;
    _te: number | Float32Array;
    _ti: number | Float32Array;
    _fov: number | Float32Array;
    _tags: {
        tagType: number | Uint16Array | Int32Array;
        tagValue: string;
    }[];
    _origin: number[];
    _imageOrient: any[];
    _swapEndian: boolean;
    seriesInstanceUID(): any;
    numberOfFrames(): number | Int32Array;
    sopInstanceUID(frameIndex?: number): number;
    rows(frameIndex?: number): number | Int32Array;
    columns(frameIndex?: number): number | Int32Array;
    pixelType(frameIndex?: number): 1 | 0;
    bitsAllocated(frameIndex?: number): 8 | 16 | 32;
    pixelSpacing(frameIndex?: number): number | Float32Array;
    imageOrientation(frameIndex?: number): any[];
    imagePosition(frameIndex?: number): number[];
    extractPixelData(frameIndex?: number): any;
    _readInt(len?: number): number | Int32Array;
    _readShort(len?: number): number | Int16Array;
    _readLong(len?: number): number | Uint16Array;
    _readChar(len?: number): number | Int8Array;
    _readUChar(len?: number): number | Uint8Array;
    _readFloat(len?: number): number | Float32Array;
    _tagReadStart(): (number | Uint16Array | Int32Array)[];
}
declare namespace ParsersMgh {
    const MRI_UCHAR: number;
    const MRI_INT: number;
    const MRI_LONG: number;
    const MRI_FLOAT: number;
    const MRI_SHORT: number;
    const MRI_BITMAP: number;
    const MRI_TENSOR: number;
    const MRI_FLOAT_COMPLEX: number;
    const MRI_DOUBLE_COMPLEX: number;
    const MRI_RGB: number;
    const TAG_OLD_COLORTABLE: number;
    const TAG_OLD_USEREALRAS: number;
    const TAG_CMDLINE: number;
    const TAG_USEREALRAS: number;
    const TAG_COLORTABLE: number;
    const TAG_GCAMORPH_GEOM: number;
    const TAG_GCAMORPH_TYPE: number;
    const TAG_GCAMORPH_LABELS: number;
    const TAG_OLD_SURF_GEOM: number;
    const TAG_SURF_GEOM: number;
    const TAG_OLD_MGH_XFORM: number;
    const TAG_MGH_XFORM: number;
    const TAG_GROUP_AVG_SURFACE_AREA: number;
    const TAG_AUTO_ALIGN: number;
    const TAG_SCALAR_DOUBLE: number;
    const TAG_PEDIR: number;
    const TAG_MRI_FRAME: number;
    const TAG_FIELDSTRENGTH: number;
}
export default ParsersMgh;
import ParsersVolume from "./parsers.volume";
