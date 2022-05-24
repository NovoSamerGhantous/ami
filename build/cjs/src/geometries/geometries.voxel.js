"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geometriesVoxel = void 0;
const three_1 = require("three");
/**
 *
 * @module geometries/voxel
 */
class geometriesVoxel extends three_1.BoxGeometry {
    constructor(dataPosition) {
        super(1, 1, 1);
        this._location = dataPosition;
        this.applyMatrix(new three_1.Matrix4().makeTranslation(this._location.x, this._location.y, this._location.z));
        this.verticesNeedUpdate = true;
    }
    resetVertices() {
        this.vertices[0].set(0.5, 0.5, 0.5);
        this.vertices[1].set(0.5, 0.5, -0.5);
        this.vertices[2].set(0.5, -0.5, 0.5);
        this.vertices[3].set(0.5, -0.5, -0.5);
        this.vertices[4].set(-0.5, 0.5, -0.5);
        this.vertices[5].set(-0.5, 0.5, 0.5);
        this.vertices[6].set(-0.5, -0.5, -0.5);
        this.vertices[7].set(-0.5, -0.5, 0.5);
    }
    set location(location) {
        this._location = location;
        // update vertices from location
        this.vertices[0].set(+0.5, +0.5, +0.5);
        this.vertices[1].set(+0.5, +0.5, -0.5);
        this.vertices[2].set(+0.5, -0.5, +0.5);
        this.vertices[3].set(+0.5, -0.5, -0.5);
        this.vertices[4].set(-0.5, +0.5, -0.5);
        this.vertices[5].set(-0.5, +0.5, +0.5);
        this.vertices[6].set(-0.5, -0.5, -0.5);
        this.vertices[7].set(-0.5, -0.5, +0.5);
        this.applyMatrix(new three_1.Matrix4().makeTranslation(this._location.x, this._location.y, this._location.z));
        this.verticesNeedUpdate = true;
    }
    get location() {
        return this._location;
    }
}
exports.geometriesVoxel = geometriesVoxel;
;
