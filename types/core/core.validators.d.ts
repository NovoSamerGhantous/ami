/**
 * Validate basic structures.
 *
 * @example
 * //Returns true
 * VJS.Core.Validators.matrix4(new THREE.Matrix4());
 *
 * //Returns false
 * VJS.Core.Validators.matrix4(new THREE.Vector3());
 *
 * @module core/validators
 */
export default class Validators {
    /**
     * Validates a matrix as a THREEJS.Matrix4
     * link
     * @param {Object} objectToTest - The object to be tested.
     * @return {boolean} True if valid Matrix4, false if NOT.
     */
    static matrix4(objectToTest: any): boolean;
    /**
     * Validates a vector as a THREEJS.Vector3
     * @param {Object} objectToTest - The object to be tested.
     * @return {boolean} True if valid Vector3, false if NOT.
     */
    static vector3(objectToTest: any): boolean;
    /**
     * Validates a box.
     *
     * @example
     * // a box is defined as
     * let box = {
     *   center: THREE.Vector3,
     *   halfDimensions: THREE.Vector3
     * }
     *
     * @param {Object} objectToTest - The object to be tested.
     * @return {boolean} True if valid box, false if NOT.
     */
    static box(objectToTest: any): boolean;
    /**
     * Validates a ray.
     *
     * @example
     * // a ray is defined as
     * let ray = {
     *   postion: THREE.Vector3,
     *   direction: THREE.Vector3
     * }
     *
     * @param {Object} objectToTest - The object to be tested.
     * @return {boolean} True if valid ray, false if NOT.
     */
    static ray(objectToTest: any): boolean;
}
//# sourceMappingURL=core.validators.d.ts.map