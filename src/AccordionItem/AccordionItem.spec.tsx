import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider as AccordionProvider } from '../AccordionContext/AccordionContext';
import { default as AccordionItemHeading } from '../AccordionItemHeading/AccordionItemHeading.wrapper';
import { default as AccordionItemPanel } from '../AccordionItemPanel/AccordionItemPanel.wrapper';
import { resetNextUuid } from '../helpers/uuid';
import { Provider as ItemProvider, UUID } from '../ItemContext/ItemContext';
import { default as AccordionItem } from './AccordionItem.wrapper';

describe('AccordionItem', () => {
    beforeEach(() => {
        resetNextUuid();
    });

    it('renders null outside the context of an accordion', () => {
        const wrapper = mount(<AccordionItem />);
        expect(wrapper.html()).toBeNull();
    });

    it('renders correctly with allowMultipleExpanded false', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem className="accordion__item">
                    <AccordionItemHeading className="accordion__heading">
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion__panel">
                        <div>Fake body</div>
                    </AccordionItemPanel>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with allowMultipleExpanded true', () => {
        const wrapper = mount(
            <AccordionProvider allowMultipleExpanded={true}>
                <AccordionItem className="accordion__item">
                    <AccordionItemHeading className="accordion__heading">
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion__panel">
                        <div>Fake body</div>
                    </AccordionItemPanel>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with allowZeroExpanded false', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem className="accordion__item">
                    <AccordionItemHeading className="accordion__heading">
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion__panel">
                        <div>Fake body</div>
                    </AccordionItemPanel>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with allowZeroExpanded true', () => {
        const wrapper = mount(
            <AccordionProvider allowZeroExpanded={true}>
                <AccordionItem className="accordion__item">
                    <AccordionItemHeading className="accordion__heading">
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="accordion__panel">
                        <div>Fake body</div>
                    </AccordionItemPanel>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with multiple AccordionItems', () => {
        const wrapper = mount(
            <AccordionProvider>
                <div>
                    <AccordionItem>
                        <div>Fake title</div>
                        <div>Fake body</div>
                    </AccordionItem>
                    <AccordionItem>
                        <div>Fake title</div>
                        <div>Fake body</div>
                    </AccordionItem>
                </div>
            </AccordionProvider>,
        );

        expect(wrapper.find(AccordionItem).length).toEqual(2);
    });

    it('still renders with no AccordionItemHeading or AccordionItemPanel', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>
                    <div>Fake title</div>
                    <div>Fake body</div>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('still renders with no children at all', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem />
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with different className', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem className="testCSSClass" />
            </AccordionProvider>,
        );

        expect(wrapper.find('div').prop('className')).toBe('testCSSClass');
    });

    it('renders with different expandedClassName', () => {
        const uuid = 'foo';
        const wrapper = mount(
            <AccordionProvider preExpanded={[uuid]}>
                <AccordionItem
                    uuid={uuid}
                    className="AccordionItem"
                    expandedClassName="AccordionItem--expanded"
                />
            </AccordionProvider>,
        );

        expect(wrapper.find('div').prop('className')).toEqual(
            'AccordionItem AccordionItem--expanded',
        );
    });

    it('renders correctly with other blocks inside', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <div>Just another block</div>
                    <AccordionItemPanel>
                        <div>Fake body</div>
                    </AccordionItemPanel>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with other blocks inside 2', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div>Fake body</div>
                    </AccordionItemPanel>
                    <div>Just another block</div>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('dynamically changing arbitrary props does not affect expanded state', () => {
        const Wrapper = ({ className }: { className: string }): JSX.Element => (
            <AccordionProvider>
                <AccordionItem className={className}>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
            </AccordionProvider>
        );
        const wrapper = mount(<Wrapper className="foo" />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ className: 'bar' });

        expect(instance.state.expanded.length).toEqual(0);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem lang="en" />
            </AccordionProvider>,
        );

        const div = wrapper.find('div').getDOMNode();

        expect(div.getAttribute('lang')).toEqual('en');
    });

    it('generates unique uuids', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem />
                <AccordionItem />
            </AccordionProvider>,
        );

        const uuids = wrapper
            .find(ItemProvider)
            .map((provider: ReactWrapper) => provider.prop('uuid'));

        expect(uuids.length).toEqual(2);
        expect(uuids[0]).not.toEqual(uuids[1]);
    });
});
