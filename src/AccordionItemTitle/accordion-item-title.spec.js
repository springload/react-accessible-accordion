// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { AccordionItemTitle } from './accordion-item-title';

describe('AccordionItemTitle', () => {
    let mockAccordionStore;

    beforeEach(() => {
        mockAccordionStore = {
            items: [{
                itemkey: 'item-one-itemkey',
                expanded: false,
                itemUuid: 'item-one-itemUUid',
            },
            {
                itemkey: 'item-two-itemkey',
                expanded: true,
                itemUuid: 'item-two-itemUUid',
            }],
            accordion: false,
            onChange: jest.fn(),
        };
    });

    it('renders correctly with min params', () => {
        const tree = renderer.create(
            <AccordionItemTitle accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer.create(
            <AccordionItemTitle className="testCSSClass" accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer.create(
            <AccordionItemTitle hideBodyClassName="testCSSClass--hidden" accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('doesn\'t respect hideBodyClassName when collapsed', () => {
        const tree = renderer.create(
            <AccordionItemTitle hideBodyClassName="testCSSClass--hidden" accordionStore={mockAccordionStore} itemkey="item-two-itemkey">
                <div>Fake title</div>
            </AccordionItemTitle>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing enter', async () => {
        const tree = renderer.create(
            <AccordionItemTitle accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 13 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(mockAccordionStore.onChange).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing space', async () => {
        const tree = renderer.create(
            <AccordionItemTitle accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 32 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(mockAccordionStore.onChange).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing another key', async () => {
        const tree = renderer.create(
            <AccordionItemTitle accordionStore={mockAccordionStore} itemkey="item-one-itemkey">
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 35 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(mockAccordionStore.onChange).toHaveBeenCalledTimes(0);
        expect(tree).toMatchSnapshot();
    });
});
