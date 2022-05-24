"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers/x/volume
 */
const helpers_stack_1 = __importDefault(require("../helpers.stack"));
const loaders_volume_1 = __importDefault(require("../../loaders/loaders.volume"));
const three_1 = require("three");
class default_1 extends three_1.Object3D {
    constructor() {
        super();
        this._file = null;
        this._progressbarContainer = null;
        this._stack = null;
        this._centerLPS = null;
        this._xSlice = null;
        this._ySlice = null;
        this._zSlice = null;
    }
    // accessor properties
    get file() {
        return this._file;
    }
    set file(fname) {
        this._file = fname;
    }
    set progressbarContainer(container) {
        this._progressbarContainer = container;
    }
    get centerLPS() {
        return this._centerLPS;
    }
    get stack() {
        return this._stack;
    }
    // private methods
    _createSlice(orientation) {
        if (this._stack) {
            const stackHelper = new helpers_stack_1.default(this._stack);
            stackHelper.orientation = orientation;
            if (orientation === 0) {
                stackHelper.border.color = 0xf44336;
                this._xSlice = stackHelper;
            }
            else if (orientation === 1) {
                stackHelper.bbox.visible = false;
                stackHelper.border.color = 0x4caf50;
                this._ySlice = stackHelper;
            }
            else {
                stackHelper.bbox.visible = false;
                stackHelper.border.color = 0x2196f3;
                this._zSlice = stackHelper;
            }
            this._centerLPS = stackHelper.stack.worldCenter();
        }
    }
    // public methods
    load() {
        if (this.file) {
            // instantiate the loader
            // it loads and parses the dicom image
            const loader = new loaders_volume_1.default(this._progressbarContainer);
            return loader
                .load(this.file)
                .then(() => {
                return new Promise((resolve, reject) => {
                    if (loader.data.length <= 0) {
                        return reject({ message: `No data loaded: ${loader.data}.` });
                    }
                    // create the three slices when all files have been loaded
                    const series = loader.data[0].mergeSeries(loader.data)[0];
                    loader.free();
                    this._stack = series.stack[0];
                    this._createSlice(0);
                    this.add(this._xSlice);
                    this._createSlice(1);
                    this.add(this._ySlice);
                    this._createSlice(2);
                    this.add(this._zSlice);
                    return resolve(this);
                });
            })
                .catch(function (error) {
                loader.free();
                console.log('Something went wrong loading the volume...');
                console.log(error);
            });
        }
        return Promise.reject({ message: `File not defined: ${this.file}.` });
    }
}
exports.default = default_1;
