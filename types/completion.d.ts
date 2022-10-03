
export class Completion {
    Type: 'throw' | 'normal';
    Value: any;
    Target: any;

    constructor(init: any);
}

export function ThrowCompletion(argument: any): Completion;
export function EnsureCompletion(argument: any): Completion;
export function NormalCompletion(argument: any): Completion;