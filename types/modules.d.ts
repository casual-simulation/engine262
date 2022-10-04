import { Completion } from "./completion";
import { EnvironmentRecord } from "./environment";
import { Realm } from "./realms";
import { BooleanValue, JSStringValue, NullValue, Value } from "./value";
import { ECMAScriptNode } from './parse';

export class AbstractModuleRecord {
    Realm: Realm;
    Environment: EnvironmentRecord;
    Namespace: any;
    HostDefined: any;
}

export class CyclicModuleRecord extends AbstractModuleRecord {
    Async: BooleanValue;
    AsyncEvaluating: BooleanValue;
    Status: 'unlinked' | 'linked' | 'evaluated';
    RequestedModules: JSStringValue[];

    Evaluate(): Generator<any, any, any>;
    EvaluateAndUnwind(): any;
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