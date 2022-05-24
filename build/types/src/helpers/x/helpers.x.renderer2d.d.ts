export default class _default {
    constructor(containerId?: string, orientation?: string);
    _container: HTMLElement;
    _renderer: WebGLRenderer;
    _camera: any;
    _controls: any;
    _orientation: string;
    _scene: Scene;
    _object: any;
    _onScroll(event: any): boolean;
    _onWindowResize(): void;
    add(object: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    animate(): void;
    _initRenderer(containerId: any): void;
    _initCamera(): void;
    _initScene(): void;
    _initControls(): void;
    _setupCamera(stack: any): void;
    _orientCamera(target: any, orientation?: string): void;
}
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { Scene } from "three/src/scenes/Scene";
