/**
 * @module parsers/nifti
 */
export default class ParsersNifti extends ParsersVolume {
    /**
     * Constructor
     *
     * @param {*} data
     * @param {*} id
     */
    constructor(data: any, id: any);
    /**
     * @member
     * @type {arraybuffer}
     */
    _id: arraybuffer;
    _arrayBuffer: any;
    _url: any;
    _dataSet: any;
    _unpackedData: any;
    /**
     * Is the data right-handed
     *
     * @return {*}
     */
    rightHanded(): any;
    /**
     * Series instance UID
     *
     * @return {*}
     */
    seriesInstanceUID(): any;
    /**
     * Number of frames
     *
     * @return {*}
     */
    numberOfFrames(): any;
    /**
     * Number of channels
     *
     * @return {*}
     */
    numberOfChannels(): any;
    /**
     * SOP instance UID
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    sopInstanceUID(frameIndex?: any): any;
    /**
     * Rows
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    rows(frameIndex?: any): any;
    /**
     * Columns
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    columns(frameIndex?: any): any;
    /**
     * Pixel type
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    pixelType(frameIndex?: any): any;
    /**
     * Bits allocated
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    bitsAllocated(frameIndex?: any): any;
    /**
     * Pixel spacing
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    pixelSpacing(frameIndex?: any): any;
    /**
     * Image orientation
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    imageOrientation(frameIndex?: any): any;
    /**
     * Image position
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    imagePosition(frameIndex?: any): any;
    /**
     * Extract pixel data ffrom array buffer
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    extractPixelData(frameIndex?: any): any;
    /**
     * Decompress data from uncompressed array buffer
     *
     * @param {*} frameIndex
     *
     * @return {*}
     */
    _decompressUncompressed(frameIndex?: any): any;
}
import ParsersVolume from "./parsers.volume";
