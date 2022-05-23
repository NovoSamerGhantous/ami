/**
 * Event Based progressbar
 * @module helpers/progressBar
 *
 * @example
 *
 * let loader = new LoadersVolume();
 * const domContainer = document.getElementById('progressbar');
 * const pb = new HelpersProgressBarEventBased(loader, domContainer);
 */
export default class HelpersProgressBarEventBased {
    constructor(emitter: any, domTarget: any);
    _dom: any;
    _emitter: any;
    loaded: number;
    totalFile: number;
    _isFunction(fn: any): boolean;
    initEventListenner(): void;
    initContainerDom(): void;
    _domCurrentFile: HTMLElement;
    _domTotalFile: HTMLElement;
    _domProcessList: HTMLElement;
    _domCurrentProgress: HTMLElement;
}
//# sourceMappingURL=helpers.progressbar.eventbased.d.ts.map