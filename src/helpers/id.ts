// @ts-ignore
import { useId } from 'react';
import { ID } from '../components/ItemContext';

const DEFAULT = 0;

let counter = 0;

export function useGlobalCounterId(): ID {
    const current = counter;
    counter = counter + 1;
    return `raa-${current}`;
}

export function resetGlobalCounterId(): void {
    counter = DEFAULT;
}

type IDGenerator = () => ID;

export const useNextId: IDGenerator = useId || useGlobalCounterId;

// HTML5 ids allow all unicode characters, except for ASCII whitespaces
// https://infra.spec.whatwg.org/#ascii-whitespace
// eslint-disable-next-line no-control-regex
const idRegex = /[\u0009\u000a\u000c\u000d\u0020]/g;

export function assertValidHtmlId(htmlId: string): boolean {
    if (htmlId === '' || idRegex.test(htmlId)) {
        console.error(
            `uuid must be a valid HTML5 id but was given "${htmlId}", ASCII whitespaces are forbidden`,
        );

        return false;
    }

    return true;
}
