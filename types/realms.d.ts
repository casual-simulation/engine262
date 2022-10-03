import { GlobalEnvironmentRecord } from "./environment";
import { Value } from "./value";

export class Realm {
    GlobalObject: Value;
    GlobalEnv: GlobalEnvironmentRecord;
}

export function CreateRealm(): Realm;
export function SetRealmGlobalObject(realm: Realm, globalObj: Value, thisValue: Value): Realm;
export function SetDefaultGlobalBindings(realm: Realm): Value;