import { ValueMap } from "./helpers";
import { BooleanValue, ObjectValue, Value, JSStringValue } from "./value";

export class EnvironmentRecord {
    OuterEnv: EnvironmentRecord;
}

export class DeclarativeEnvironmentRecord extends EnvironmentRecord {
    bindings: ValueMap;
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
    
}