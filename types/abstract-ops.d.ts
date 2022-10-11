import { Completion } from "./completion";
import { Realm } from "./realms";
import { BooleanValue, ObjectValue, Value, JSStringValue, SymbolValue, NumberValue } from "./value";
import { EvaluationYield } from './evaluator';


export function OrdinaryObjectCreate(proto: Value, additionalInternaSlotsList?: string[]): ObjectValue;
export function OrdinaryCreateFromConstructor(constructor: Value, intrinsicDefaultProto: string, internalSlotsList: string[]): ObjectValue;
export function GetPrototypeFromConstructor(constructor: Value, intrinsicDefaultProto: string): Value;

// Object Operations
export function MakeBasicObject(internalSlotsList: string[]): ObjectValue;
export function Get(O: Value, P: Value): Generator<EvaluationYield, Completion<Value>, unknown>;
export function GetV(V: Value, P: Value): Generator<EvaluationYield, Value | Completion<any>, unknown>;
export function Set(O: Value, P: Value, V: Value, Throw: BooleanValue): Generator<EvaluationYield, Completion<Value>, unknown>;
export function CreateDataProperty(O: Value, P: Value, V: Value): Completion<Value>;

export function DefinePropertyOrThrow(O: Value, P: Value, desc: any): BooleanValue | Completion<any>;
export function DeletePropertyOrThrow(O: Value, P: Value): BooleanValue | Completion<any>;
export function GetMethod(V: Value, P: Value): ObjectValue | Completion<any>;
export function HasProperty(O: Value, P: Value): BooleanValue | Completion<any>;
export function HasOwnProperty(O: Value, P: Value): BooleanValue | Completion<any>;

export function CreateArrayFromList(elements: Value[]): ObjectValue;
export function LengthOfArrayLike(obj: ObjectValue): number;
export function CreateListFromArrayLike(obj: ObjectValue): ObjectValue;

export function Call(F: ObjectValue, V: Value, argumentsList: Value[]): Generator<EvaluationYield, Completion<Value>, unknown>;
export function Construct(F: ObjectValue, argumentsList: Value[], newTarget?: ObjectValue): Generator<EvaluationYield, Value | Completion<Value>, unknown>;
export function Invoke(V: ObjectValue, P: Value, argumentsList: Value[]): Generator<EvaluationYield, Value | Completion<Value>, unknown>;

// Function Operations
export function CreateBuiltinFunction(steps: Function, length: number, name: Value, internalSlotsList: string[], realm?: Realm, prototype?: Value, prefix?: Value, isConstructor?: Value): ObjectValue;
export function isECMAScriptFunctionObject(O: unknown): boolean;
export function isFunctionObject(O: unknown): boolean;

// Testing Comparision
export function IsArray(argument: Value): BooleanValue;
export function IsCallable(argument: Value): BooleanValue;
export function IsConstructor(argument: Value): BooleanValue;
export function IsExtensible(O: Value): BooleanValue;
export function IsIntegralNumber(argument: Value): BooleanValue;
export function IsPropertyKey(argument: Value): boolean;
export function IsRegExp(argument: Value): BooleanValue;
export function IsStringPrefix(p: Value, q: Value): BooleanValue;
export function SameValue(x: Value, y: Value): BooleanValue;
export function SameValueZero(x: Value, y: Value): BooleanValue;
export function SameValueNonNumber(x: Value, y: Value): BooleanValue;
export function StrictEqualityComparison(x: Value, y: Value): BooleanValue;
export function IsValidIntegerIndex(O: Value, index: Value): BooleanValue;