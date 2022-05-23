/**
 * Series object.
 *
 * @module models/series
 */
export default class ModelsSeries extends ModelsBase {
    _concatenationUID: number;
    _seriesInstanceUID: number;
    _transferSyntaxUID: string;
    _seriesNumber: number;
    _seriesDescription: string;
    _seriesDate: string;
    _studyDescription: string;
    _studyDate: string;
    _accessionNumber: number;
    _modality: string;
    _dimensionIndexSequence: any[];
    _numberOfFrames: number;
    _numberOfChannels: number;
    _rawHeader: any;
    _patientID: string;
    _patientName: string;
    _patientAge: string;
    _patientBirthdate: string;
    _patientSex: string;
    _segmentationType: any;
    _segmentationSegments: any[];
    _stack: any[];
    /**
     * Validate a series.
     *
     * Requirements:
     *   - mergeSeries method
     *   - _seriesInstanceUID
     *   - _numberOfFrames
     *   - _numberOfChannels
     *   _ _stack
     *
     * @param {ModelsSeries} model - Model to be validated as series.
     *
     * @return {boolean} True if series is valid. False if not.
     *
     * @override
     */
    override validate(model: ModelsSeries): boolean;
    /**
     * Merge current series with provided series.
     * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
     *
     * Also merges the stacks inside a series.
     *
     * @param {ModelsSeries} series - Series to be merged against current series.
     *
     * @return {boolean} True if series could be merge. False if not.
     *
     * @override
     */
    override merge(series: ModelsSeries): boolean;
    /**
     * Merge current series with provided array of series.
     * 2 series can ONLY be merge if they have the same SeriesInstanceUID.
     *
     * Also merges the stacks inside a series.
     *
     * @param {Array.<ModelsSeries>} target - Series to be merged against current series.
     *
     * @return {Array.<ModelsSeries>} Array of series properly merged.
     */
    mergeSeries(target: Array<ModelsSeries>): Array<ModelsSeries>;
    /**
     * Series instance UID setter
     *
     * @param {*} seriesInstanceUID
     */
    set seriesInstanceUID(arg: any);
    /**
     * Series instace UID getter
     *
     * @return {*}
     */
    get seriesInstanceUID(): any;
    /**
     * Transfer syntax UID setter
     *
     * @param {*} transferSyntaxUID
     */
    set transferSyntaxUID(arg: any);
    /**
     * Transfer syntax UID getter
     *
     * @return {*}
     */
    get transferSyntaxUID(): any;
    /**
     * Transfer syntax UID getter
     *
     * @return {*}
     */
    get transferSyntaxUIDLabel(): any;
    /**
     * Study date setter
     *
     * @param {*} studyDate
     */
    set studyDate(arg: any);
    /**
     * Study date getter
     *
     * @return {*}
     */
    get studyDate(): any;
    /**
     * Study descripition setter
     *
     * @param {*} studyDescription
     */
    set studyDescription(arg: any);
    /**
     * Study description getter
     *
     * @return {*}
     */
    get studyDescription(): any;
    /**
     * Series date setter
     *
     * @param {*} seriesDate
     */
    set seriesDate(arg: any);
    /**
     * Series date getter
     *
     * @return {*}
     */
    get seriesDate(): any;
    /**
     * Series descripition setter
     *
     * @param {*} seriesDescription
     */
    set seriesDescription(arg: any);
    /**
     * Series description getter
     *
     * @return {*}
     */
    get seriesDescription(): any;
    /**
   * Raw Header setter
   *
   * @param {*} rawHeader
   */
    set rawHeader(arg: any);
    /**
     * Raw Header getter
     *
     * @return {*}
     */
    get rawHeader(): any;
    /**
     * Patient ID setter
     *
     * @param {*} patientID
     */
    set patientID(arg: any);
    /**
     * Patient ID getter
     *
     * @return {*}
     */
    get patientID(): any;
    /**
     * Patient name setter
     *
     * @param {*} patientName
     */
    set patientName(arg: any);
    /**
     * Patient name getter
     *
     * @return {*}
     */
    get patientName(): any;
    /**
     * Patient age setter
     *
     * @param {*} patientAge
     */
    set patientAge(arg: any);
    /**
     * Patient age getter
     *
     * @return {*}
     */
    get patientAge(): any;
    /**
     * Patient birthdate setter
     *
     * @param {*} patientBirthdate
     */
    set patientBirthdate(arg: any);
    /**
     * Patient birthdate getter
     *
     * @return {*}
     */
    get patientBirthdate(): any;
    /**
     * Patient sex setter
     *
     * @param {*} patientSex
     */
    set patientSex(arg: any);
    /**
     * Patient sex getter
     *
     * @return {*}
     */
    get patientSex(): any;
    /**
     * Number of frames setter
     *
     * @param {*} numberOfFrames
     */
    set numberOfFrames(arg: any);
    /**
     * Number of frames getter
     *
     * @return {*}
     */
    get numberOfFrames(): any;
    /**
     * Number of channels setter
     *
     * @param {*} numberOfChannels
     */
    set numberOfChannels(arg: any);
    /**
     * Number of channels getter
     *
     * @return {*}
     */
    get numberOfChannels(): any;
    /**
     * Stack setter
     *
     * @param {*} stack
     */
    set stack(arg: any);
    /**
     * Stack getter
     *
     * @return {*}
     */
    get stack(): any;
    /**
     * Modality setter
     *
     * @param {*} modality
     */
    set modality(arg: any);
    /**
     * Modality getter
     *
     * @return {*}
     */
    get modality(): any;
    /**
     * Segmentation type setter
     *
     * @param {*} segmentationType
     */
    set segmentationType(arg: any);
    /**
     * Segmentation type getter
     *
     * @return {*}
     */
    get segmentationType(): any;
    /**
     * Segmentation segments setter
     *
     * @param {*} segmentationSegments
     */
    set segmentationSegments(arg: any);
    /**
     * Segmentation segments getter
     *
     * @return {*}
     */
    get segmentationSegments(): any;
}
import ModelsBase from "../models/models.base";
//# sourceMappingURL=models.series.d.ts.map