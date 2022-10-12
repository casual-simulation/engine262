import { ObjectValue, Value } from "./value";
import { EnvironmentRecord } from './environment';
import { Realm } from "./realms";
import { ScriptRecord } from "./parse";
import { AbstractModuleRecord } from "./modules";
import { Completion } from "./completion";
import { EvaluationYield } from './evaluator';

export type ExecutionContextStack = Array<ExecutionContext>;

export interface AgentOptions {
    onDebugger?(): void;
    yieldEachNode?: boolean;

    [key: string]: any;
}

export interface AgentJob {
    queueName: string;
    job: () => Value | Completion<Value> | Generator<EvaluationYield, Value | Completion<Value>, any>;
    callerRealm: Realm;
    callerScriptOrModule: ScriptRecord | AbstractModuleRecord;
}

export class Agent {
    executionContextStack: ExecutionContextStack;
    hostDefinedOptions: AgentOptions;
    jobQueue: AgentJob[];
    constructor(options: AgentOptions);

    get runningExecutionContext(): ExecutionContext;
    get currentRealmRecord(): Realm;
    get activeFunctionObject(): ObjectValue;

    /**
     * Gets the intrinsic with the given name from the current realm record.
     * @param name The name of the instrinsic.
     */
    intrinsic(name: string): Value;

    /**
     * Enqueues the given job to the given queue.
     * @param queueName The queue that the job should be enqueued to.
     * @param job The job that should be enqueued.
     */
    queueJob(queueName: string, job: AgentJob['job']): void;
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

