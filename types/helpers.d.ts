import { Value } from "./value";

export class ValueMap {
    map: Map<string | number | Value, any>;

    get size(): number;

    get(key: Value): any;
    set(key: Value, value: any): ValueMap;
    has(key: Value): boolean;
    delete(key: Value): boolean;

    keys(): IterableIterator<string>;
    entries(): IterableIterator<[Value, any]>;

    [Symbol.iterator](): IterableIterator<[Value, any]>;
}