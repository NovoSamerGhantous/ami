/**
 * @module widgets/handle
 */
export class widgetsHandle extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _plane: {
        position: Vector3;
        direction: Vector3;
    };
    _offset: Vector3;
    _raycaster: Raycaster;
    _tracking: boolean;
    _mouse: Vector2;
    _initialized: boolean;
    _material: MeshBasicMaterial;
    _geometry: SphereGeometry;
    _mesh: Mesh<SphereGeometry, MeshBasicMaterial>;
    _meshHovered: boolean;
    _dom: HTMLDivElement;
    _domHovered: boolean;
    _screenPosition: Vector3;
    onResize(): void;
    /**
     * @param {Object} evt - Browser event
     * @param {Boolean} forced - true to move inactive handles
     */
    onMove(evt: Object, forced: boolean): void;
    onHover(evt: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    hoverMesh(): void;
    hoverDom(evt: any): void;
    onStart(evt: any): void;
    onEnd(): void;
    create(): void;
    createMesh(): void;
    createDOM(): void;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    updateDOMPosition(): void;
    updateDOMColor(): void;
    set screenPosition(arg: Vector3);
    get screenPosition(): Vector3;
    set tracking(arg: boolean);
    get tracking(): boolean;
}
import { widgetsBase } from "./widgets.base";
import { Vector3 } from "three/src/math/Vector3";
import { Raycaster } from "three/src/core/Raycaster";
import { Vector2 } from "three/src/math/Vector2";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { Mesh } from "three/src/objects/Mesh";
