import { Completion } from "./completion";
import { ECMAScriptNode }  from './parse';
import { Value } from './value';

export const EVAL_YIELD: unique symbol;

export type EvaluationYield = BeforeEvaluationYield | AfterEvaluationYield;

export interface BeforeEvaluationYield {
    [EVAL_YIELD]: true,
    evaluationState: 'before';
    node: ECMAScriptNode;
}

export interface AfterEvaluationYield {
    [EVAL_YIELD]: true,
    evaluationState: 'after';
    node: ECMAScriptNode;
    result: Value | Completion<Value>;
}

export function Evaluate(node: ECMAScriptNode): Generator<EvaluationYield, Completion<Value>, any>;