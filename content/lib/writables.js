// This module works as a medium for holding information and managing 
// state between modules without need for each of them to expose methods 
// for getting and updating data between each other.
let _data_ = {};
globalThis._data_ = _data_;
export default class WritableClass {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.onUpdate = [];
        if (_data_[key])
            return _data_[key].$;
        else
            _data_[key] = {
                $: this,
                value: this.value
            };
    }
    subscribe(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('<Writable.subscribe> Provided handler is not a function.');
        this.onUpdate.push(callback);
    }
    unsubscribe(callback) {
        let i = this.onUpdate.indexOf(callback);
        if (i > -1)
            this.onUpdate.splice(i, 1);
    }
    set(value) {
        if (value !== this.value) {
            this.value = value;
            _data_[this.key].value = value;
            for (let i = 0; i < this.onUpdate.length; i++)
                this.onUpdate[i](value);
        }
    }
}
