// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import AccordionItemTitle from './accordion-item-title';
import { createAccordionStore } from '../accordionStore/accordionStore';

describe('AccordionItemTitle', () => {
    let accordionStore;

    beforeEach(() => {
        accordionStore = createAccordionStore({
            accordion: false,
            onChange: jest.fn(),
        });

        accordionStore.addItem({
            itemkey: 'item-one-itemkey',
            expanded: false,
            disabled: false,
            itemUuid: 'item-one-itemUUid',
        });
        accordionStore.addItem({
            itemkey: 'item-two-itemkey',
            expanded: true,
            disabled: false,
            itemUuid: 'item-two-itemUUid',
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <AccordionItemTitle
                    accordionStore={accordionStore}
                    itemkey="item-one-itemkey"
                >
                    <div>Fake Title</div>
                </AccordionItemTitle>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const tree = renderer
            .create(
                <AccordionItemTitle
                    className="testCSSClass"
                    accordionStore={accordionStore}
                    itemkey="item-one-itemkey"
                >
                    <div>Fake Title</div>
                </AccordionItemTitle>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer
            .create(
                <AccordionItemTitle
                    hideBodyClassName="testCSSClass--hidden"
                    accordionStore={accordionStore}
                    itemkey="item-one-itemkey"
                >
                    <div>Fake title</div>
                </AccordionItemTitle>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("doesn't respect hideBodyClassName when collapsed", () => {
        const tree = renderer
            .create(
                <AccordionItemTitle
                    hideBodyClassName="testCSSClass--hidden"
                    accordionStore={accordionStore}
                    itemkey="item-two-itemkey"
                >
                    <div>Fake title</div>
                </AccordionItemTitle>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing enter', async () => {
        const tree = renderer.create(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 13 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(accordionStore.onChange).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing space', async () => {
        const tree = renderer.create(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 32 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(accordionStore.onChange).toHaveBeenCalledTimes(1);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when pressing another key', async () => {
        const tree = renderer.create(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );

        tree.getInstance().handleKeyPress({ charCode: 35 });

        await new Promise(resolve => setTimeout(resolve, 200));

        expect(accordionStore.onChange).toHaveBeenCalledTimes(0);
        expect(tree).toMatchSnapshot();
    });
});
