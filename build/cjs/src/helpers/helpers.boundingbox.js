"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpersBoundingBox = void 0;
const three_1 = require("three");
/**
 * @module helpers/boundingbox
 */
class helpersBoundingBox extends three_1.Object3D {
    constructor(stack) {
        //
        super();
        // private vars
        this._stack = stack;
        this._visible = true;
        this._color = 0xffffff;
        this._material = null;
        this._geometry = null;
        this._mesh = null;
        this._meshStack = null;
        // create object
        this._create();
    }
    // getters/setters
    set visible(visible) {
        this._visible = visible;
        if (this._mesh) {
            this._mesh.visible = this._visible;
        }
    }
    get visible() {
        return this._visible;
    }
    set color(color) {
        this._color = color;
        if (this._material) {
            this._material.color.set(this._color);
        }
    }
    get color() {
        return this._color;
    }
    // private methods
    _create() {
        // Convenience vars
        const dimensions = this._stack.dimensionsIJK;
        const halfDimensions = this._stack.halfDimensionsIJK;
        const offset = new three_1.Vector3(-0.5, -0.5, -0.5);
        // Geometry
        const geometry = new three_1.BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
        geometry.applyMatrix4(new three_1.Matrix4().makeTranslation(halfDimensions.x + offset.x, halfDimensions.y + offset.y, halfDimensions.z + offset.z));
        this._geometry = geometry;
        // Material
        this._material = new three_1.MeshBasicMaterial({
            wireframe: true,
        });
        const mesh = new three_1.Mesh(this._geometry, null);
        mesh.applyMatrix4(this._stack.ijk2LPS);
        mesh.visible = this._visible;
        this._meshStack = mesh;
        this._mesh = new three_1.BoxHelper(this._meshStack, this._color);
        this._material = this._mesh.material;
        this.add(this._mesh);
    }
    _update() {
        if (this._mesh) {
            this.remove(this._mesh);
            this._mesh.geometry.dispose();
            this._mesh.geometry = null;
            this._mesh.material.dispose();
            this._mesh.material = null;
            this._mesh = null;
        }
        this._create();
    }
    dispose() {
        this._mesh.material.dispose();
        this._mesh.material = null;
        this._geometry.dispose();
        this._geometry = null;
        this._material.dispose();
        this._material = null;
    }
}
exports.helpersBoundingBox = helpersBoundingBox;
;
