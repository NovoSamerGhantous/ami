export default class _default {
    constructor(containerId?: string);
    _container: any;
    _renderer: WebGLRenderer;
    _camera: PerspectiveCamera;
    _controls: any;
    _scene: Scene;
    _onWindowResize(): void;
    set container(arg: any);
    get container(): any;
    add(obj: any): void;
    addEventListeners(): void;
    removeEventListeners(): void;
    center(worldPosition: any): void;
    render(): void;
    animate(): void;
    _initRenderer(containerId: any): void;
    _initCamera(): void;
    _initScene(): void;
    _initControls(): void;
}
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";
