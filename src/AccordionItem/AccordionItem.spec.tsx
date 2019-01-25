import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
    Item,
    Provider as AccordionProvider,
} from '../AccordionContainer/AccordionContainer';
import { default as AccordionItemHeading } from '../AccordionItemHeading/AccordionItemHeading.wrapper';
import { default as AccordionItemPanel } from '../AccordionItemPanel/AccordionItemPanel.wrapper';
import { resetNextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
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
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem
                    expanded={true}
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

    it('can dynamically set expanded prop', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }): JSX.Element => (
            <AccordionProvider>
                <AccordionItem expanded={expanded}>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper expanded={false} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ expanded: true });

        expect(
            instance.state.items.filter((item: Item) => item.expanded === true)
                .length,
        ).toEqual(1);
    });

    it('can dynamically unset expanded prop when there is only one item expanded and allowZeroExpanded is set to true', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }): JSX.Element => (
            <AccordionProvider allowZeroExpanded={true}>
                <AccordionItem expanded={expanded}>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper expanded={true} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ expanded: undefined });

        expect(
            instance.state.items.filter((item: Item) => item.expanded === true)
                .length,
        ).toEqual(0);
    });

    it('can dynamically unset expanded prop when there is more than one item expanded', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }): JSX.Element => (
            <AccordionProvider>
                <AccordionItem expanded={expanded}>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
                <AccordionItem expanded={true}>
                    <AccordionItemHeading>
                        <div>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper expanded={true} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ expanded: undefined });

        expect(
            instance.state.items.filter((item: Item) => item.expanded === true)
                .length,
        ).toEqual(1);
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

        expect(
            instance.state.items.filter((item: Item) => item.expanded === true)
                .length,
        ).toEqual(0);
    });

    it('does not render if its uuid is not registered in accordionContainer', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>Fake Title</AccordionItem>
            </AccordionProvider>,
        );

        wrapper.instance().setState(() => ({
            items: [],
        }));
        wrapper.update();

        expect(
            wrapper.find(AccordionItem).find('div.accordion__item').length,
        ).toEqual(0);
    });

    it('correctly unregisters itself on unmount in an accordion that allows zero items to be expanded', () => {
        const Wrapper = ({
            showChild,
        }: {
            showChild: boolean;
        }): JSX.Element => (
            <AccordionProvider allowZeroExpanded={true}>
                {showChild && (
                    <AccordionItem>
                        <AccordionItemHeading>
                            <div>Fake title</div>
                        </AccordionItemHeading>
                    </AccordionItem>
                )}
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper showChild={true} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        expect(instance.state.items.length).toEqual(1);

        wrapper.setProps({ showChild: false });

        expect(instance.state.items.length).toEqual(0);
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

    it('supports custom uuid', () => {
        const uuid = 'uniqueCustomID';
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem uuid={uuid}>
                    <AccordionItemHeading>
                        <div data-enzyme={true}>Fake title</div>
                    </AccordionItemHeading>
                </AccordionItem>
            </AccordionProvider>,
        );

        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        expect(
            instance.state.items.filter((item: Item) => item.uuid === uuid)
                .length,
        ).toEqual(1);

        expect(wrapper.find('div[data-enzyme]').length).toEqual(1);
    });
});
