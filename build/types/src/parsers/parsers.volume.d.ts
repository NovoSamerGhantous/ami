/**
 * @module parsers/volume
 */
export default class ParsersVolume {
    _rightHanded: boolean;
    pixelRepresentation(): number;
    pixelPaddingValue(frameIndex?: number): any;
    modality(): string;
    segmentationType(): string;
    segmentationSegments(): any[];
    referencedSegmentNumber(frameIndex: any): number;
    rightHanded(): boolean;
    spacingBetweenSlices(): any;
    numberOfChannels(): number;
    sliceThickness(): any;
    dimensionIndexValues(frameIndex?: number): any;
    instanceNumber(frameIndex?: number): number;
    windowCenter(frameIndex?: number): any;
    windowWidth(frameIndex?: number): any;
    rescaleSlope(frameIndex?: number): number;
    rescaleIntercept(frameIndex?: number): number;
    ultrasoundRegions(frameIndex?: number): any[];
    frameTime(frameIndex?: number): any;
    _decompressUncompressed(): void;
    _swap16(val: any): number;
    _swap32(val: any): number;
    invert(): boolean;
    /**
     * Get the transfer syntax UID.
     * @return {*}
     */
    transferSyntaxUID(): any;
    /**
     * Get the study date.
     * @return {*}
     */
    studyDate(): any;
    /**
     * Get the study desciption.
     * @return {*}
     */
    studyDescription(): any;
    /**
     * Get the series date.
     * @return {*}
     */
    seriesDate(): any;
    /**
     * Get the series desciption.
     * @return {*}
     */
    seriesDescription(): any;
    /**
     * Get the raw Header.
     * @return {*}
     */
    rawHeader(): any;
    /**
     * Get the patient ID.
     * @return {*}
     */
    patientID(): any;
    /**
     * Get the patient name.
     * @return {*}
     */
    patientName(): any;
    /**
     * Get the patient age.
     * @return {*}
     */
    patientAge(): any;
    /**
     * Get the patient birthdate.
     * @return {*}
     */
    patientBirthdate(): any;
    /**
     * Get the patient sex.
     * @return {*}
     */
    patientSex(): any;
    /**
     * Get min/max values in array
     *
     * @param {*} pixelData
     *
     * @return {*}
     */
    minMaxPixelData(pixelData?: any): any;
}
