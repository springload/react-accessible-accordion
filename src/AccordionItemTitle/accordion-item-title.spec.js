// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Provider } from 'unstated';
import AccordionItemTitle from './accordion-item-title-wrapper';
import ItemContainer, { resetNextUuid } from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';

describe('AccordionItemTitle', () => {
    let accordionContainer;
    let itemContainer;
    let onChange;

    beforeEach(() => {
        resetNextUuid();
        onChange = jest.fn();

        itemContainer = new ItemContainer();
        accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(false);
        accordionContainer.setOnChange(onChange);

        accordionContainer.addItem({
            uuid: 0, // because `nextUuid` in ItemContainer starts at zero.
            expanded: false,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionContainer, itemContainer]}>
                    <AccordionItemTitle>
                        <div>Fake Title</div>
                    </AccordionItemTitle>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle className={className} />
            </Provider>,
        );
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders with different hideBodyClassName', () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle hideBodyClassName={hideBodyClassName} />
            </Provider>,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it("doesn't present hideBodyClassName when collapsed", () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle hideBodyClassName={hideBodyClassName} />
            </Provider>,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it('renders correctly when clicking', async () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('click');

        expect(onChange.mock.calls.length).toEqual(1);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(1);
    });

    it('renders correctly when trying to click but disabled', async () => {
        accordionContainer.removeItem(0);
        accordionContainer.addItem({
            uuid: 0, // because `nextUuid` in ItemContainer starts at zero.
            expanded: false,
            disabled: true,
        });

        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('click');

        expect(onChange.mock.calls.length).toEqual(0);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('renders correctly when pressing enter', async () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 13 });

        expect(onChange.mock.calls.length).toEqual(1);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(1);
    });

    it('renders correctly when pressing space', async () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 32 });

        expect(onChange.mock.calls.length).toEqual(1);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(1);
    });

    it('renders correctly when pressing another key', async () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('keypress', { charCode: 35 });

        expect(onChange.mock.calls.length).toEqual(0);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('renders null if an associated AccordionItem is not registered in accordionContainer', () => {
        const className = 'className';
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle className={className}>
                    <div>Fake body</div>
                </AccordionItemTitle>
            </Provider>,
        );

        expect(
            wrapper.findWhere(item => item.className === className).length,
        ).toEqual(0);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle lang="en">Fake Title</AccordionItemTitle>
            </Provider>,
        );

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    // edge case to cover branch
    it('renders correctly when trying to click but disabled & accordion === true', async () => {
        accordionContainer.setAccordion(true);
        accordionContainer.removeItem(0);
        accordionContainer.addItem({
            uuid: 0, // because `nextUuid` in ItemContainer starts at zero.
            expanded: false,
            disabled: true,
        });

        const wrapper = mount(
            <Provider inject={[accordionContainer, itemContainer]}>
                <AccordionItemTitle>Fake Title</AccordionItemTitle>
            </Provider>,
        );

        wrapper.find('div').simulate('click');

        expect(onChange.mock.calls.length).toEqual(0);
        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });
});
