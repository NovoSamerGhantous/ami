export default class JpxImage {
    failOnCorruptedImage: boolean;
    parse(data: any): void;
    parseImageProperties(stream: any): void;
    width: number;
    height: number;
    componentsCount: any;
    bitsPerComponent: number;
    parseCodestream(data: any, start: any, end: any): void;
    tiles: {
        left: any;
        top: any;
        width: any;
        height: any;
        items: Int16Array;
    }[];
}
/**
 * Promise Capability object.
 */
export type PromiseCapability = {
    /**
     * - A promise object.
     */
    promise: Promise<any>;
    /**
     * - Fullfills the promise.
     */
    resolve: Function;
    /**
     * - Rejects the promise.
     */
    reject: Function;
};
