/**
 * Helpers material mixin.
 *
 * @module helpers/material/mixin
 */
export class helpersMaterialMixin extends Object3D<import("three").Event> {
    constructor();
    _createMaterial(extraOptions: any): void;
    _material: ShaderMaterial;
    _updateMaterial(): void;
    _prepareTexture(): void;
    _textures: any[];
}
import { Object3D } from "three/src/core/Object3D";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
