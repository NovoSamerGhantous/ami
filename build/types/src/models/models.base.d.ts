/**
 * Base object.
 *
 * @module models/base
 */
export default class ModelsBase {
    _id: number;
    /**
     * Merge 2 arrays of models.
     * Merge the target array into the reference array.
     *
     * @param {Array.<Models>} referenceArray - Array to be merge against
     * @param {Array.<Models>} targetArray - Array to be merged against reference.
     *
     * @return {boolean} True if merge was sucessful. False if something went wrong.
     */
    mergeModels(referenceArray: Array<Models>, targetArray: Array<Models>): boolean;
    /**
     * Merge model against current model.
     */
    merge(model: any): boolean;
    /**
     * Validate a model.
     *
     * @return {boolean} True if model is valid. False if not.
     */
    validate(model: any): boolean;
    /**
     * Validate array of models.
     *
     * @param {Array.<Models>} modelArray - Array containing models.
     *
     * @return {boolean} True if array is valid. False if not.
     */
    _validateModelArray(modelArray: Array<Models>): boolean;
}
