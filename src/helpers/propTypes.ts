/*
 * Empty anonymous callback is a hacky 'wildcard/any' workaround for bypassing
 * prop-types.
 *
 * By using this, we can avoid having to make prop-types a dependency of React
 * Accessible Accordion.
 */
// tslint:disable-next-line:no-any
export const wildcard = (...args: any): null => null;
