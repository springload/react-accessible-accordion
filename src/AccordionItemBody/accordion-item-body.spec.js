// @flow

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'unstated';
import ItemContainer, { resetNextUuid } from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import AccordionItemBody from './accordion-item-body-wrapper';

describe('AccordionItemBody', () => {
    let accordionStore;
    let itemStore;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();

        const itemContainer = new ItemContainer();
        resetNextUuid();
        const accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(true);
        accordionContainer.setOnChange(onChange);
        accordionStore = accordionContainer;
        itemStore = itemContainer;

        accordionStore.addItem({
            uuid: 0, // because `nextUuid` in ItemContainer starts at zero.
            expanded: false,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const wrapper = mount(
            <Provider inject={[accordionStore, itemStore]}>
                <AccordionItemBody>
                    <div>Fake body</div>
                </AccordionItemBody>
            </Provider>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mount(
            <Provider inject={[accordionStore, itemStore]}>
                <AccordionItemBody className={className} />
            </Provider>,
        );
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders correctly with different hideBodyClassName', () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mount(
            <Provider inject={[accordionStore, itemStore]}>
                <AccordionItemBody hideBodyClassName={hideBodyClassName} />
            </Provider>,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(
            <Provider inject={[accordionStore, itemStore]}>
                <AccordionItemBody lang="en" />
            </Provider>,
        );
        expect(wrapper.find('div').instance().lang).toEqual('en');
    });
});
