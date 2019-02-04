import * as React from 'react';

import {
    focusFirstSiblingOf,
    focusLastSiblingOf,
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

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child as HTMLElement)).toEqual(parent);
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

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child as HTMLElement)).toEqual(parent);
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

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child as HTMLElement)).toEqual(parent);
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

            expect(heading).toBeInstanceOf(HTMLElement);
            expect(getSiblingHeadings(heading as HTMLElement)).toHaveLength(3);
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

            expect(heading).toBeInstanceOf(HTMLElement);
            expect(getSiblingHeadings(heading as HTMLElement)).toHaveLength(3);
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

            expect(heading).toBeInstanceOf(HTMLElement);
            expect(getSiblingHeadings(heading as HTMLElement)).toHaveLength(2);
        });
    });

    describe('focusFirstSiblingOf', () => {
        it('focuses the first heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                </div>
            `);

            const [firstHeading, secondHeading]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
            secondHeading.focus();
            expect(document.activeElement).toEqual(secondHeading);

            // Matter
            focusFirstSiblingOf(secondHeading);
            expect(document.activeElement).toEqual(firstHeading); // first heading
        });
    });

    describe('focusLastSiblingOf', () => {
        it('focuses the last heading in document flow', () => {
            const tree = createTree(`
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="1"></div>
                    <div data-accordion-component="AccordionItemHeading" tabindex="0" id="2"></div>
                </div>
            `);

            const [firstHeading, secondHeading]: HTMLElement[] = Array.from(
                tree.querySelectorAll(
                    '[data-accordion-component="AccordionItemHeading"]',
                ),
            );

            // Predicate
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
            firstHeading.focus();
            expect(document.activeElement).toEqual(firstHeading);

            // Matter
            focusLastSiblingOf(firstHeading);
            expect(document.activeElement).toEqual(secondHeading); // first heading
        });
    });
});
