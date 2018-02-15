// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import { AccordionItemBody } from './accordion-item-body';

const mockAccordionStore = {
    items: [{
        itemkey: 'asdf-1234',
        expanded: false,
        itemUuid: 'ghij-5678',
    }],
    accordion: true,
    onChange: jest.fn(),
};

describe('AccordionItemBody', () => {
    it('renders correctly with min params', () => {
        const tree = renderer.create(
            <AccordionItemBody accordionStore={mockAccordionStore} itemkey="asdf-1234">
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer.create(
            <AccordionItemBody className="testCSSClass" accordionStore={mockAccordionStore} itemkey="asdf-1234">
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with prefixClass', () => {
        const tree = renderer.create(
            <AccordionItemBody hideBodyClassName="testCSSClass--hidden" accordionStore={mockAccordionStore} itemkey="asdf-1234">
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('renders correctly with an id (aria-labelledBy filled)', () => {
    //     const tree = renderer.create(
    //         <AccordionItemBody id="accordion__body-HASHID" expanded={true}>
    //             <div>Fake body</div>
    //         </AccordionItemBody>,
    //     ).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
