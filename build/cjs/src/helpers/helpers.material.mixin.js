"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpersMaterialMixin = void 0;
const three_1 = require("three");
/**
 * Helpers material mixin.
 *
 * @module helpers/material/mixin
 */
class helpersMaterialMixin extends three_1.Object3D {
    _createMaterial(extraOptions) {
        // generate shaders on-demand!
        let fs = new this._shadersFragment(this._uniforms);
        let vs = new this._shadersVertex();
        // material
        let globalOptions = {
            uniforms: this._uniforms,
            vertexShader: vs.compute(),
            fragmentShader: fs.compute(),
        };
        let options = Object.assign(extraOptions, globalOptions);
        this._material = new three_1.ShaderMaterial(options);
        this._material.needsUpdate = true;
    }
    _updateMaterial() {
        // generate shaders on-demand!
        let fs = new this._shadersFragment(this._uniforms);
        let vs = new this._shadersVertex();
        this._material.vertexShader = vs.compute();
        this._material.fragmentShader = fs.compute();
        this._material.needsUpdate = true;
    }
    _prepareTexture() {
        this._textures = [];
        for (let m = 0; m < this._stack._rawData.length; m++) {
            let tex = new three_1.DataTexture(this._stack.rawData[m], this._stack.textureSize, this._stack.textureSize, this._stack.textureType, three_1.UnsignedByteType, three_1.UVMapping, three_1.ClampToEdgeWrapping, three_1.ClampToEdgeWrapping, three_1.NearestFilter, three_1.NearestFilter);
            tex.needsUpdate = true;
            tex.flipY = true;
            this._textures.push(tex);
        }
    }
}
exports.helpersMaterialMixin = helpersMaterialMixin;
;
