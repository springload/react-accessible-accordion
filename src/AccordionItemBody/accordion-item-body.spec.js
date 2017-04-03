import React from 'react';
import renderer from 'react-test-renderer';

import AccordionItemBody from './accordion-item-body';

describe('AccordionItemBody', () => {
    it('renders correctly with min params', () => {
        const tree = renderer.create(
            <AccordionItemBody>
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer.create(
            <AccordionItemBody className="testCSSClass">
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with prefixClass', () => {
        const tree = renderer.create(
            <AccordionItemBody hideBodyClassName="testCSSClass--hidden">
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with expanded', () => {
        const tree = renderer.create(
            <AccordionItemBody expanded={true}>
                <div>Fake body</div>
            </AccordionItemBody>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
