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
            uuid: 'item-one-uuid',
            expanded: false,
            disabled: false,
        });
        accordionStore.addItem({
            uuid: 'item-two-uuid',
            expanded: true,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <AccordionItemTitle
                    accordionStore={accordionStore}
                    uuid="item-one-uuid"
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
                    uuid="item-one-uuid"
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
                    uuid="item-one-uuid"
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
                    uuid="item-two-uuid"
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
                uuid="item-one-uuid"
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
                uuid="item-one-uuid"
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
                uuid="item-one-uuid"
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
