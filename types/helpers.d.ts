import { Value } from "./value";

export class ValueMap {
    map: Map<string | number | Value, any>;

    get size(): number;

    get(key: Value): any;
    set(key: Value, value: any): ValueMap;
    has(key: Value): boolean;
    delete(key: Value): boolean;

    keys(): Iterator<string>;
    entries(): Iterator<[Value, any][]>;
}