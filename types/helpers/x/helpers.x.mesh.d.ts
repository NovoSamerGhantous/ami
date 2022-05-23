/**
 * @module helpers/x/mesh
 */
export default class _default {
    _file: any;
    _3jsVTK_loader: any;
    _mesh: Mesh<any, MeshLambertMaterial>;
    _materialColor: number;
    _RAStoLPS: Matrix4;
    _material: MeshLambertMaterial;
    set file(arg: any);
    get file(): any;
    set materialColor(arg: number);
    get materialColor(): number;
    load(): Promise<any>;
}
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three/src/objects/Mesh";
import { Matrix4 } from "three/src/math/Matrix4";
//# sourceMappingURL=helpers.x.mesh.d.ts.map