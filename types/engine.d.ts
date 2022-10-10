import { Value } from "./value";
import { EnvironmentRecord } from './environment';
import { Realm } from "./realms";
import { ScriptRecord } from "./parse";
import { AbstractModuleRecord } from "./modules";
import { Completion } from "./completion";

export type ExecutionContextStack = Array<ExecutionContext>;

export interface AgentOptions {
    onDebugger?(): void;
    yieldEachNode?: boolean;

    [key: string]: any;
}

export class Agent {
    currentRealmRecord: Realm;
    executionContextStack: ExecutionContextStack;
    hostDefinedOptions: AgentOptions;
    constructor(options: AgentOptions);
}

export class ExecutionContext {

    codeEvalulationState: any;
    Function: Value;
    Realm: Realm;

    ScriptOrModule: ScriptRecord | AbstractModuleRecord;

    VariableEnvironment: EnvironmentRecord;
    LexicalEnvironment: EnvironmentRecord;
    PrivateEnvironment: EnvironmentRecord;
}

export function ScriptEvaluation(scriptRecord: ScriptRecord): Generator<any, Completion<Value>, any>;
// export function HostEnqueuePromiseJob(job)

