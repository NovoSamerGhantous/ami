/**
 *
 * It is typically used to load a DICOM image. Use loading manager for
 * advanced usage, such as multiple files handling.
 *
 * Demo: {@link https://fnndsc.github.io/vjs#loader_dicom}
 *
 * @module loaders/volumes
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
export default class LoadersVolumes extends LoadersBase {
    parseFrameClosure(series: any, stack: any, url: any, i: any, dataParser: any, resolve: any, reject: any): () => void;
    /**
     * recursive parse frame
     * @param {ModelsSeries} series - data series
     * @param {ModelsStack} stack - data stack
     * @param {string} url - resource url
     * @param {number} i - frame index
     * @param {parser} dataParser - selected parser
     * @param {promise.resolve} resolve - promise resolve args
     * @param {promise.reject} reject - promise reject args
     */
    parseFrame(series: ModelsSeries, stack: ModelsStack, url: string, i: number, dataParser: parser, resolve: promise.resolve, reject: promise.reject): void;
    /**
     * Return parser given an extension
     * @param {string} extension - extension
     * @return {parser} selected parser
     */
    _parser(extension: string): parser;
    /**
     * Pre-process data to be parsed (find data type and de-compress)
     * @param {*} data
     */
    _preprocess(data: any): void;
    /**
     * Filter data by extension
     * @param {*} extension
     * @param {*} item
     * @returns Boolean
     */
    _filterByExtension(extension: any, item: any): boolean;
}
import LoadersBase from "./loaders.base";
import ModelsSeries from "../models/models.series";
import ModelsStack from "../models/models.stack";
