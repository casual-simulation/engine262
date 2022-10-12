import { Completion } from "./completion";
import { EnvironmentRecord } from "./environment";
import { ECMAScriptNode } from './parse';
import { Value } from './value';

export function GlobalDeclarationInstantiation(script: ECMAScriptNode, env: EnvironmentRecord): Completion<Value>;

export function InstanceofOperator(V: Value, target: Value): Completion<Value>;