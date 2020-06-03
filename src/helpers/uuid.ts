import { UUID } from '../components/ItemContext';

const DEFAULT = 0;

let counter = DEFAULT;

export function nextUuid(): UUID {
    const current = counter;
    counter = counter + 1;

    return `raa-${current}`;
}

export function resetNextUuid(): void {
    counter = DEFAULT;
}

// https://stackoverflow.com/a/14664879
// but modified to allow additional first characters per HTML5
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
const idRegex = /^[_\-.a-zA-Z][\w:.-]*$/;

export function assertValidHtmlId(htmlId: string): void {
    if (!htmlId.toString().match(idRegex)) {
        throw new Error(
            `uuid must be a valid HTML Id but was given "${htmlId}"`,
        );
    }
}
