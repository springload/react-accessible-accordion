import * as React from 'react';

import { getClosestAccordion } from './focus';

describe('focus', () => {
    function createTree(innerHTML: string): DocumentFragment {
        const template = document.createElement('template');
        // tslint:disable-next-line:no-inner-html
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
});
