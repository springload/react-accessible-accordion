// @flow

import React from 'react';
import { Provider } from 'mobx-react';
import renderer from 'react-test-renderer';
import { createAccordionStore } from '../accordionStore/accordionStore';
import AccordionItemBody from './accordion-item-body';

describe('AccordionItemBody', () => {
    let accordionStore;
    const itemkey = 'asdf-1234';

    beforeEach(() => {
        accordionStore = createAccordionStore({
            accordion: true,
            onChange: jest.fn(),
        });
        accordionStore.addItem({
            itemkey,
            itemUuid: 'ghij-5678',
            expanded: false,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore} itemkey={itemkey}>
                    <AccordionItemBody>
                        <div>Fake body</div>
                    </AccordionItemBody>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore} itemkey={itemkey}>
                    <AccordionItemBody className="testCSSClass">
                        <div>Fake body</div>
                    </AccordionItemBody>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with prefixClass', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore} itemkey={itemkey}>
                    <AccordionItemBody hideBodyClassName="testCSSClass--hidden">
                        <div>Fake body</div>
                    </AccordionItemBody>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
