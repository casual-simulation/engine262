import { Completion } from './completion';
import { ValueMap } from './helpers';

export class Value {
    static undefined: UndefinedValue;
    static null: NullValue;
    static true: BooleanValue;
    static false: BooleanValue;
    constructor(value?: string | number | bigint | Function | boolean | undefined | null);
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
export class SymbolValue extends PrimitiveValue {
    Description: string;
}

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

    GetPrototypeOf(): Value | Completion<any>;
    SetPrototypeOf(V: Value): Value | Completion<any>;
    IsExtensible(): Value | Completion<any>;
    PreventExtensions(): Value | Completion<any>;
    GetOwnProperty(P: Value): Value | Completion<any>;
    DefineOwnProperty(P: Value, Desc: Value): Value | Completion<any>;
    HasProperty(P: Value): Value | Completion<any>;
    Get(P: Value, Receiver: Value): (Value | Completion<any>) | Generator<any, (Value | Completion<any>), any>;
    Set(P: Value, V: Value, Receiver: Value): (Value | Completion<any>) | Generator<any, (Value | Completion<any>), any>;
    Delete(P: Value): Value | Completion<any>;
    OwnPropertyKeys(): Value[] | Completion<any>;
}

export class ReferenceRecord {}

export class Descriptor {
    constructor(init: Partial<Pick<Descriptor, 'Value' | 'Get' | 'Set' | 'Writable' | 'Enumerable' | 'Configurable'>>);

    Value: Value;
    Get: Value;
    Set: Value;
    Writable: Value;
    Enumerable: Value;
    Configurable: Value;
}

export function Type(value: Value): 'Undefined' | 'Null' | 'Boolean' | 'String' | 'Number' | 'BigInt' | 'Symbol' | 'Object' | 'PrivateName' | 'Completion' | 'EnvironmentRecord' | 'Descriptor' | 'Data Block';