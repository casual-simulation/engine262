import { ValueMap } from './helpers';

export class Value {
    static undefined: UndefinedValue;
    static null: NullValue;
    static true: BooleanValue;
    static false: BooleanValue;
    constructor(value?: string | number | bigint | Function);
}

export class PrimitiveValue extends Value {}

export class UndefinedValue extends PrimitiveValue { }
export class NullValue extends PrimitiveValue { }
export class BooleanValue extends PrimitiveValue {
    boolean: boolean;
    booleanValue(): boolean;
    constructor(value: boolean);
}

export class JSStringValue extends PrimitiveValue {
    string: string;
    stringValue(): string;
    constructor(string: string);
}
export class SymbolValue extends PrimitiveValue {}

export class NumberValue extends PrimitiveValue {
    constructor(number: number);
    number: number;
    numberValue(): number;
    isNaN(): boolean;
    isInfinity(): boolean;
    isFinite(): boolean;
}

export class BigIntValue extends PrimitiveValue {
    constructor(bigint: BigInt);
    bigint: BigInt;
    bigintValue(): BigInt;

    isNaN(): false;
    isFinite(): true;

    static unit: BigIntValue;
}

export class PrivateName extends Value {
    constructor(description: string);
    Description: string;
}

export class ObjectValue extends Value {
    constructor(internalSlotsList: string[]);

    // PrivateElements: [];
    properties: ValueMap;
    internalSlotsList: string[];

    GetPrototypeOf(): Value;
    SetPrototypeOf(V: Value): Value;
    IsExtensible(): Value;
    PreventExtensions(): Value;
    GetOwnProperty(P: Value): Value;
    DefineOwnProperty(P: Value, Desc: Value): Value;
    HasProperty(P: Value): Value;
    Get(P: Value, Receiver: Value): Value;
    Set(P: Value, V: Value, Receiver: Value): Value;
    Delete(P: Value): Value;
    OwnPropertyKeys(): Value[];
}

export class ReferenceRecord {}

export class Descriptor {
    constructor(init: Pick<Descriptor, 'Value' | 'Get' | 'Set' | 'Writable' | 'Enumerable' | 'Configurable'>);

    Value: Value;
    Get: Value;
    Set: Value;
    Writable: Value;
    Enumerable: Value;
    Configurable: Value;
}

export function Type(value: Value): 'Undefined' | 'Null' | 'Boolean' | 'String' | 'Number' | 'BigInt' | 'Symbol' | 'Object' | 'PrivateName' | 'Completion' | 'EnvironmentRecord' | 'Descriptor' | 'Data Block';