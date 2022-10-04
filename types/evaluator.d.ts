import { Completion } from "./completion";
import { ECMAScriptNode }  from './parse';
import { Value } from './value';

export function Evaluate(node: ECMAScriptNode): Generator<any, Completion<Value>, any>;