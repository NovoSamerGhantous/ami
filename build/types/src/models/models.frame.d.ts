/**
 * Frame object.
 *
 * @module models/frame
 */
export default class ModelsFrame extends ModelsBase {
    _sopInstanceUID: any;
    _url: any;
    _stackID: number;
    _invert: boolean;
    _frameTime: any;
    _ultrasoundRegions: any[];
    _rows: number;
    _columns: number;
    _dimensionIndexValues: any[];
    _imagePosition: any;
    _imageOrientation: any;
    _rightHanded: boolean;
    _sliceThickness: number;
    _spacingBetweenSlices: any;
    _pixelPaddingValue: any;
    _pixelRepresentation: number;
    _pixelType: number;
    _pixelSpacing: any;
    _pixelAspectRatio: any;
    _pixelData: any;
    _instanceNumber: any;
    _windowCenter: any;
    _windowWidth: any;
    _rescaleSlope: any;
    _rescaleIntercept: any;
    _bitsAllocated: number;
    _numberOfChannels: number;
    _minMax: any;
    _dist: any;
    _index: number;
    _referencedSegmentNumber: number;
    /**
     * Validate the frame.
     *
     * @param {*} model
     *
     * @return {*}
     */
    validate(model: any): any;
    /**
     * Merge current frame with provided frame.
     *
     * Frames can be merged (i.e. are identical) if following are equals:
     *  - dimensionIndexValues
     *  - imageOrientation
     *  - imagePosition
     *  - instanceNumber
     *  - sopInstanceUID
     *
     * @param {*} frame
     *
     * @return {boolean} True if frames could be merge. False if not.
     */
    merge(frame: any): boolean;
    /**
     * Generate X, y and Z cosines from image orientation
     * Returns default orientation if _imageOrientation was invalid.
     *
     * @returns {array} Array[3] containing cosinesX, Y and Z.
     */
    cosines(): array;
    /**
     * Get x/y spacing of a frame.
     *
     * @return {*}
     */
    spacingXY(): any;
    /**
     * Get data value
     *
     * @param {*} column
     * @param {*} row
     * @return {*}
     */
    getPixelData(column: any, row: any): any;
    /**
     * Set data value
     *
     * @param {*} column
     * @param {*} row
     * @param {*} value
     * @return {*}
     */
    setPixelData(column: any, row: any, value: any): any;
    /**
     * Get frame preview as data:URL
     *
     * @return {String}
     */
    getImageDataUrl(): string;
    /**
     * Convert frame.pixelData to canvas.context.imageData.data
     *
     * @return {Uint8Array}
     */
    _frameToCanvas(): Uint8Array;
    /**
     * Convert pixel value to 8 bit (canvas.context.imageData.data: maximum 8 bit per each of RGBA value)
     *
     * @param {Number} value  Pixel value
     * @param {Object} params {invert, min, mix, padding, range}
     *
     * @return {Number}
     */
    _pixelTo8Bit(value: number, params: Object): number;
    /**
     * Compare 2 arrays.
     *
     * 2 null arrays return true.
     * Do no perform strict type checking.
     *
     * @param {*} reference
     * @param {*} target
     *
     * @return {boolean} True if arrays are identicals. False if not.
     */
    _compareArrays(reference: any, target: any): boolean;
    set frameTime(arg: any);
    get frameTime(): any;
    set ultrasoundRegions(arg: any[]);
    get ultrasoundRegions(): any[];
    set rows(arg: number);
    get rows(): number;
    set columns(arg: number);
    get columns(): number;
    set spacingBetweenSlices(arg: any);
    get spacingBetweenSlices(): any;
    set sliceThickness(arg: number);
    get sliceThickness(): number;
    set imagePosition(arg: any);
    get imagePosition(): any;
    set imageOrientation(arg: any);
    get imageOrientation(): any;
    set windowWidth(arg: any);
    get windowWidth(): any;
    set windowCenter(arg: any);
    get windowCenter(): any;
    set rescaleSlope(arg: any);
    get rescaleSlope(): any;
    set rescaleIntercept(arg: any);
    get rescaleIntercept(): any;
    set bitsAllocated(arg: number);
    get bitsAllocated(): number;
    set dist(arg: any);
    get dist(): any;
    set pixelSpacing(arg: any);
    get pixelSpacing(): any;
    set pixelAspectRatio(arg: any);
    get pixelAspectRatio(): any;
    set minMax(arg: any);
    get minMax(): any;
    set dimensionIndexValues(arg: any[]);
    get dimensionIndexValues(): any[];
    set instanceNumber(arg: any);
    get instanceNumber(): any;
    set pixelData(arg: any);
    get pixelData(): any;
    set sopInstanceUID(arg: any);
    get sopInstanceUID(): any;
    set pixelPaddingValue(arg: any);
    get pixelPaddingValue(): any;
    set pixelRepresentation(arg: number);
    get pixelRepresentation(): number;
    set pixelType(arg: number);
    get pixelType(): number;
    set url(arg: any);
    get url(): any;
    set referencedSegmentNumber(arg: number);
    get referencedSegmentNumber(): number;
    set rightHanded(arg: boolean);
    get rightHanded(): boolean;
    set index(arg: number);
    get index(): number;
    set invert(arg: boolean);
    get invert(): boolean;
    set numberOfChannels(arg: number);
    get numberOfChannels(): number;
}
import ModelsBase from "../models/models.base";
