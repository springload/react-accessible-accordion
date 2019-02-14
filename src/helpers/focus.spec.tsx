import * as React from 'react';

import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
    focusNextSiblingOf,
    focusPreviousSiblingOf,
    getClosestAccordion,
    getSiblingHeadings,
} from './focus';

describe('focus', () => {
    function createTree(innerHTML: string): DocumentFragment {
        const template = document.createElement('template');
        // tslint:disable-next-line: no-inner-html
        template.innerHTML = innerHTML.trim();

        return template.content;
    }

    describe('getClosestAccordion', () => {
        it('gets an ancestral accordion element', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                   <div id="child">Child</div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            // Matter
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('only gets the nearest ancestral accordion element when there are more than one', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="Accordion" id="parent">
                        <div id="child">Child</div>
                    </div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            // Matter
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('recurses through intermediary elements', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div>
                        <div>
                            <div id="child">Child</div>
                        </div>
                    </div>
                </div>
            `);

            const child = tree.querySelector('#child');
            const parent = tree.querySelector('#parent');

            // Predicate
            if (
                !(child instanceof HTMLElement && parent instanceof HTMLElement)
            ) {
                throw new Error('child or parent not found');
            }

            expect(getClosestAccordion(child)).toEqual(parent);
        });
    });

    describe('getSiblingHeadings', () => {
        it('returns adjacent siblings', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div data-accordion-component="AccordionItemHeading">Heading</div>
                    <div data-accordion-component="AccordionItemHeading">Heading</div>
                    <div data-accordion-component="AccordionItemHeading">Heading</div>
                </div>
            `);

            const heading = tree.querySelector(
                '[data-accordion-component="AccordionItemHeading"]',
            );

            // Predicate
            if (!(heading instanceof HTMLElement)) {
                throw new Error('heading not found');
            }

            // Matter
            expect(getSiblingHeadings(heading)).toHaveLength(3);
        });

        it('returns nested siblings', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion" id="parent">
                    <div>
                        <div data-accordion-component="AccordionItemHeading">Heading</div>
                    </div>
                    <div data-accordion-component="AccordionItemHeading">Heading</div>
                    <div data-accordion-component="AccordionItemHeading">Heading</div>
                </div>
            `);

            const heading = tree.querySelector(
                '[data-accordion-component="AccordionItemHeading"]',
            );

            // Predicate
            if (!(heading instanceof HTMLElement)) {
                throw new Error('heading not found');
            }

            // Matter
            expect(getSiblingHeadings(heading)).toHaveLength(3);
        });

        it('doesn‘t return headings "above" the accordion', () => {
            const tree = createTree(`
                <div data-accordion-component="AccordionItemHeading">
                    <div data-accordion-component="Accordion" id="parent">
                        <div data-accordion-component="AccordionItemHeading" id="first">Heading</div>
                        <div data-accordion-component="AccordionItemHeading">Heading</div>
                    </div>
                </div>
            `);

            const heading = tree.querySelector('#first');

            // Predicate
            if (!(heading instanceof HTMLElement)) {
                throw new Error('heading not found');
            }

            // Matter
            expect(getSiblingHeadings(heading)).toHaveLength(2);
        });
    });

    describe('focusFirstSiblingOf', () => {
        it('focuses the first heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="3"></div>
                </div>
            `);

            const [firstHeading, secondHeading, thirdHeading] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstHeading instanceof HTMLElement &&
                    secondHeading instanceof HTMLElement &&
                    thirdHeading instanceof HTMLElement
                )
            ) {
                throw new Error('headings not found');
            }
            thirdHeading.focus();
            expect(document.activeElement).toBe(thirdHeading);

            // Matter
            focusFirstSiblingOf(thirdHeading);
            expect(document.activeElement).toBe(firstHeading);
        });
    });

    describe('focusLastSiblingOf', () => {
        it('focuses the last heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstHeading,
                secondHeading,
                thirdHeading,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstHeading instanceof HTMLElement &&
                    secondHeading instanceof HTMLElement &&
                    thirdHeading instanceof HTMLElement
                )
            ) {
                throw new Error('headings not found');
            }
            firstHeading.focus();
            expect(document.activeElement).toBe(firstHeading);

            // Matter
            focusLastSiblingOf(firstHeading);
            expect(document.activeElement).toBe(thirdHeading);
        });
    });

    describe('focusNextSiblingOf', () => {
        it('focuses the next heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstHeading,
                secondHeading,
                thirdHeading,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstHeading instanceof HTMLElement &&
                    secondHeading instanceof HTMLElement &&
                    thirdHeading instanceof HTMLElement
                )
            ) {
                throw new Error('headings not found');
            }
            firstHeading.focus();
            expect(document.activeElement).toBe(firstHeading);

            // Matter
            focusNextSiblingOf(firstHeading);
            expect(document.activeElement).toBe(secondHeading);
        });
    });

    describe('focusPreviousSiblingOf', () => {
        it('focuses the previous heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="3"></div>
                </div>
            `);

            const [
                firstHeading,
                secondHeading,
                thirdHeading,
            ]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            if (
                !(
                    firstHeading instanceof HTMLElement &&
                    secondHeading instanceof HTMLElement &&
                    thirdHeading instanceof HTMLElement
                )
            ) {
                throw new Error('headings not found');
            }
            thirdHeading.focus();
            expect(document.activeElement).toBe(thirdHeading);

            // Matter
            focusPreviousSiblingOf(thirdHeading);
            expect(document.activeElement).toBe(secondHeading);
        });
    });
});
