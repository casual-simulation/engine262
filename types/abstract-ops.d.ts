import { Completion } from "./completion";
import { Realm } from "./realms";
import { BooleanValue, ObjectValue, Value, JSStringValue, SymbolValue, NumberValue } from "./value";


// Object Operations
export function MakeBasicObject(internalSlotsList: string[]): ObjectValue;
export function Get(O: Value, P: Value): Generator<unknown, Completion<Value>, unknown>;
export function GetV(V: Value, P: Value): Generator<unknown, Value | Completion<any>, unknown>;
export function Set(O: Value, P: Value, V: Value, Throw: BooleanValue): Generator<unknown, Completion<Value>, unknown>;
export function CreateDataProperty(O: Value, P: Value, V: Value): Completion<Value>;

export function DefinePropertyOrThrow(O: Value, P: Value, desc: any): BooleanValue | Completion<any>;
export function DeletePropertyOrThrow(O: Value, P: Value): BooleanValue | Completion<any>;
export function GetMethod(V: Value, P: Value): ObjectValue | Completion<any>;
export function HasProperty(O: Value, P: Value): BooleanValue | Completion<any>;
export function HasOwnProperty(O: Value, P: Value): BooleanValue | Completion<any>;

export function CreateArrayFromList(elements: Value[]): ObjectValue;
export function LengthOfArrayLike(obj: ObjectValue): number;
export function CreateListFromArrayLike(obj: ObjectValue): ObjectValue;

export function Call(F: ObjectValue, V: Value, argumentsList: Value[]): Generator<unknown,Completion<Value>, unknown>;
export function Construct(F: ObjectValue, argumentsList: Value[], newTarget?: ObjectValue): Generator<unknown, Completion<Value>, unknown>;
export function Invoke(V: ObjectValue, P: Value, argumentsList: Value[]): Generator<unknown, Completion<Value>, unknown>;

// Function Operations
export function CreateBuiltinFunction(steps: Function, length: number, name: JSStringValue | SymbolValue, realm: Realm, prototype?: ObjectValue, prefix?: JSStringValue, isConstructor?: BooleanValue): ObjectValue;
export function isECMAScriptFunctionObject(O: unknown): boolean;
export function isFunctionObject(O: unknown): boolean;