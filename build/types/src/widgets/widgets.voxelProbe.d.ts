/**
 * @module widgets/voxelProbe
 */
export class widgetsVoxelprobe extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _stack: any;
    _initialized: boolean;
    _moving: boolean;
    _domHovered: boolean;
    _label: HTMLDivElement;
    _handle: any;
    _moveHandle: any;
    onMove(evt: any): void;
    onHover(evt: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    onStart(evt: any): void;
    onEnd(): void;
    hoverDom(evt: any): void;
    create(): void;
    createVoxel(): void;
    _voxel: ModelsVoxel;
    createDOM(): void;
    updateVoxel(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
}
import { widgetsBase } from "./widgets.base";
import ModelsVoxel from "../models/models.voxel";
