import { Completion } from "./completion";
import { Realm } from "./realms";
import { BooleanValue, ObjectValue, Value, JSStringValue, SymbolValue, NumberValue } from "./value";


// Object Operations
export function MakeBasicObject(internalSlotsList: string[]): ObjectValue;
export function Get(O: Value, P: Value): Generator<unknown, Completion<Value>, unknown>;
export function Set(O: Value, P: Value, V: Value, Throw: BooleanValue): Generator<unknown, Completion<Value>, unknown>;
export function CreateDataProperty(O: Value, P: Value, V: Value): Completion<Value>;


// Function Operations
export function CreateBuiltinFunction(steps: Function, length: number, name: JSStringValue | SymbolValue, realm: Realm, prototype?: ObjectValue, prefix?: JSStringValue, isConstructor?: BooleanValue): ObjectValue;