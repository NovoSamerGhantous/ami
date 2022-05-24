"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitControl = exports.TrackballOrthoControl = exports.TrackballControl = void 0;
const controls_trackball_1 = require("./controls.trackball");
Object.defineProperty(exports, "TrackballControl", { enumerable: true, get: function () { return controls_trackball_1.trackball; } });
const controls_trackballortho_1 = require("./controls.trackballortho");
Object.defineProperty(exports, "TrackballOrthoControl", { enumerable: true, get: function () { return controls_trackballortho_1.trackballOrtho; } });
const controls_orbit_1 = require("./controls.orbit");
Object.defineProperty(exports, "OrbitControl", { enumerable: true, get: function () { return controls_orbit_1.OrbitControls; } });
