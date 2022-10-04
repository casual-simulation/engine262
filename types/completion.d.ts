
export class Completion<T> {
    Type: 'throw' | 'normal';
    Value: T;
    Target: any;

    constructor(init: any);
}

export function ThrowCompletion<T>(argument: T): Completion<T>;
export function EnsureCompletion<T>(argument: Completion<T> | T): Completion<T>;
export function NormalCompletion<T>(argument: T): Completion<T>;