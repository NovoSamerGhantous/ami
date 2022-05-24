/**
 * @module widgets/annotation
 * @todo: add option to show only label (without mesh, dots and lines)
 */
export class widgetsAnnotation extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _initialized: boolean;
    _movinglabel: boolean;
    _labelmoved: boolean;
    _labelhovered: boolean;
    _manuallabeldisplay: boolean;
    _material: LineBasicMaterial;
    _geometry: BufferGeometry;
    _meshline: Line<BufferGeometry, LineBasicMaterial>;
    _cone: Mesh<CylinderGeometry, LineBasicMaterial>;
    _line: HTMLDivElement;
    _dashline: HTMLDivElement;
    _label: HTMLDivElement;
    _labeltext: string;
    _labelOffset: Vector3;
    _mouseLabelOffset: Vector3;
    onResize(): void;
    onMove(evt: any): void;
    onHoverlabel(): void;
    notonHoverlabel(): void;
    changelabeltext(): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    onStart(evt: any): void;
    onEnd(): void;
    setlabeltext(): void;
    displaylabel(): void;
    create(): void;
    createMesh(): void;
    _conegeometry: CylinderGeometry;
    createDOM(): void;
    updateMeshColor(): void;
    updateMeshPosition(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
}
import { widgetsBase } from "./widgets.base";
import { LineBasicMaterial } from "three/src/materials/LineBasicMaterial";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { Line } from "three/src/objects/Line";
import { CylinderGeometry } from "three/src/geometries/CylinderGeometry";
import { Mesh } from "three/src/objects/Mesh";
import { Vector3 } from "three/src/math/Vector3";
