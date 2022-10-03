import { EnvironmentRecord } from "./environment";
import { Realm } from "./realms";

export class AbstractModuleRecord {
    Realm: Realm;
    Environment: EnvironmentRecord;
    Namespace: any;
    HostDefined: any;
}

export class CyclicModuleRecord extends AbstractModuleRecord {
    Evaluate(): Generator<any, any, any>;
    EvaluateAndUnwind(): any;
}

export class SourceTextModuleRecord extends CyclicModuleRecord {
    InitializeEnvironment(): void;

    ExecuteModule(): Generator<any, any, any>;
}

export class SyntheticModuleRecord extends AbstractModuleRecord {
    Evaluate(): Generator<any, any, any>;
}