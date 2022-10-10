import { Completion } from "./completion";
import { ECMAScriptNode }  from './parse';
import { Value } from './value';

export type EvaluationYield = BeforeEvaluationYield | AfterEvaluationYield;

export interface BeforeEvaluationYield {
    evaluationState: 'before';
    node: ECMAScriptNode;
}

export interface AfterEvaluationYield {
    evaluationState: 'after';
    node: ECMAScriptNode;
    result: Value;
}

export function Evaluate(node: ECMAScriptNode): Generator<EvaluationYield, Completion<Value>, any>;