import { Completion } from "./completion";
import { ECMAScriptNode }  from './parse';

export function Evaluate(node: ECMAScriptNode): Generator<any, Completion, any>;