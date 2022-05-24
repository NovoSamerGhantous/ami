"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShadersVertex {
    compute() {
        return `
// varying vec4 vPos;
varying vec4 vProjectedCoords;

//
// main
//
void main() {

  vec4 vPos = modelMatrix * vec4(position, 1.0 );
  vProjectedCoords =  projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
        `;
    }
}
exports.default = ShadersVertex;
