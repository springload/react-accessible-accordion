// @flow

import React from 'react';
import { mount } from 'enzyme';
import AccordionItemTitle from './AccordionItemTitle.wrapper';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { Provider as AccordionProvider } from '../AccordionContainer/AccordionContainer';

describe('AccordionItemTitle', () => {
    const DEFAULT_ITEM = {
        uuid: 0,
        expanded: false,
        disabled: false,
        focus: false,
    };

    function mountItem(node, item = DEFAULT_ITEM) {
        return mount(
            <AccordionProvider accordion={false} items={[item]}>
                <ItemProvider uuid={item.uuid}>{node}</ItemProvider>
            </AccordionProvider>,
        );
    }

    function mountItems(node, items = [DEFAULT_ITEM]) {
        return mount(
            <AccordionProvider accordion={false} items={items}>
                {items.map((item, index) => (
                    <ItemProvider key={index} uuid={item.uuid}>
                        {node}
                    </ItemProvider>
                ))}
            </AccordionProvider>,
        );
    }

    function isExpanded(wrapper, uuid) {
        return !!wrapper
            .find(AccordionProvider)
            .instance()
            .state.items.find(item => item.uuid === uuid).expanded;
    }

    function isFocused(wrapper, uuid) {
        return !!wrapper
            .find(AccordionProvider)
            .instance()
            .state.items.find(item => item.uuid === uuid).focus;
    }

    function findFocusedIndex(wrapper) {
        return wrapper
            .find(AccordionProvider)
            .instance()
            .state.items.findIndex(item => item.focus);
    }

    it('renders correctly with min params', () => {
        const wrapper = mountItem(
            <AccordionItemTitle>
                <div>Fake Title</div>
            </AccordionItemTitle>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mountItem(<AccordionItemTitle className={className} />);
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders with different hideBodyClassName', () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mountItem(
            <AccordionItemTitle hideBodyClassName={hideBodyClassName} />,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it("doesn't present hideBodyClassName when collapsed", () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mountItem(
            <AccordionItemTitle hideBodyClassName={hideBodyClassName} />,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it('toggles state when clicked', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('click');
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('doesn’t toggle state when trying to click but disabled', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            {
                ...DEFAULT_ITEM,
                disabled: true,
            },
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('click');
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
    });

    it('toggles state when pressing enter', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 13 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('toggles state when pressing space', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 32 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('doesn’t toggle state when pressing another key', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 35 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mountItem(
            <AccordionItemTitle lang="en">Fake Title</AccordionItemTitle>,
        );

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    // edge case to cover branch
    it('doesn’t toggle state when clicking but disabled & accordion === true', async () => {
        const wrapper = mount(
            <AccordionProvider
                accordion
                items={[
                    {
                        ...DEFAULT_ITEM,
                        disabled: true,
                    },
                ]}
            >
                <ItemProvider uuid={DEFAULT_ITEM.uuid}>
                    <AccordionItemTitle>Fake Title</AccordionItemTitle>
                </ItemProvider>
            </AccordionProvider>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('click');
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
    });

    it('toggles state when blurred', async () => {
        const wrapper = mountItem(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            {
                ...DEFAULT_ITEM,
                focus: true,
            },
        );

        expect(isFocused(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
        wrapper.find('div').simulate('blur');
        expect(isFocused(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
    });

    it('sets focus to last item when end is pressed', async () => {
        const wrapper = mountItems(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            [
                {
                    ...DEFAULT_ITEM,
                    uuid: 'foo',
                    focus: true,
                },
                {
                    ...DEFAULT_ITEM,
                    uuid: 'bar',
                    focus: false,
                },
            ],
        );

        expect(findFocusedIndex(wrapper)).toBe(0);
        wrapper
            .find('div')
            .first()
            .simulate('keydown', { which: 35 });
        expect(findFocusedIndex(wrapper)).toBe(1);
    });

    it('sets focus to first item when home is pressed', async () => {
        const wrapper = mountItems(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            [
                {
                    ...DEFAULT_ITEM,
                    uuid: 'foo',
                    focus: false,
                },
                {
                    ...DEFAULT_ITEM,
                    uuid: 'bar',
                    focus: true,
                },
            ],
        );

        expect(findFocusedIndex(wrapper)).toBe(1);
        wrapper
            .find('div')
            .first()
            .simulate('keydown', { which: 36 });
        expect(findFocusedIndex(wrapper)).toBe(0);
    });

    it('sets focus to previous item when up arrow is pressed', async () => {
        const wrapper = mountItems(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            [
                {
                    ...DEFAULT_ITEM,
                    uuid: 'foo',
                    focus: false,
                },
                {
                    ...DEFAULT_ITEM,
                    uuid: 'bar',
                    focus: true,
                },
            ],
        );

        expect(findFocusedIndex(wrapper)).toBe(1);
        wrapper
            .find('div')
            .last()
            .simulate('keydown', { which: 38 });
        expect(findFocusedIndex(wrapper)).toBe(0);
    });

    it('sets focus to next item when down arrow is pressed', async () => {
        const wrapper = mountItems(
            <AccordionItemTitle>Fake Title</AccordionItemTitle>,
            [
                {
                    ...DEFAULT_ITEM,
                    uuid: 'foo',
                    focus: true,
                },
                {
                    ...DEFAULT_ITEM,
                    uuid: 'bar',
                    focus: false,
                },
            ],
        );

        expect(findFocusedIndex(wrapper)).toBe(0);
        wrapper
            .find('div')
            .first()
            .simulate('keydown', { which: 40 });
        expect(findFocusedIndex(wrapper)).toBe(1);
    });
});
