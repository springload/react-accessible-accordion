import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
    Item,
    Provider as AccordionProvider,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { default as AccordionItemTitle } from './AccordionItemTitle.wrapper';

describe('AccordionItemTitle', () => {
    const DEFAULT_ITEM: Item = {
        uuid: 0,
        expanded: false,
        disabled: false,
    };

    function mountItem(
        node: React.ReactNode,
        item: Item = DEFAULT_ITEM,
    ): ReactWrapper {
        return mount(
            <AccordionProvider accordion={false} items={[item]}>
                <ItemProvider uuid={item.uuid}>{node}</ItemProvider>
            </AccordionProvider>,
        );
    }

    function isExpanded(wrapper: ReactWrapper, uuid: string | number): boolean {
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        return !!instance.state.items.find((item: Item) => item.uuid === uuid)
            .expanded;
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

        const div = wrapper.find('div').getDOMNode();

        expect(div.getAttribute('lang')).toEqual('en');
    });

    // edge case to cover branch
    it('doesn’t toggle state when clicking but disabled & accordion === true', async () => {
        const wrapper = mount(
            <AccordionProvider
                accordion={true}
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
});
