"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shaders_interpolation_identity_1 = __importDefault(require("./shaders.interpolation.identity"));
const shaders_interpolation_trilinear_1 = __importDefault(require("./shaders.interpolation.trilinear"));
function shadersInterpolation(baseFragment, currentVoxel, dataValue, gradient) {
    switch (baseFragment._uniforms.uInterpolation.value) {
        case 0:
            // no interpolation
            return shaders_interpolation_identity_1.default.api(baseFragment, currentVoxel, dataValue);
        case 1:
            // trilinear interpolation
            return shaders_interpolation_trilinear_1.default.api(baseFragment, currentVoxel, dataValue, gradient);
        default:
            return shaders_interpolation_identity_1.default.api(baseFragment, currentVoxel, dataValue);
    }
}
exports.default = shadersInterpolation;
