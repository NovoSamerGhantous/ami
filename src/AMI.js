export * from './cameras/cameras';
export * from './controls/controls';
export * from './core/core';
export * from './geometries/geometries';
export * from './helpers/helpers';
export * from './loaders/loaders';
export * from './models/models';
export * from './parsers/parsers';
export * from './presets/presets';
export * from './shaders/shaders';
export * from './widgets/widgets';

const packageVersion = require('../package.json').version;
const d3Version = require('three/package').version;
console.log(`AMI ${packageVersion} (three ${d3Version})`);