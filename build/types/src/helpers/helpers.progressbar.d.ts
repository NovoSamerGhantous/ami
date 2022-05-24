/**
 * @module helpers/progressBar
 */
export default class HelpersProgressBar {
    constructor(container: any);
    _container: any;
    _modes: {
        load: {
            name: string;
            color: string;
        };
        parse: {
            name: string;
            color: string;
        };
    };
    requestAnimationFrameID: number;
    _mode: any;
    _value: any;
    _total: any;
    _totalFiles: any;
    free(): void;
    init(): void;
    update(value: any, total: any, mode: any, url?: string): void;
    updateUI(): boolean;
    _domContainer(): HTMLDivElement;
    _domBar(mode: any): false | HTMLDivElement;
    set totalFiles(arg: any);
    get totalFiles(): any;
}
