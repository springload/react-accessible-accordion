import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider as AccordionProvider } from '../AccordionContext/AccordionContext';
import { Provider as ItemProvider, UUID } from '../ItemContext/ItemContext';
import { default as AccordionItemHeading } from './AccordionItemHeading.wrapper';

describe('AccordionItemHeading', () => {
    enum UUIDS {
        FOO,
        BAR,
    }

    it('renders null outside the context of an ‘Accordion’', () => {
        const wrapper = mount(
            <ItemProvider uuid={UUIDS.FOO}>
                <AccordionItemHeading />
            </ItemProvider>,
        );

        expect(wrapper.html()).toBeNull();
    });

    it('renders null outside the context of an ‘AccordionItem’', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItemHeading />
            </AccordionProvider>,
        );

        expect(wrapper.html()).toBeNull();
    });

    function mountItem(
        node: JSX.Element,
        uuid: UUID = UUIDS.FOO,
        expanded: boolean = false,
    ): ReactWrapper {
        const preExpanded = expanded ? [uuid] : undefined;

        return mount(
            <AccordionProvider
                allowMultipleExpanded={true}
                preExpanded={preExpanded}
            >
                <ItemProvider uuid={uuid}>{node}</ItemProvider>
            </AccordionProvider>,
        );
    }

    function isExpanded(wrapper: ReactWrapper, uuid: UUID): boolean {
        const instance = wrapper.find(AccordionProvider).instance();

        if (instance instanceof AccordionProvider) {
            return instance.state.isItemExpanded(uuid);
        }
        throw new Error('could not find instance of AccordionProvider');
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
            <AccordionProvider preExpanded={[UUIDS.FOO]}>
                <ItemProvider uuid={UUIDS.FOO}>
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
            UUIDS.FOO,
        );

        expect(isExpanded(wrapper, UUIDS.FOO)).toBeFalsy();
        wrapper.find('div').simulate('click');
        expect(isExpanded(wrapper, UUIDS.FOO)).toBeTruthy();
    });

    it('toggles state when pressing enter', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
            UUIDS.FOO,
        );

        expect(isExpanded(wrapper, UUIDS.FOO)).toBeFalsy();
        wrapper.find('div').simulate('keyDown', { which: 13 });
        expect(isExpanded(wrapper, UUIDS.FOO)).toBeTruthy();
    });

    it('toggles state when pressing space', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
            UUIDS.FOO,
        );

        expect(isExpanded(wrapper, UUIDS.FOO)).toBeFalsy();
        wrapper.find('div').simulate('keyDown', { which: 32 });
        expect(isExpanded(wrapper, UUIDS.FOO)).toBeTruthy();
    });

    it('doesn’t toggle state when pressing another key', async () => {
        const wrapper = mountItem(
            <AccordionItemHeading>Fake Title</AccordionItemHeading>,
            UUIDS.FOO,
        );

        expect(isExpanded(wrapper, UUIDS.FOO)).toBeFalsy();
        wrapper.find('div').simulate('keyDown', { which: 8 });
        expect(isExpanded(wrapper, UUIDS.FOO)).toBeFalsy();
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mountItem(
            <AccordionItemHeading lang="en">Fake Title</AccordionItemHeading>,
        );

        const div = wrapper.find('div').getDOMNode();

        expect(div.getAttribute('lang')).toEqual('en');
    });
});
