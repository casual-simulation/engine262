import { Completion } from "./completion";
import { ValueMap } from "./helpers";
import { BooleanValue, ObjectValue, Value, JSStringValue } from "./value";

export class EnvironmentRecord {
    OuterEnv: EnvironmentRecord;
}

export class DeclarativeEnvironmentRecord extends EnvironmentRecord {
    bindings: ValueMap;

    SetMutableBinding(N: Value, V: Value, S: BooleanValue): Completion<any>;
    GetBindingValue(N: Value, S?: BooleanValue): Value;
    HasBinding(N: Value): BooleanValue;
    DeleteBinding(N: Value): BooleanValue;
    HasThisBinding(): BooleanValue;
    HasSuperBinding(): BooleanValue;
    WithBaseObject(): ObjectValue;
}

export class ObjectEnvironmentRecord extends EnvironmentRecord {
    BindingObject: ObjectValue;
    IsWithEnvironment: BooleanValue;
}

export class FunctionEnvironmentRecord extends DeclarativeEnvironmentRecord {
    ThisValue: Value;
    ThisBindingStatus: 'lexical' | 'initialized' | 'uninitialized';
    FunctionObject: Value;
    NewTarget: Value;
}

export class GlobalEnvironmentRecord extends EnvironmentRecord {
    ObjectRecord: ObjectEnvironmentRecord;
    GlobalThisValue: Value;
    DeclarativeRecord: DeclarativeEnvironmentRecord;
    VarNames: JSStringValue[];
}

export class ModuleEnvironmentRecord extends DeclarativeEnvironmentRecord {
    GetBindingValue(N: Value, S: BooleanValue): Value;
}