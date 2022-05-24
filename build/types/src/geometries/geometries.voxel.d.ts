/**
 *
 * @module geometries/voxel
 */
export class geometriesVoxel extends BoxGeometry {
    constructor(dataPosition: any);
    _location: any;
    verticesNeedUpdate: boolean;
    resetVertices(): void;
    set location(arg: any);
    get location(): any;
}
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
