// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title';
import AccordionItemBody from '../AccordionItemBody/accordion-item-body';
import AccordionItem from './accordion-item';
import { createAccordionStore } from '../accordionStore/accordionStore';

jest.mock('consecutive', () => () => () => 'mock-uuid-hash');

describe('AccordionItem', () => {
    let accordionStore;

    beforeEach(() => {
        accordionStore = createAccordionStore({
            accordion: false,
            onChange: jest.fn(),
        });
    });

    it('renders correctly with accordion true', () => {
        accordionStore.accordion = true;
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle className="accordion__title">
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody className="accordion__body">
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with accordion false', () => {
        accordionStore.accordion = false;
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle className="accordion__title">
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody className="accordion__body">
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('still renders with no AccordionItemTitle or AccordionItemBody', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem>
                        <div>Fake title</div>
                        <div>Fake body</div>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('still renders with no children at all', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different className', () => {
        const tree = renderer.create(
            <Provider accordionStore={accordionStore}>
                <AccordionItem className="testCSSClass" />
            </Provider>,
        );
        expect(tree.root.findByType('div').props.className).toEqual(
            'testCSSClass',
        );
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer.create(
            <Provider accordionStore={accordionStore}>
                <AccordionItem
                    expanded={false}
                    className="accordion-item"
                    hideBodyClassName="accordion-item--hidden"
                />
            </Provider>,
        );
        expect(tree.root.findByType('div').props.className).toEqual(
            'accordion-item accordion-item--hidden',
        );
    });

    it('renders correctly with other blocks inside', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem accordion={false}>
                        <AccordionItemTitle>
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <div>Just another block</div>
                        <AccordionItemBody>
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with other blocks inside 2', () => {
        const tree = renderer
            .create(
                <Provider accordionStore={accordionStore}>
                    <AccordionItem accordion={false}>
                        <AccordionItemTitle>
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <div>Fake body</div>
                        </AccordionItemBody>
                        <div>Just another block</div>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
