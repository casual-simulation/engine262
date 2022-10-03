import { Completion } from "./completion";
import { EnvironmentRecord } from "./environment";
import { ECMAScriptNode } from './parse';

export function GlobalDeclarationInstantiation(script: ECMAScriptNode, env: EnvironmentRecord): Completion;