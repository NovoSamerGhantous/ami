"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NrrdParser = exports.NiftiParser = exports.MghParser = exports.DicomParser = void 0;
const parsers_dicom_1 = __importDefault(require("./parsers.dicom"));
exports.DicomParser = parsers_dicom_1.default;
const parsers_mgh_1 = __importDefault(require("./parsers.mgh"));
exports.MghParser = parsers_mgh_1.default;
const parsers_nifti_1 = __importDefault(require("./parsers.nifti"));
exports.NiftiParser = parsers_nifti_1.default;
const parsers_nrrd_1 = __importDefault(require("./parsers.nrrd"));
exports.NrrdParser = parsers_nrrd_1.default;
