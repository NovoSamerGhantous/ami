/**
 * @module widgets/peakVelocity (Gradient)
 */
export class widgetsPeakVelocity extends widgetsBase {
    constructor(targetMesh: any, controls: any, params?: {});
    _regions: any;
    _velocity: number;
    _gradient: number;
    _initialized: boolean;
    _domHovered: boolean;
    _initialRegion: number;
    _line: HTMLDivElement;
    _label: HTMLDivElement;
    _handle: any;
    _moveHandle: any;
    onMove(evt: any): void;
    onHover(evt: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    hoverDom(evt: any): void;
    onStart(evt: any): void;
    onEnd(): void;
    isCorrectRegion(shift: any): boolean;
    create(): void;
    createDOM(): void;
    updateDOM(): void;
    updateDOMColor(): void;
    getMeasurements(): {
        velocity: number;
        gradient: number;
    };
    set targetMesh(arg: any);
    get targetMesh(): any;
    _targetMesh: any;
}
import { widgetsBase } from "./widgets.base";
