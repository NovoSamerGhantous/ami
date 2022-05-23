/**
 * General purpose functions.
 *
 * @module core/utils
 */
export default class CoreUtils {
    /**
     * Generate a bouding box object.
     * @param {Vector3} center - Center of the box.
     * @param {Vector3} halfDimensions - Half Dimensions of the box.
     * @return {Object} The bounding box object. {Object.min} is a {Vector3}
     * containing the min bounds. {Object.max} is a {Vector3} containing the
     * max bounds.
     * @return {boolean} False input NOT valid.
     * @example
     * // Returns
     * //{ min: { x : 0, y : 0,  z : 0 },
     * //  max: { x : 2, y : 4,  z : 6 }
     * //}
     * VJS.Core.Utils.bbox(
     *   new Vector3(1, 2, 3), new Vector3(1, 2, 3));
     *
     * //Returns false
     * VJS.Core.Utils.bbox(new Vector3(), new Matrix4());
     *
     */
    static bbox(center: Vector3, halfDimensions: Vector3): any;
    /**
     * Find min/max values in an array
     * @param {Array} data
     * @return {Array}
     */
    static minMax(data?: any[]): any[];
    /**
     * Check HTMLElement
     * @param {HTMLElement} obj
     * @return {boolean}
     */
    static isElement(obj: HTMLElement): boolean;
    /**
     * Check string
     * @param {String} str
     * @return {Boolean}
     */
    static isString(str: string): boolean;
    /**
     * Parse url and find out the extension of the exam file.
     *
     * @param {*} url - The url to be parsed.
     * The query string can contain some "special" parameters that can be used to ease the parsing process
     * when the url doesn't match the exam file name on the filesystem:
     * - filename: the name of the exam file
     * - contentType: the mime type of the exam file. Currently only "application/dicom" is recognized, nifti files don't have a standard mime type.
     * For  example:
     * http://<hostname>/getExam?id=100&filename=myexam%2Enii%2Egz
     * http://<hostname>/getExam?id=100&contentType=application%2Fdicom
     *
     * @return {Object}
     */
    static parseUrl(url: any): any;
    /**
     * Compute IJK to LPS tranform.
     *  http://nipy.org/nibabel/dicom/dicom_orientation.html
     *
     * @param {*} xCos
     * @param {*} yCos
     * @param {*} zCos
     * @param {*} spacing
     * @param {*} origin
     * @param {*} registrationMatrix
     *
     * @return {*}
     */
    static ijk2LPS(xCos: any, yCos: any, zCos: any, spacing: any, origin: any, registrationMatrix?: any): any;
    /**
     * Compute AABB to LPS transform.
     * AABB: Axe Aligned Bounding Box.
     *
     * @param {*} xCos
     * @param {*} yCos
     * @param {*} zCos
     * @param {*} origin
     *
     * @return {*}
     */
    static aabb2LPS(xCos: any, yCos: any, zCos: any, origin: any): any;
    /**
     * Transform coordinates from world coordinate to data
     *
     * @param {*} lps2IJK
     * @param {*} worldCoordinates
     *
     * @return {*}
     */
    static worldToData(lps2IJK: any, worldCoordinates: any): any;
    static value(stack: any, coordinate: any): void;
    /**
     * Get voxel value
     *
     * @param {ModelsStack} stack
     * @param {Vector3} coordinate
     * @return {*}
     */
    static getPixelData(stack: ModelsStack, coordinate: Vector3): any;
    /**
     * Set voxel value
     *
     * @param {ModelsStack} stack
     * @param {Vector3} coordinate
     * @param {Number} value
     * @return {*}
     */
    static setPixelData(stack: ModelsStack, coordinate: Vector3, value: number): any;
    /**
     * Apply slope/intercept to a value
     *
     * @param {*} value
     * @param {*} slope
     * @param {*} intercept
     *
     * @return {*}
     */
    static rescaleSlopeIntercept(value: any, slope: any, intercept: any): any;
    /**
     *
     * Convenience function to extract center of mass from list of points.
     *
     * @param {Array<Vector3>} points - Set of points from which we want to extract the center of mass.
     *
     * @returns {Vector3} Center of mass from given points.
     */
    static centerOfMass(points: Array<Vector3>): Vector3;
    /**
     *
     * Order 3D planar points around a refence point.
     *
     * @private
     *
     * @param {Array<Vector3>} points - Set of planar 3D points to be ordered.
     * @param {Vector3} direction - Direction of the plane in which points and reference are sitting.
     *
     * @returns {Array<Object>} Set of object representing the ordered points.
     */
    private static orderIntersections;
    /**
     * Get min, max, mean and sd of voxel values behind the mesh
     *
     * @param {THREE.Mesh}  mesh    Region of Interest
     * @param {*}           camera  Tested on CamerasOrthographic
     * @param {ModelsStack} stack
     *
     * @return {Object|null}
     */
    static getRoI(mesh: THREE.Mesh, camera: any, stack: ModelsStack): any | null;
    /**
     * Calculate shape area (sum of triangle polygons area).
     * May be inaccurate or completely wrong for some shapes.
     *
     * @param {THREE.Geometry} geometry
     *
     * @returns {Number}
     */
    static getGeometryArea(geometry: THREE.Geometry): number;
    static stringToNumber(numberAsString: any): number;
}
import { Vector3 } from "three/src/math/Vector3";
//# sourceMappingURL=core.utils.d.ts.map