import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
    Item,
    Provider as AccordionProvider,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { default as AccordionItemHeading } from './AccordionItemHeading.wrapper';

describe('AccordionItemHeading', () => {
    const DEFAULT_ITEM: Item = {
        uuid: 0,
        expanded: false,
    };

    it('renders null outside the context of an ‘Accordion’', () => {
        const wrapper = mount(
            <ItemProvider uuid="foo">
                <AccordionItemHeading />
            </ItemProvider>,
        );

        expect(wrapper.html()).toBeNull();
    });

    it('renders null outside the context of an ‘AccordionItem’', () => {
        const wrapper = mount(
            <AccordionProvider items={[DEFAULT_ITEM]}>
                <AccordionItemHeading />
            </AccordionProvider>,
        );

        expect(wrapper.html()).toBeNull();
    });

    function mountItem(
        node: React.ReactNode,
        item: Item = DEFAULT_ITEM,
    ): ReactWrapper {
        return mount(
            <AccordionProvider allowMultipleExpanded={true} items={[item]}>
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
            <AccordionItemHeading>
                <div>Fake Title</div>
            </AccordionItemHeading>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mountItem(
            <AccordionItemHeading className={className} />,
        );
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders with different expandedClassName when item is expanded', () => {
        const expandedClassName = 'expandedClassName';

        const wrapper = mount(
            <AccordionProvider items={[{ uuid: 0, expanded: true }]}>
                <ItemProvider uuid={0}>
                    <AccordionItemHeading
                        expandedClassName={expandedClassName}
                    />
                </ItemProvider>
            </AccordionProvider>,
        );
        expect(wrapper.find('div').hasClass(expandedClassName)).toEqual(true);
    });

    it('toggles state when clicked', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('click');
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('toggles state when pressing enter', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 13 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('toggles state when pressing space', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 32 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeTruthy();
    });

    it('doesn’t toggle state when pressing another key', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
        );

        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
        wrapper.find('div').simulate('keypress', { charCode: 35 });
        expect(isExpanded(wrapper, DEFAULT_ITEM.uuid)).toBeFalsy();
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mountItem(
            <AccordionItemHeading lang="en">Fake Title</AccordionItemHeading>,
        );

        const div = wrapper.find('div').getDOMNode();

        expect(div.getAttribute('lang')).toEqual('en');
    });
});
