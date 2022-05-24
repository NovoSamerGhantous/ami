"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShadersVertex {
    compute() {
        return `
varying vec4 vPos;

//
// main
//
void main() {

  vPos = modelMatrix * vec4(position, 1.0 );
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

}
        `;
    }
}
exports.default = ShadersVertex;
