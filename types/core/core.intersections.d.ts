/**
 * Compute/test intersection between different objects.
 *
 * @module core/intersections
 */
export default class Intersections {
    /**
     * Compute intersection between oriented bounding box and a plane.
     *
     * Returns intersection in plane's space.
     *
     * Should return at least 3 intersections. If not, the plane and the box do not
     * intersect.
     *
     * @param {Object} aabb - Axe Aligned Bounding Box representation.
     * @param {Vector3} aabb.halfDimensions - Half dimensions of the box.
     * @param {Vector3} aabb.center - Center of the box.
     * @param {Matrix4} aabb.toAABB - Transform to go from plane space to box space.
     * @param {Object} plane - Plane representation
     * @param {Vector3} plane.position - position of normal which describes the plane.
     * @param {Vector3} plane.direction - Direction of normal which describes the plane.
     *
     * @returns {Array<Vector3>} List of all intersections in plane's space.
     * @returns {boolean} false is invalid input provided.
     *
     * @example
     * //Returns array with intersection N intersections
     * let aabb = {
     *   center: new Vector3(150, 150, 150),
     *   halfDimensions: new Vector3(50, 60, 70),
     *   toAABB: new Matrix4()
     * }
     * let plane = {
     *   position: new Vector3(110, 120, 130),
     *   direction: new Vector3(1, 0, 0)
     * }
     *
     * let intersections = CoreIntersections.aabbPlane(aabb, plane);
     * // intersections ==
     * //[ { x : 110, y : 90,  z : 80 },
     * //  { x : 110, y : 210, z : 220 },
     * //  { x : 110, y : 210, z : 80 },
     * //  { x : 110, y : 90,  z : 220 } ]
     *
     * //Returns empty array with 0 intersections
     * let aabb = {
     *
     * }
     * let plane = {
     *
     * }
     *
     * let intersections = VJS.Core.Validators.matrix4(new Vector3());
     *
     * //Returns false if invalid input?
     *
     */
    static aabbPlane(aabb: {
        halfDimensions: Vector3;
        center: Vector3;
        toAABB: Matrix4;
    }, plane: {
        position: Vector3;
        direction: Vector3;
    }): Array<Vector3>;
    /**
     * Compute intersection between a ray and a plane.
     *
     * @memberOf this
     * @public
     *
     * @param {Object} ray - Ray representation.
     * @param {Vector3} ray.position - position of normal which describes the ray.
     * @param {Vector3} ray.direction - Direction of normal which describes the ray.
     * @param {Object} plane - Plane representation
     * @param {Vector3} plane.position - position of normal which describes the plane.
     * @param {Vector3} plane.direction - Direction of normal which describes the plane.
     *
     * @returns {Vector3|null} Intersection between ray and plane or null.
     */
    public static rayPlane(ray: {
        position: Vector3;
        direction: Vector3;
    }, plane: {
        position: Vector3;
        direction: Vector3;
    }): Vector3 | null;
    /**
     * Compute intersection between a ray and a box
     * @param {Object} ray
     * @param {Object} box
     * @return {Array}
     */
    static rayBox(ray: any, box: any): any[];
    /**
     * Intersection between ray and a plane that are in a box.
     * @param {*} ray
     * @param {*} planeAABB
     * @param {*} bbox
     * @param {*} intersections
     */
    static rayPlaneInBBox(ray: any, planeAABB: any, bbox: any, intersections: any): void;
    /**
     * Find intersection in array
     * @param {*} myintersection
     */
    static findIntersection(myintersection: any): (element: any, index: any, array: any) => boolean;
    /**
     * Is point in box.
     * @param {Object} point
     * @param {Object} bbox
     * @return {Boolean}
     */
    static inBBox(point: any, bbox: any): boolean;
    static posdir(position: any, direction: any): {
        position: any;
        direction: any;
    };
    static validatePlane(plane: any): boolean;
    static validateAabb(aabb: any): boolean;
}
import { Vector3 } from "three/src/math/Vector3";
import { Matrix4 } from "three/src/math/Matrix4";
//# sourceMappingURL=core.intersections.d.ts.map