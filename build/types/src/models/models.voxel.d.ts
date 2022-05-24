/**
 * @module models/voxel
 */
export default class ModelsVoxel {
    _id: number;
    _worldCoordinates: any;
    _dataCoordinates: any;
    _screenCoordinates: any;
    _value: any;
    set worldCoordinates(arg: any);
    get worldCoordinates(): any;
    set dataCoordinates(arg: any);
    get dataCoordinates(): any;
    set screenCoordinates(arg: any);
    get screenCoordinates(): any;
    set value(arg: any);
    get value(): any;
    set id(arg: number);
    get id(): number;
}
