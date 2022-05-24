/**
 * Dicom parser is a combination of utilities to get a VJS image from dicom files.
 *scripts
 * Relies on dcmjs, jquery, HTML5 fetch API, HTML5 promise API.
 *
 * image-JPEG2000 (jpx) is still in use, because Cornerstone does it and may have identified some edge corners.
 * Ref:
 *   https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/master/docs/Codecs.md
 *   https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/a9b408f5562bde5543fc6986bd23fbac9d676562/src/shared/decoders/decodeJPEG2000.js#L127-L134
 *
 * @module parsers/dicom
 *
 * @param arrayBuffer {arraybuffer} - List of files to be parsed. It is urls from which
 * VJS.parsers.dicom can pull the data from.
 */
export default class ParsersDicom extends ParsersVolume {
    constructor(data: any, id: any);
    _id: any;
    _arrayBuffer: any;
    _dataSet: any;
    /**
     * Series instance UID (0020,000e)
     *
     * @return {String}
     */
    seriesInstanceUID(): string;
    /**
     * Study instance UID (0020,000d)
     *
     * @return {String}
     */
    studyInstanceUID(): string;
    /**
     * Segmentation segments
     * -> Sequence of segments (0062,0002)
     *   -> Recommended Display CIELab
     *   -> Segmentation Code
     *   -> Segment Number (0062,0004)
     *   -> Segment Label (0062,0005)
     *   -> Algorithm Type (0062,0008)
     *
     * @return {*}
     */
    segmentationSegments(): any;
    /**
     * Segmentation code
     * -> Code designator (0008,0102)
     * -> Code value (0008,0200)
     * -> Code Meaning Type (0008,0104)
     *
     * @param {*} segment
     *
     * @return {*}
     */
    _segmentationCode(segment: any): any;
    /**
     * Recommended display CIELab
     *
     * @param {*} segment
     *
     * @return {*}
     */
    _recommendedDisplayCIELab(segment: any): any;
    /**
     * SOP Instance UID
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    sopInstanceUID(frameIndex?: any): any;
    /**
     * Photometric interpretation
     *
     * @return {*}
     */
    photometricInterpretation(): any;
    planarConfiguration(): any;
    samplesPerPixel(): any;
    numberOfFrames(): any;
    imageOrientation(frameIndex?: number): any;
    referencedSegmentNumber(frameIndex?: number): number;
    pixelAspectRatio(): any[];
    imagePosition(frameIndex?: number): any;
    instanceNumber(frameIndex?: number): any;
    pixelSpacing(frameIndex?: number): any;
    rows(frameIndex?: number): any;
    columns(frameIndex?: number): any;
    pixelType(frameIndex?: number): number;
    pixelRepresentation(frameIndex?: number): any;
    bitsAllocated(frameIndex?: number): any;
    highBit(frameIndex?: number): any;
    rescaleIntercept(frameIndex?: number): any;
    rescaleSlope(frameIndex?: number): any;
    sliceThickness(frameIndex?: number): any;
    spacingBetweenSlices(frameIndex?: number): any;
    dimensionIndexValues(frameIndex?: number): any[];
    inStackPositionNumber(frameIndex?: number): any;
    stackID(frameIndex?: number): any;
    extractPixelData(frameIndex?: number): any;
    _findInGroupSequence(sequence: any, subsequence: any, index: any): any;
    _findStringInGroupSequence(sequence: any, subsequence: any, tag: any, index: any): any;
    _findStringInFrameGroupSequence(subsequence: any, tag: any, index: any): any;
    _findStringEverywhere(subsequence: any, tag: any, index: any): any;
    _findStringInSequence(sequenceTag: any, tag: any, index: any): any;
    _findFloatStringInGroupSequence(sequence: any, subsequence: any, tag: any, index: any): any;
    _findFloatStringInFrameGroupSequence(subsequence: any, tag: any, index: any): any;
    _decodePixelData(frameIndex?: number): any;
    framesAreFragmented(): boolean;
    getEncapsulatedImageFrame(frameIndex: any): any;
    _decodeJpx(frameIndex?: number): any;
    _decodeOpenJPEG(frameIndex?: number): Uint8Array | Int16Array | Uint16Array;
    _decodeJ2K(frameIndex?: number): any;
    _decodeRLE(frameIndex?: number): any;
    _decodeJPEGLossless(frameIndex?: number): Uint8Array | Int16Array | Uint16Array;
    _decodeJPEGBaseline(frameIndex?: number): any;
    _decodeUncompressed(frameIndex?: number): Uint8Array | Int16Array | Uint16Array | Uint32Array;
    _interpretAsRGB(photometricInterpretation: any): boolean;
    _convertColorSpace(uncompressedData: any): any;
    /**
     * Swap bytes in frame.
     */
    _swapFrame(frame: any): any;
    _getUnitsName(value: any): any;
}
import ParsersVolume from "./parsers.volume";
