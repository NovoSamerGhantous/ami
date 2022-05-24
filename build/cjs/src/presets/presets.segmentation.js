"use strict";
/**
 * @module presets/segmentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const presets_segmentation_freesurfer_1 = __importDefault(require("./presets.segmentation.freesurfer"));
class PresetsSegmentation {
    constructor(presetID = 'Freesurfer') {
        this._presetID = presetID;
        this._presets = this.presetSegs();
    }
    set preset(targetPreset) {
        this._presetID = targetPreset;
    }
    get preset() {
        return this.fetchPreset(this._presetID);
    }
    fetchPreset(presetID) {
        let presets = this._presets;
        return presets[presetID];
    }
    addPreset(presetObj) {
        this._presets.push(presetObj);
    }
    presetsAvailable(type = 'segmentation') {
        let available = [];
        let presets = this._presets;
        for (let i in presets) {
            available.push(i);
        }
        return available;
    }
    presetSegs() {
        return {
            Freesurfer: presets_segmentation_freesurfer_1.default,
        };
    }
}
exports.default = PresetsSegmentation;
