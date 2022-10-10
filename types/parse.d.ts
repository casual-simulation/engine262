import { AbstractModuleRecord, SourceTextModuleRecord } from "./modules";
import { Realm } from "./realms";

export type ECMAScriptNode = Node | Statement | Expression | Identifier;

export type Node = FunctionBodyNode;

export interface NodeBase {
    /**
     * The location that this node occurrs in in its embedding file.
     */
    location: {
        /**
         * The index that the node starts at.
         */
        startIndex: number;

        /**
         * The index that the node ends at.
         */
        endIndex: number;

        start: {
            /**
             * The line number that the node starts at.
             */
            line: number;
            /**
             * The column number that the node starts at.
             */
            column: number
        };
        end: {
            /**
             * The line number that the node ends at.
             */
            line: number;

            /**
             * The column that the node ends at.
             */
            column: number
        };
    };

    /**
     * Retrieves the source text for this node.
     */
    sourceText(): string;
}

export interface FunctionBodyNode extends NodeBase {
    type: 'FunctionBody';

    FunctionStatementList: Statement[];
}

export type Statement = ReturnStatement | IfStatement | Block | ExpressionStatement;

export interface StatementBase extends NodeBase {
}

export interface ReturnStatement extends StatementBase {
    type: 'ReturnStatement';
    expression: Expression;
}

export interface IfStatement extends StatementBase {
    type: 'IfStatement';
    Expression: Expression;

    Statement_a: Statement;
    Statement_b?:  Statement;
}

export interface Block extends StatementBase {
    type: 'Block';
    StatementList: Statement[];
}

export interface ExpressionStatement extends StatementBase {
    type: 'ExpressionStatement';
    Expression: Expression;
}

export type Expression = 
    | AdditiveExpression
    | MultiplicativeExpression
    | MemberExpression
    | ObjectLiteralExpression
    | BooleanLiteralExpression
    | NumericLiteralExpression
    | StringLiteralExpression
    | EqualityExpression
    | CallExpression
    | Identifier;

export interface ExpressionBase extends NodeBase {
}

export interface AdditiveExpression extends ExpressionBase {
    type: 'AdditiveExpression';
    operator: '+' | '-';
    AdditiveExpression: Expression;
    MultiplicativeExpression: Expression;
}

export interface MultiplicativeExpression extends ExpressionBase {
    type: 'MultiplicativeExpression';
    MultiplicativeOperator: '*' | '/' | '%';
    ExponentiationExpression: Expression;
    MultiplicativeExpression: Expression;
}

export interface MemberExpression extends ExpressionBase {
    type: 'MemberExpression';
    Expression: Expression | null;
    IdentifierName: Identifier;
    MemberExpression: Identifier;
}

export interface ObjectLiteralExpression extends ExpressionBase {
    type: 'ObjectLiteral';
    PropertyDefinitionList: PropertyDefinition[];
}

export interface PropertyDefinition extends NodeBase {
    type: 'PropertyDefinition';
    AssignmentExpression: Expression;
    PropertyName: Identifier;
}

export interface BooleanLiteralExpression extends ExpressionBase {
    type: 'BooleanLiteral';
    value: boolean;
}

export interface NumericLiteralExpression extends ExpressionBase {
    type: 'NumericLiteral';
    value: number | bigint;
}

export interface StringLiteralExpression extends ExpressionBase {
    type: 'StringLiteral';
    value: string;
}

export interface EqualityExpression extends ExpressionBase {
    type: 'EqualityExpression';
    operator: '===' | '!==' | '==' | '!='
    EqualityExpression: Expression;
    RelationalExpression: Expression;
}

export interface CallExpression extends ExpressionBase {
    type: 'CallExpression';
    CallExpression: Expression;
    Arguments: Expression[];
}

export type Identifier = IdentifierName | IdentifierReference;

export interface IdentifierBase extends NodeBase {
}

export interface IdentifierName {
    type: 'IdentifierName';
    name: string;
}

export interface IdentifierReference {
    type: 'IdentifierReference';
    escaped: boolean;
    name: string;
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