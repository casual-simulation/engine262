import { AbstractModuleRecord, SourceTextModuleRecord } from "./modules";
import { Realm } from "./realms";

export type ECMAScriptNode = Node | Statement | Expression | Identifier;

export type Node = FunctionBody;

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

export interface FunctionBody extends NodeBase {
    type: 'FunctionBody';

    FunctionStatementList: Statement[];
}

export type Statement = 
    | ReturnStatement
    | IfStatement
    | Block
    | ExpressionStatement
    | SwitchStatement
    | ForStatement
    | ForOfStatement
    | ForInStatement
    | WhileStatement
    | DoWhileStatement
    | BreakStatement
    | TryStatement
    | FunctionDeclaration
    | AsyncFunctionDeclaration
    | GeneratorDeclaration
    | AsyncGeneratorDeclaration
    | LexicalDeclaration;

export interface StatementBase extends NodeBase {
}

export interface ReturnStatement extends StatementBase {
    type: 'ReturnStatement';
    Expression: Expression;
}

export interface IfStatement extends StatementBase {
    type: 'IfStatement';
    Expression: Expression;

    Statement_a: Statement;
    Statement_b?:  Statement;
}

export interface LexicalDeclaration extends StatementBase {
    type: 'LexicalDeclaration';
    LetOrConst: 'let' | 'const';
    BindingList: LexicalBinding[];
}

export interface LexicalBinding extends NodeBase {
    type: 'LexicalBinding';
    BindingIdentifier?: BindingIdentifier;
    BindingPattern?: BindingPattern;
    Initializer: Expression;
}

export interface BindingIdentifier extends NodeBase {
    type: 'BindingIdentifier';
    name: string;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export interface ObjectBindingPattern extends NodeBase {
    type: 'ObjectBindingPattern';
    BindingPropertyList: BindingProperty[];
}

export interface ArrayBindingPattern extends NodeBase {
    type: 'ArrayBindingPattern';
    BindingElementList: (SingleNameBinding | BindingElement)[];
}


export interface BindingProperty {
    type: 'BindingProperty';
    BindingElement: SingleNameBinding | BindingElement;
    PropertyName: Identifier;
}



export interface SwitchStatement extends StatementBase {
    type: 'SwitchStatement';

    Expression: Expression;
    CaseBlock: CaseBlock;
}

export interface Block extends StatementBase {
    type: 'Block';
    StatementList: Statement[];
}

export interface CaseBlock extends StatementBase {
    type: 'CaseBlock';
    CaseClauses_a: CaseClause[];
    DefaultClause?: CaseClause;
}

export interface CaseClause extends StatementBase {
    type: 'CaseClause';
    Expression: Expression;
    StatementList: Statement[];
}

export interface ExpressionStatement extends StatementBase {
    type: 'ExpressionStatement';
    Expression: Expression;
}

export interface BreakStatement extends StatementBase {
    type: 'BreakStatement';
    LabelIdentifier: Identifier;
}

export interface ForStatement extends StatementBase {
    type: 'ForStatement';
    VariableDeclarationList: VariableDeclaration[];
    Expression_a: Expression;
    Expression_b: Expression;
    Statement: Statement;
}

export interface VariableDeclaration extends NodeBase {
    type: 'VariableDeclaration';
    BindingIdentifier: Identifier;
    Initializer: Expression;
}

export interface ForOfStatement extends StatementBase {
    type: 'ForOfStatement';
    ForDeclaration: ForDeclaration;
    AssignmentExpression: Expression;
    Statement: Statement;
}

export interface ForDeclaration extends NodeBase {
    type: 'ForDeclaration';
    LetOrConst: 'let' | 'const';
    ForBinding: ForBinding;
}

export interface ForBinding extends NodeBase {
    type: 'ForBinding';

    BindingIdentifier: Identifier;
    Initializer: Expression | null;
}

export interface ForInStatement extends StatementBase {
    type: 'ForInStatement';

    ForDeclaration: ForDeclaration;
    Expression: Expression;
    Statement: Statement;
}

export interface WhileStatement extends StatementBase {
    type: 'WhileStatement';

    Expression: Expression;
    Statement: Statement;
}

export interface DoWhileStatement extends StatementBase {
    type: 'DoWhileStatement';

    Expression: Expression;
    Statement: Statement;
}

export interface TryStatement extends StatementBase {
    type: 'TryStatement';

    Block: Statement;
    Catch: Catch;
    Finally?: Statement;
}

export interface Catch extends StatementBase {
    type: 'Catch';
    CatchParameter: Identifier;
    Block: Statement;
}

export interface FunctionDeclaration extends StatementBase {
    type: 'FunctionDeclaration';
    BindingIdentifier: Identifier;
    FormalParameters: FormalParameter[];
    FunctionBody: FunctionBody;
}

export interface AsyncFunctionDeclaration extends StatementBase {
    type: 'AsyncFunctionDeclaration';
    BindingIdentifier: Identifier;
    FormalParameters: FormalParameter[];
    AsyncFunctionBody: AsyncFunctionBody;
}

export interface AsyncFunctionBody extends NodeBase {
    type: 'AsyncFunctionBody';
    FunctionStatementList: Statement[];
}

export interface GeneratorDeclaration extends StatementBase {
    type: 'GeneratorDeclaration';
    BindingIdentifier: Identifier;
    FormalParameters: FormalParameter[];
    GeneratorBody: GeneratorBody;
}

export interface GeneratorBody extends NodeBase {
    type: 'GeneratorBody';
    FunctionStatementList: Statement[];
}

export interface AsyncGeneratorDeclaration extends StatementBase {
    type: 'AsyncGeneratorDeclaration';
    BindingIdentifier: Identifier;
    FormalParameters: FormalParameter[];
    AsyncGeneratorBody: AsyncGeneratorBody;
}

export interface AsyncGeneratorBody extends NodeBase {
    type: 'AsyncGeneratorBody';
    FunctionStatementList: Statement[];
}

export interface ClassDeclaration extends StatementBase {
    type: 'ClassDeclaration';
    BindingIdentifier: Identifier;
    ClassTail: ClassTail;
}

export interface ClassTail extends NodeBase {
    type: 'ClassTail';
    ClassBody: ClassMember[],
    ClassHeritage: Expression;
}

export type ClassMember = FieldDefinition | MethodDefinition | AsyncMethod | GeneratorMethod | AsyncGeneratorMethod;

export interface FieldDefinition extends NodeBase {
    type: 'FieldDefinition';
    ClassElementName: Identifier;
    Initializer: Expression | null;
    static: boolean;
}

export interface MethodDefinition extends NodeBase {
    type: 'MethodDefinition';
    ClassElementName: Identifier;
    UniqueFormalParameters: FormalParameter[];
    FunctionBody: FunctionBody;
}

export interface AsyncMethod extends NodeBase {
    type: 'AsyncMethod';
    ClassElementName: Identifier;
    UniqueFormalParameters: FormalParameter[];
    AsyncFunctionBody: AsyncFunctionBody;
}

export interface GeneratorMethod extends NodeBase {
    type: 'GeneratorMethod';
    ClassElementName: Identifier;
    UniqueFormalParameters: FormalParameter[];
    GeneratorBody: GeneratorBody;
}

export interface AsyncGeneratorMethod extends NodeBase {
    type: 'AsyncGeneratorMethod';
    ClassElementName: Identifier;
    UniqueFormalParameters: FormalParameter[];
    AsyncGeneratorBody: AsyncGeneratorBody;
}


export type FormalParameter = SingleNameBinding | BindingElement;


export interface BindingElement extends NodeBase {
    type: 'BindingElement';
    BindingPattern: BindingPattern;
    Initalizer: Expression;
}


export interface SingleNameBinding extends NodeBase {
    type: 'SingleNameBinding';

    BindingIdentifier: Identifier;
    Initializer: Expression;
}

export type Expression = 
    | AssignmentExpression
    | AdditiveExpression
    | MultiplicativeExpression
    | MemberExpression
    | ThisExpression
    | SuperCall
    | SuperProperty
    | ObjectLiteralExpression
    | ArrayLiteralExpression
    | BooleanLiteralExpression
    | NumericLiteralExpression
    | StringLiteralExpression
    | NullLiteral
    | TemplateLiteral
    | EqualityExpression
    | CallExpression
    | RelationalExpression
    | UpdateExpression
    | ArrowFunction
    | AsyncArrowFunction
    | ConditionalExpression
    | CoalesceExpression
    | ParenthesizedExpression
    | YieldExpression
    | AwaitExpression
    | Identifier;

export interface ExpressionBase extends NodeBase {
}

export interface AssignmentExpression extends ExpressionBase {
    type: 'AssignmentExpression';
    LeftHandSideExpression: Expression;
    AssignmentExpression: Expression;
    AssignmentOperator: '=' | '+=' | '-=' | '*=' | '/=';
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

export interface ThisExpression extends ExpressionBase {
    type: 'ThisExpression';
}

export interface SuperCall extends ExpressionBase {
    type: 'SuperCall';
    Arguments: Expression[];
}

export interface SuperProperty extends ExpressionBase {
    type: 'SuperProperty';
    IdentifierName: Identifier;
    Expression: null | Expression;
}

export interface ObjectLiteralExpression extends ExpressionBase {
    type: 'ObjectLiteral';
    PropertyDefinitionList: PropertyDefinition[];
}

export interface ArrayLiteralExpression extends ExpressionBase {
    type: 'ArrayLiteral';
    ElementList: Expression[];
    hasTrailingComma: boolean;
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

export interface NullLiteral extends ExpressionBase {
    type: 'NullLiteral';
}

export interface TemplateLiteral extends ExpressionBase {
    type: 'TemplateLiteral';
    TemplateSpanList: string[];
    ExpressionList: Expression[];
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

export interface RelationalExpression extends ExpressionBase {
    type: 'RelationalExpression';
    operator: '<' | '>' | '<=' | '>=';

    RelationalExpression: Expression;
    ShiftExpression: Expression;
}

export interface UpdateExpression extends ExpressionBase {
    type: 'UpdateExpression';
    LeftHandSideExpression: Expression;
    UnaryExpression: Expression | null;
    operator: '++' | '-' | '--';
}

export interface ArrowFunction extends ExpressionBase {
    type: 'ArrowFunction';
    ArrowParameters: FormalParameter[];
    ConciseBody?: ConciseBody | FunctionBody;
}

export interface AsyncArrowFunction extends ExpressionBase {
    type: 'AsyncArrowFunction';
    ArrowParameters: FormalParameter[];
    AsyncConciseBody: AsyncConciseBody | AsyncFunctionBody;
}


export interface ConciseBody extends NodeBase {
    type: 'ConciseBody';
    ExpressionBody: Expression;
}

export interface AsyncConciseBody extends NodeBase {
    type: 'AsyncConciseBody';
    ExpressionBody: Expression;
}


export interface ConditionalExpression extends ExpressionBase {
    type: 'ConditionalExpression';
    ShortCircuitExpression: Expression;
    AssignmentExpression_a: Expression;
    AssignmentExpression_b: Expression;
}

export interface CoalesceExpression extends ExpressionBase {
    type: 'CoalesceExpression';
    CoalesceExpressionHead: Expression;
    BitwiseORExpression: Expression;
}

export interface ParenthesizedExpression extends ExpressionBase {
    type: 'ParenthesizedExpression';
    Expression: Expression;
}

export interface YieldExpression extends ExpressionBase {
    type: 'YieldExpression';
    AssignmentExpression: Expression;
    hasStar: boolean;
}

export interface AwaitExpression extends ExpressionBase {
    type: 'AwaitExpression';
    UnaryExpression: Expression;
}


export type Identifier = IdentifierName | IdentifierReference | PrivateIdentifier | BindingIdentifier;

export interface IdentifierBase extends NodeBase {
}

export interface IdentifierName extends IdentifierBase {
    type: 'IdentifierName';
    name: string;
}

export interface IdentifierReference extends IdentifierBase {
    type: 'IdentifierReference';
    escaped: boolean;
    name: string;
}

export interface PrivateIdentifier extends IdentifierBase {
    type: 'PrivateIdentifier';
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