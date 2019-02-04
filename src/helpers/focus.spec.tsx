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

            const child: HTMLElement = tree.querySelector('#child');
            const parent: HTMLElement = tree.querySelector('#parent');

            // Predicate
            expect(child).toBeInstanceOf(HTMLElement);
            expect(parent).toBeInstanceOf(HTMLElement);

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

            const child: HTMLElement = tree.querySelector('#child');
            const parent: HTMLElement = tree.querySelector('#parent');

            // Predicate
            expect(child).toBeInstanceOf(HTMLElement);
            expect(parent).toBeInstanceOf(HTMLElement);

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

            const child: HTMLElement = tree.querySelector('#child');
            const parent: HTMLElement = tree.querySelector('#parent');

            expect(child).toBeInstanceOf(HTMLElement);
            expect(parent).toBeInstanceOf(HTMLElement);
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

            const heading: HTMLElement = tree.querySelector(
                '[data-accordion-component="AccordionItemHeading"]',
            );

            // Predicate
            expect(heading).toBeInstanceOf(HTMLElement);

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

            const heading: HTMLElement = tree.querySelector(
                '[data-accordion-component="AccordionItemHeading"]',
            );

            // Predicate
            expect(heading).toBeInstanceOf(HTMLElement);

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

            const heading: HTMLElement = tree.querySelector('#first');

            // Predicate
            expect(heading).toBeInstanceOf(HTMLElement);

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
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
            expect(thirdHeading).toBeInstanceOf(HTMLElement);
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
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
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
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
            expect(thirdHeading).toBeInstanceOf(HTMLElement);
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
            expect(firstHeading).toBeInstanceOf(HTMLElement);
            expect(secondHeading).toBeInstanceOf(HTMLElement);
            expect(thirdHeading).toBeInstanceOf(HTMLElement);
            thirdHeading.focus();
            expect(document.activeElement).toBe(thirdHeading);

            // Matter
            focusPreviousSiblingOf(thirdHeading);
            expect(document.activeElement).toBe(secondHeading);
        });
    });
});
