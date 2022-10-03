import { AbstractModuleRecord, SourceTextModuleRecord } from "./modules";
import { Realm } from "./realms";

export interface ECMAScriptNode {

}

export interface ScriptRecord {
    Realm: Realm;
    ECMAScriptCode: ECMAScriptNode;
    HostDefined: any;
}

export interface ModuleParseHostDefined {
    SourceTextModuleRecord?: {
        new(): SourceTextModuleRecord
    };
    [key: string]: any;
}

export function ParseScript(sourceText: string, realm: Realm, hostDefined?: any): ScriptRecord | [any];
export function ParseModule(sourceText: string, realm: Realm, hostDefined?: ModuleParseHostDefined): AbstractModuleRecord | [any];