/**
 * Stack object.
 *
 * @module models/stack
 */
export default class ModelsStack extends ModelsBase {
    static indexInDimensions(index: any, dimensions: any): boolean;
    /**
     * @deprecated for core.utils.value
     *
     * Get voxel value.
     *
     * @param {*} stack
     * @param {*} coordinate
     *
     * @return {*}
     */
    static value(stack: any, coordinate: any): any;
    /**
     * @deprecated for core.utils.rescaleSlopeIntercept
     *
     * Apply slope/intercept to a value.
     *
     * @param {*} value
     * @param {*} slope
     * @param {*} intercept
     *
     * @return {*}
     */
    static valueRescaleSlopeIntercept(value: any, slope: any, intercept: any): any;
    /**
     * @deprecated for core.utils.worldToData
     *
     * Transform coordinates from world coordinate to data
     *
     * @param {*} stack
     * @param {*} worldCoordinates
     *
     * @return {*}
     */
    static worldToData(stack: any, worldCoordinates: any): any;
    _uid: any;
    _stackID: number;
    _frame: any[];
    _numberOfFrames: number;
    _rows: number;
    _columns: number;
    _numberOfChannels: number;
    _bitsAllocated: number;
    _pixelType: number;
    _pixelRepresentation: number;
    _textureSize: number;
    _textureUnits: number;
    _rawData: any[];
    _windowCenter: number;
    _windowWidth: number;
    _rescaleSlope: number;
    _rescaleIntercept: number;
    _minMax: number[];
    _regMatrix: Matrix4;
    _ijk2LPS: any;
    _lps2IJK: any;
    _aabb2LPS: any;
    _lps2AABB: any;
    _dimensionsIJK: any;
    _halfDimensionsIJK: any;
    _spacing: Vector3;
    _spacingBetweenSlices: number;
    _sliceThickness: number;
    _origin: Vector3;
    _rightHanded: boolean;
    _xCosine: Vector3;
    _yCosine: Vector3;
    _zCosine: Vector3;
    _prepared: boolean;
    _packed: boolean;
    _packedPerPixel: number;
    _modality: string;
    _segmentationType: any;
    _segmentationSegments: any[];
    _segmentationDefaultColor: number[];
    _frameSegment: any[];
    _segmentationLUT: any[];
    _segmentationLUTO: any[];
    _invert: boolean;
    /**
     * Prepare segmentation stack.
     * A segmentation stack can hold x frames that are at the same location
     * but segmentation specific information:
     * - Frame X contains voxels for segmentation A.
     * - Frame Y contains voxels for segmenttation B.
     * - Frame X and Y are at the same location.
     *
     * We currently merge overlaping frames into 1.
     */
    prepareSegmentation(): void;
    /**
     * Compute cosines
     * Order frames
     * computeSpacing
     * sanityCheck
     * init some vars
     * compute min/max
     * compute transformation matrices
     *
     * @return {*}
     */
    prepare(): any;
    packEchos(): void;
    computeNumberOfFrames(): boolean;
    computeCosines(): void;
    orderFrames(): void;
    computeSpacing(): void;
    /**
     * Compute stack z spacing
     */
    zSpacing(): void;
    /**
     *  FRAME CAN DO IT
     */
    xySpacing(): void;
    /**
     * Find min and max intensities among all frames.
     */
    computeMinMaxIntensities(): void;
    /**
     * Compute IJK to LPS and invert transforms
     */
    computeIJK2LPS(): void;
    /**
     * Compute LPS to AABB and invert transforms
     */
    computeLPS2AABB(): void;
    /**
     * Merge stacks
     *
     * @param {*} stack
     *
     * @return {*}
     */
    merge(stack: any): any;
    /**
     * Pack current stack pixel data into 8 bits array buffers
     */
    pack(): void;
    _textureType: any;
    /**
     * Pack frame data to 32 bits texture
     * @param {*} channels
     * @param {*} frame
     * @param {*} textureSize
     * @param {*} startVoxel
     * @param {*} stopVoxel
     */
    _packTo8Bits(channels: any, frame: any, textureSize: any, startVoxel: any, stopVoxel: any): {
        textureType: any;
        data: any;
    };
    /**
     * Get the stack world center
     *
     *@return {*}
     */
    worldCenter(): any;
    /**
     * Get the stack world bounding box
     * @return {*}
     */
    worldBoundingBox(): any;
    /**
     * Get AABB size in LPS space.
     *
     * @return {*}
     */
    AABBox(): any;
    /**
     * Get AABB center in LPS space
     */
    centerAABBox(): any;
    _arrayToVector3(array: any, index: any): Vector3;
    _orderFrameOnDimensionIndicesArraySort(a: any, b: any): 0 | 1 | -1;
    _computeDistanceArrayMap(normal: any, frame: any): any;
    _sortDistanceArraySort(a: any, b: any): number;
    _sortInstanceNumberArraySort(a: any, b: any): number;
    _sortSopInstanceUIDArraySort(a: any, b: any): number;
    set numberOfChannels(arg: number);
    get numberOfChannels(): number;
    set frame(arg: any[]);
    get frame(): any[];
    set prepared(arg: boolean);
    get prepared(): boolean;
    set packed(arg: boolean);
    get packed(): boolean;
    set packedPerPixel(arg: number);
    get packedPerPixel(): number;
    set dimensionsIJK(arg: any);
    get dimensionsIJK(): any;
    set halfDimensionsIJK(arg: any);
    get halfDimensionsIJK(): any;
    set regMatrix(arg: Matrix4);
    get regMatrix(): Matrix4;
    set ijk2LPS(arg: any);
    get ijk2LPS(): any;
    set lps2IJK(arg: any);
    get lps2IJK(): any;
    set lps2AABB(arg: any);
    get lps2AABB(): any;
    set textureSize(arg: number);
    get textureSize(): number;
    set textureUnits(arg: number);
    get textureUnits(): number;
    set textureType(arg: any);
    get textureType(): any;
    set bitsAllocated(arg: number);
    get bitsAllocated(): number;
    set rawData(arg: any[]);
    get rawData(): any[];
    set windowWidth(arg: number);
    get windowWidth(): number;
    set windowCenter(arg: number);
    get windowCenter(): number;
    set rescaleSlope(arg: number);
    get rescaleSlope(): number;
    set rescaleIntercept(arg: number);
    get rescaleIntercept(): number;
    set xCosine(arg: Vector3);
    get xCosine(): Vector3;
    set yCosine(arg: Vector3);
    get yCosine(): Vector3;
    set zCosine(arg: Vector3);
    get zCosine(): Vector3;
    set minMax(arg: number[]);
    get minMax(): number[];
    set stackID(arg: number);
    get stackID(): number;
    set pixelType(arg: number);
    get pixelType(): number;
    set pixelRepresentation(arg: number);
    get pixelRepresentation(): number;
    set invert(arg: boolean);
    get invert(): boolean;
    set modality(arg: string);
    get modality(): string;
    set rightHanded(arg: boolean);
    get rightHanded(): boolean;
    set spacingBetweenSlices(arg: number);
    get spacingBetweenSlices(): number;
    set segmentationSegments(arg: any[]);
    get segmentationSegments(): any[];
    set segmentationType(arg: any);
    get segmentationType(): any;
    set segmentationLUT(arg: any[]);
    get segmentationLUT(): any[];
    set segmentationLUTO(arg: any[]);
    get segmentationLUTO(): any[];
}
import ModelsBase from "../models/models.base";
import { Matrix4 } from "three/src/math/Matrix4";
import { Vector3 } from "three/src/math/Vector3";
//# sourceMappingURL=models.stack.d.ts.map