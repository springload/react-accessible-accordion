const DEFAULT = 0;

let counter = DEFAULT;

export function nextUuid(): number {
    const current = counter;
    counter = counter + 1;

    return current;
}

export function resetNextUuid(): void {
    counter = DEFAULT;
}
