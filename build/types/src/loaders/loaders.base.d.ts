/// <reference types="node" />
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
    /**
     * Create a Loader.
     * @param {dom} container - The dom container of loader.
     * @param {object} ProgressBar - The progressbar of loader.
     */
    constructor(container?: dom, ProgressBar?: object);
    _loaded: number;
    _totalLoaded: number;
    _parsed: number;
    _totalParsed: number;
    _data: any[];
    _container: dom;
    _progressBar: any;
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
    fetch(url: string, requests: Map<any, any>): promise;
    /**
     * parse the data loaded
     * SHOULD BE implementd by detail loader.
     * @param {object} response - loaded data.
     * @return {promise} promise.
     */
    parse(response: object): promise;
    /**
     * default load sequence group promise.
     * @param {array} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise.
     */
    loadSequenceGroup(url: array, requests: Map<any, any>): promise;
    /**
     * default load sequence promise.
     * @param {string} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise.
     */
    loadSequence(url: string, requests: Map<any, any>): promise;
    /**
     * load the data by url(urls)
     * @param {string|array} url - resource url.
     * @param {Map} requests - used for cancellation.
     * @return {promise} promise
     */
    load(url: string | array, requests: Map<any, any>): promise;
    /**
     * Set data
     * @param {array} data
     */
    set data(arg: array);
    /**
     * Get data
     * @return {array} data loaded
     */
    get data(): array;
}
import EventEmitter from "events";
