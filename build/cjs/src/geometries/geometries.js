"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelGeometry = exports.SliceGeometry = void 0;
const geometries_slice_1 = require("./geometries.slice");
Object.defineProperty(exports, "SliceGeometry", { enumerable: true, get: function () { return geometries_slice_1.geometriesSlice; } });
const geometries_voxel_1 = require("./geometries.voxel");
Object.defineProperty(exports, "VoxelGeometry", { enumerable: true, get: function () { return geometries_voxel_1.geometriesVoxel; } });
