/// <reference types="node" />
/** Imports **/
import HelpersProgressBar from '../helpers/helpers.progressbar';
import { EventEmitter } from 'events';
/**
 *
 * It is typically used to load a DICOM image. Use loading manager for
 * advanced usage, such as multiple files handling.
 *
 * Demo: {@link https://fnndsc.github.io/vjs#loader_dicom}
 *
 * @module loaders/base
 * @extends EventEmitter
 * @example
 * var files = ['/data/dcm/fruit'];
 *
 * // Instantiate a dicom loader
 * var lDicomoader = new dicom();
 *
 * // load a resource
 * loader.load(
 *   // resource URL
 *   files[0],
 *   // Function when resource is loaded
 *   function(object) {
 *     //scene.add( object );
 *     console.log(object);
 *   }
 * );
 */
export default class LoadersBase extends EventEmitter {
    _loaded: number;
    _totalLoaded: number;
    _parsed: number;
    _totalParsed: number;
    _data: any[];
    _container: any;
    _progressBar: any;
    /**
     * Create a Loader.
     * @param {dom} container - The dom container of loader.
     * @param {object} ProgressBar - The progressbar of loader.
     */
    constructor(container?: any, ProgressBar?: typeof HelpersProgressBar);
    /**
     * free the reference.
     */
    free(): void;
    /**
     * load the resource by url.
     * @param {string} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise.
     */
    fetch(url: any, requests: any): Promise<unknown>;
    /**
     * parse the data loaded
     * SHOULD BE implementd by detail loader.
     * @param {object} response - loaded data.
     * @return {promise} promise.
     */
    parse(response: any): Promise<unknown>;
    /**
     * default load sequence group promise.
     * @param {array} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise.
     */
    loadSequenceGroup(url: any, requests: any): Promise<unknown>;
    /**
     * default load sequence promise.
     * @param {string} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise.
     */
    loadSequence(url: any, requests: any): Promise<unknown>;
    /**
     * load the data by url(urls)
     * @param {string|array} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise
     */
    load(url: any, requests: any): Promise<any[]>;
    /**
     * Set data
     * @param {array} data
     */
    set data(data: any[]);
    /**
     * Get data
     * @return {array} data loaded
     */
    get data(): any[];
}
//# sourceMappingURL=loaders.base.d.ts.map