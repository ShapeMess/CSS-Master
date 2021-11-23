
// This module works as a medium for holding information and managing 
// state between modules without need for each of them to expose methods 
// for getting and updating data between each other.

export interface PublicWritableClass {
    new (name: string, value?: any): this
    key: string,
    onUpdate: Function[]
    subscribe(callback: {(changes: any): void}): void
    unsubscribe(callback: Function): void
    set(value: any): void
}

export interface PublicDataObject {
    [key: string] : {
        value: any,
        $: PublicWritableClass
    }
}

let _data_: PublicDataObject = {};
globalThis._data_ = _data_;

export default class WritableClass {

    key: string;
    value: any;
    onUpdate: Function[];

    constructor(key: string, value?: any) {
        this.key = key;
        this.value = value;
        this.onUpdate = [];

        if (_data_[key]) return _data_[key].$ as any;
        else _data_[key] = {
            $: this as any,
            value: this.value
        }
    }
    subscribe(callback: {(changes: any): void}) {
        if (typeof callback !== 'function') throw new TypeError('<Writable.subscribe> Provided handler is not a function.');
        this.onUpdate.push(callback);
    }
    unsubscribe(callback: Function) {
        let i = this.onUpdate.indexOf(callback);
        if (i > -1) this.onUpdate.splice(i, 1);
    }
    set(value: any) {
        if (value !== this.value) {
            this.value = value;
            _data_[this.key].value = value;
            for (let i = 0; i < this.onUpdate.length; i++) this.onUpdate[i](value);
        }
    }
}

