import { Agent } from './engine';
import { Completion } from './completion';
import { AbstractModuleRecord, SourceTextModuleRecord } from './modules';
import { Realm } from './realms';
import { Value, ObjectValue } from './value';
import { Evaluate } from './evaluator';

export * from './value';
export * from './engine';
export * from './completion';
export * from './abstract-ops';
export * from './runtime-semantics';
export * from './realms';
export * from './environment';
export * from './parse';
export * from './modules';
export * from './inspect';
export { Evaluate };

export function setSurroundingAgent(agent: Agent): void;
export let surroundingAgent: Agent;

export function runJobQueue(): Generator<any, any, any>;

export function evaluateScript(sourceText: string, realm: Realm, hostDefined: any): Completion;

export interface ManagedRealmOptions {
    promiseRejectionTracker?(): void;
    resolveImportedModule?(): void;
    randomSeed?(): void;

    [key: string]: any;
}

export class ManagedRealm {
    GlobalObject: ObjectValue;

    constructor(options: ManagedRealmOptions);

    scope<T>(func: () => T): T;

    evaluateScript(script: string): Completion;

    createSourceTextModule(specifier: string, sourceText: string): ManagedSourceTextModuleRecord | [any];
}

export class ManagedSourceTextModuleRecord extends SourceTextModuleRecord {}