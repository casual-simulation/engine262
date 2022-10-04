import { Completion } from "./completion";
import { ModuleEnvironmentRecord } from "./environment";
import { Realm } from "./realms";
import { BooleanValue, JSStringValue, NullValue, ObjectValue, Value } from "./value";
import { ECMAScriptNode } from './parse';

export class AbstractModuleRecord {
    Realm: Realm;
    Environment: ModuleEnvironmentRecord;
    Namespace: any;
    HostDefined: any;
}

export class CyclicModuleRecord extends AbstractModuleRecord {
    Async: BooleanValue;
    AsyncEvaluating: BooleanValue;
    Status: 'unlinked' | 'linked' | 'evaluating-async' | 'evaluated';
    RequestedModules: JSStringValue[];

    Evaluate(): Generator<any, ObjectValue, any>;
    EvaluateAndUnwind(): ObjectValue;
    Link(): Value | Completion<any>;
}

export class SourceTextModuleRecord extends CyclicModuleRecord {
    ECMAScriptCode: ECMAScriptNode;
    ImportEntries: ImportEntry[];
    LocalExportEntries: ImportEntry[];
    IndirectExportEntries: ExportEntry[];
    StarExportEntries: ExportEntry[];

    InitializeEnvironment(): void;

    ExecuteModule(): Generator<any, any, any>;
}

export class SyntheticModuleRecord extends AbstractModuleRecord {
    Evaluate(): Generator<any, any, any>;
}

export interface ModuleEntry {
    ImportName: 'all-but-default' | 'namespace-object' | JSStringValue;
    LocalName: JSStringValue | NullValue;
    ModuleRequest: JSStringValue | NullValue;
}

export interface ImportEntry extends ModuleEntry {}

export interface ExportEntry extends ModuleEntry {
    ExportName: JSStringValue | NullValue;
}