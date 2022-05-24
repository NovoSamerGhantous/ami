"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
/**
 * @module helpers/x/mesh
 */
class default_1 {
    constructor() {
        this._file = null;
        this._3jsVTK_loader = new three_1.VTKLoader();
        this._mesh = null;
        this._materialColor = 0xe91e63;
        this._RAStoLPS = null;
        this._material = new three_1.MeshLambertMaterial({
            shading: three_1.SmoothShading,
            color: this._materialColor,
            side: three_1.DoubleSide,
        });
    }
    // accessor properties
    get file() {
        return this._file;
    }
    set file(fname) {
        this._file = fname;
    }
    get materialColor() {
        return this._materialColor;
    }
    set materialColor(color) {
        this._materialColor = color;
    }
    // load function
    load() {
        if (this.file) {
            return new Promise((resolve, reject) => {
                this._3jsVTK_loader.load(this.file, geometry => {
                    geometry.computeVertexNormals();
                    this._mesh = new three_1.Mesh(geometry, this._material);
                    this._RAStoLPS = new three_1.Matrix4();
                    this._RAStoLPS.set(-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                    this._mesh.applyMatrix4(this._RAStoLPS);
                    // resolve the promise and return the mesh
                    resolve(this._mesh);
                }, () => { }, error => {
                    console.log(error);
                    reject({
                        message: `Couldn't load file: ${this.file}.`,
                        error,
                    });
                });
            });
        }
        return Promise.reject({ message: `File is not defined: ${this.file}.` });
    }
}
exports.default = default_1;
