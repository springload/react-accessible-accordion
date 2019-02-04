import * as React from 'react';
import { mount } from 'enzyme';

import { getClosestAccordion } from './focus';

describe('focus', () => {
    function createAccordionElement() {
        const element = document.createElement('div');
        element.setAttribute('data-accordion-component', 'Accordion');
        return element;
    }

    function createHeadingElement() {
        const element = document.createElement('div');
        element.setAttribute(
            'data-accordion-component',
            'AccordionItemHeading',
        );
    }

    describe('getClosestAccordion', () => {
        it('gets an ancestral accordion element', () => {
            const tree = mount(
                <div data-accordion-component="Accordion" id="parent">
                    <div id="child" />
                </div>,
            );

            const child = tree.find('#child').instance() as HTMLDivElement;
            const parent = tree.find('#parent').instance() as HTMLDivElement;

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('only gets the nearest ancestral accordion element when there are more than one', () => {
            const tree = mount(
                <div data-accordion-component="Accordion">
                    <div data-accordion-component="Accordion" id="parent">
                        <div id="child" />
                    </div>
                </div>,
            );

            const child = tree.find('#child').instance();
            const parent = tree.find('#parent').instance();

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child)).toEqual(parent);
        });

        it('recurses through intermediary elements', () => {
            const tree = mount(
                <div data-accordion-component="Accordion" id="parent">
                    <div>
                        <div>
                            <div id="child" />
                        </div>
                    </div>
                </div>,
            );

            const child = tree.find('#child').instance();
            const parent = tree.find('#parent').instance();

            expect(child instanceof HTMLElement).toEqual(true);
            expect(parent instanceof HTMLElement).toEqual(true);
            expect(getClosestAccordion(child)).toEqual(parent);
        });
    });
});
