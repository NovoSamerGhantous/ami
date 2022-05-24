export default class ShadersBase {
    _name: string;
    _base: {
        _functions: {};
        _uniforms: {};
    };
    _definition: string;
    set name(arg: string);
    get name(): string;
}
