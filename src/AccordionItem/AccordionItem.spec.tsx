import { mount } from 'enzyme';
import * as React from 'react';
import { Provider as AccordionProvider } from '../AccordionContainer/AccordionContainer';
import { default as AccordionItemBody } from '../AccordionItemBody/AccordionItemBody.wrapper';
import { default as AccordionItemTitle } from '../AccordionItemTitle/AccordionItemTitle.wrapper';
import { resetNextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { default as AccordionItem } from './AccordionItem.wrapper';

describe('AccordionItem', () => {
    beforeEach(() => {
        resetNextUuid();
    });

    it('renders correctly with accordion true', () => {
        const wrapper = mount(
            <AccordionProvider accordion={true}>
                <AccordionItem className="accordion__item">
                    <AccordionItemTitle className="accordion__title">
                        <div>Fake title</div>
                    </AccordionItemTitle>
                    <AccordionItemBody className="accordion__body">
                        <div>Fake body</div>
                    </AccordionItemBody>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with accordion false', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem className="accordion__item">
                    <AccordionItemTitle className="accordion__title">
                        <div>Fake title</div>
                    </AccordionItemTitle>
                    <AccordionItemBody className="accordion__body">
                        <div>Fake body</div>
                    </AccordionItemBody>
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

    it('still renders with no AccordionItemTitle or AccordionItemBody', () => {
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

    it('renders with different hideBodyClassName', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem
                    expanded={false}
                    className="AccordionItem"
                    hideBodyClassName="AccordionItem--hidden"
                />
            </AccordionProvider>,
        );

        expect(wrapper.find('div').prop('className')).toEqual(
            'AccordionItem AccordionItem--hidden',
        );
    });

    it('renders correctly with other blocks inside', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                    <div>Just another block</div>
                    <AccordionItemBody>
                        <div>Fake body</div>
                    </AccordionItemBody>
                </AccordionItem>
            </AccordionProvider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with other blocks inside 2', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <div>Fake body</div>
                    </AccordionItemBody>
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
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper expanded={false} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ expanded: true });

        expect(
            instance.state.items.filter(item => item.expanded === true).length,
        ).toEqual(1);
    });

    it('can dynamically unset expanded prop', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }): JSX.Element => (
            <AccordionProvider>
                <AccordionItem expanded={expanded}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </AccordionProvider>
        );

        const wrapper = mount(<Wrapper expanded={true} />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ expanded: undefined });

        expect(
            instance.state.items.filter(item => item.expanded === true).length,
        ).toEqual(0);
    });

    it('dynamically changing arbitrary props does not affect expanded state', () => {
        const Wrapper = ({ className }: { className: string }): JSX.Element => (
            <AccordionProvider>
                <AccordionItem className={className}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </AccordionProvider>
        );
        const wrapper = mount(<Wrapper className="foo" />);
        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        wrapper.setProps({ className: 'bar' });

        expect(
            instance.state.items.filter(item => item.expanded === true).length,
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

    it('correctly unregisters itself on unmount', () => {
        const Wrapper = ({
            showChild,
        }: {
            showChild: boolean;
        }): JSX.Element => (
            <AccordionProvider>
                {showChild && (
                    <AccordionItem>
                        <AccordionItemTitle>
                            <div>Fake title</div>
                        </AccordionItemTitle>
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
            .map(provider => provider.props().uuid);

        expect(uuids.length).toEqual(2);
        expect(uuids[0]).not.toEqual(uuids[1]);
    });

    it('supports custom uuid', () => {
        const uuid = 'uniqueCustomID';
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItem uuid={uuid}>
                    <AccordionItemTitle>
                        <div data-enzyme={true}>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </AccordionProvider>,
        );

        const instance = wrapper
            .find(AccordionProvider)
            .instance() as AccordionProvider;

        expect(
            instance.state.items.filter(item => item.uuid === uuid).length,
        ).toEqual(1);

        expect(wrapper.find('div[data-enzyme]').length).toEqual(1);
    });
});
