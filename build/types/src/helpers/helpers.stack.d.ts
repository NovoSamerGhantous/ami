/**
 * Helper to easily display and interact with a stack.<br>
 *<br>
 * Defaults:<br>
 *   - orientation: 0 (acquisition direction)<br>
 *   - index: middle slice in acquisition direction<br>
 *<br>
 * Features:<br>
 *   - slice from the stack (in any direction)<br>
 *   - slice border<br>
 *   - stack bounding box<br>
 *<br>
 * Live demo at: {@link http://jsfiddle.net/gh/get/library/pure/fnndsc/ami/tree/master/lessons/01#run|Lesson 01}
 *
 * @example
 * let stack = new VJS.Models.Stack();
 * ... // prepare the stack
 *
 * let helpersStack = new VJS.Helpers.Stack(stack);
 * stackHelper.bbox.color = 0xF9F9F9;
 * stackHelper.border.color = 0xF9F9F9;
 *
 * let scene = new THREE.Scene();
 * scene.add(stackHelper);
 *
 * @see module:helpers/border
 * @see module:helpers/boundingbox
 * @see module:helpers/slice
 *
 * @module helpers/stack
 */
export class helpersStack extends Object3D<import("three").Event> {
    constructor(stack: any);
    _stack: any;
    _bBox: any;
    _slice: any;
    _border: any;
    _dummy: any;
    _orientation: number;
    _index: number;
    _uniforms: any;
    _autoWindowLevel: boolean;
    _outOfBounds: boolean;
    _orientationMaxIndex: number;
    _orientationSpacing: number;
    _canvasWidth: number;
    _canvasHeight: number;
    _borderColor: any;
    /**
     * Set stack.
     *
     * @type {ModelsStack}
     */
    set stack(arg: ModelsStack);
    /**
     * Get stack.
     *
     * @type {ModelsStack}
     */
    get stack(): ModelsStack;
    /**
     * Get bounding box helper.
     *
     * @type {HelpersBoundingBox}
     */
    get bbox(): HelpersBoundingBox;
    /**
     * Get slice helper.
     *
     * @type {HelpersSlice}
     */
    get slice(): HelpersSlice;
    /**
     * Get border helper.
     *
     * @type {HelpersSlice}
     */
    get border(): HelpersSlice;
    set index(arg: number);
    /**
     * Set/get current slice index.<br>
     * Sets outOfBounds flag to know if target index is in/out stack bounding box.<br>
     * <br>
     * Internally updates the sliceHelper index and position. Also updates the
     * borderHelper with the updated sliceHelper.
     *
     * @type {number}
     */
    get index(): number;
    /**
     * Set/get current slice orientation.<br>
     * Values: <br>
     *   - 0: acquisition direction (slice normal is z_cosine)<br>
     *   - 1: next direction (slice normal is x_cosine)<br>
     *   - 2: next direction (slice normal is y_cosine)<br>
     *   - n: set orientation to 0<br>
     * <br>
     * Internally updates the sliceHelper direction. Also updates the
     * borderHelper with the updated sliceHelper.
     *
     * @type {number}
     */
    set orientation(arg: number);
    get orientation(): number;
    /**
     * Set/get the outOfBound flag.
     *
     * @type {boolean}
     */
    set outOfBounds(arg: boolean);
    get outOfBounds(): boolean;
    /**
     * Set/get the orientationMaxIndex.
     *
     * @type {number}
     */
    set orientationMaxIndex(arg: number);
    get orientationMaxIndex(): number;
    /**
     * Set/get the orientationSpacing.
     *
     * @type {number}
     */
    set orientationSpacing(arg: number);
    get orientationSpacing(): number;
    set canvasWidth(arg: number);
    get canvasWidth(): number;
    set canvasHeight(arg: number);
    get canvasHeight(): number;
    set borderColor(arg: any);
    get borderColor(): any;
    /**
     * Initial setup, including stack prepare, bbox prepare, slice prepare and
     * border prepare.
     *
     * @private
     */
    private _create;
    _computeOrientationSpacing(): void;
    _computeOrientationMaxIndex(): void;
    /**
     * Given orientation, check if index is in/out of bounds.
     *
     * @private
     */
    private _isIndexOutOfBounds;
    /**
     * Prepare a stack for visualization. (image to world transform, frames order,
     * pack data into 8 bits textures, etc.)
     *
     * @private
     */
    private _prepareStack;
    /**
     * Setup bounding box helper given prepared stack and add bounding box helper
     * to stack helper.
     *
     * @private
     */
    private _prepareBBox;
    /**
     * Setup border helper given slice helper and add border helper
     * to stack helper.
     *
     * @private
     */
    private _prepareBorder;
    /**
     * Setup slice helper given prepared stack helper and add slice helper
     * to stack helper.
     *
     * @private
     */
    private _prepareSlice;
    /**
     * Compute slice index depending on orientation.
     *
     * @param {Vector3} indices - Indices in each direction.
     *
     * @returns {number} Slice index according to current orientation.
     *
     * @private
     */
    private _prepareSliceIndex;
    /**
     * Compute slice position depending on orientation.
     * Sets index in proper location of reference position.
     *
     * @param {Vector3} rPosition - Reference position.
     * @param {number} index - Current index.
     *
     * @returns {number} Slice index according to current orientation.
     *
     * @private
     */
    private _prepareSlicePosition;
    /**
     * Compute slice direction depending on orientation.
     *
     * @param {number} orientation - Slice orientation.
     *
     * @returns {Vector3} Slice direction
     *
     * @private
     */
    private _prepareDirection;
    /**
     * Release the stack helper memory including the slice memory.
     *
     * @public
     */
    public dispose(): void;
}
import { Object3D } from "three/src/core/Object3D";
