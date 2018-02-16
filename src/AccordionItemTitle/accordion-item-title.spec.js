// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AccordionItemTitle from './accordion-item-title';
import { createAccordionStore } from '../accordionStore/accordionStore';

describe('AccordionItemTitle', () => {
    let accordionStore;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();

        accordionStore = createAccordionStore({
            accordion: false,
            onChange,
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
        const wrapper = mount(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                Fake Title
            </AccordionItemTitle>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 13 });

        expect(onChange.mock.calls.length).toEqual(1);
        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(2);
    });

    it('renders correctly when pressing space', async () => {
        const wrapper = mount(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                Fake Title
            </AccordionItemTitle>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 32 });

        expect(onChange.mock.calls.length).toEqual(1);
        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(2);
    });

    it('renders correctly when pressing another key', async () => {
        const wrapper = mount(
            <AccordionItemTitle
                accordionStore={accordionStore}
                itemkey="item-one-itemkey"
            >
                Fake Title
            </AccordionItemTitle>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 35 });

        expect(onChange.mock.calls.length).toEqual(0);
        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(1);
    });
});
