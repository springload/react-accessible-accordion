// @flow

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'unstated';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title';
import AccordionItemBody from '../AccordionItemBody/accordion-item-body';
import AccordionItem from './accordion-item-wrapper';
import ItemContainer, { resetNextUuid } from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';

describe('AccordionItem', () => {
    let accordionStore;
    let itemStore;

    beforeEach(() => {
        const itemContainer = new ItemContainer();
        resetNextUuid();
        const accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(false);
        accordionContainer.setOnChange(jest.fn());
        accordionStore = accordionContainer;
        itemStore = itemContainer;
    });

    it('renders correctly with accordion true', () => {
        accordionStore.setAccordion(true);
        const tree = renderer
            .create(
                <Provider inject={[accordionStore, itemStore]}>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle className="accordion__title">
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody className="accordion__body">
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with accordion false', () => {
        accordionStore.setAccordion(false);
        const tree = renderer
            .create(
                <Provider inject={[accordionStore]}>
                    <AccordionItem className="accordion__item">
                        <AccordionItemTitle className="accordion__title">
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody className="accordion__body">
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with multiple AccordionItems', () => {
        const wrapper = mount(
            <Provider inject={[accordionStore]}>
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
            </Provider>,
        );
        expect(wrapper.find(AccordionItem).length).toEqual(2);
    });

    it('still renders with no AccordionItemTitle or AccordionItemBody', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore]}>
                    <AccordionItem>
                        <div>Fake title</div>
                        <div>Fake body</div>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('still renders with no children at all', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore]}>
                    <AccordionItem />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different className', () => {
        const tree = renderer.create(
            <Provider inject={[accordionStore]}>
                <AccordionItem className="testCSSClass" />
            </Provider>,
        );
        expect(tree.root.findByType('div').props.className).toEqual(
            'testCSSClass',
        );
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer.create(
            <Provider inject={[accordionStore]}>
                <AccordionItem
                    expanded={false}
                    className="accordion-item"
                    hideBodyClassName="accordion-item--hidden"
                />
            </Provider>,
        );
        expect(tree.root.findByType('div').props.className).toEqual(
            'accordion-item accordion-item--hidden',
        );
    });

    it('renders correctly with other blocks inside', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore]}>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <div>Just another block</div>
                        <AccordionItemBody>
                            <div>Fake body</div>
                        </AccordionItemBody>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with other blocks inside 2', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore]}>
                    <AccordionItem>
                        <AccordionItemTitle>
                            <div>Fake title</div>
                        </AccordionItemTitle>
                        <AccordionItemBody>
                            <div>Fake body</div>
                        </AccordionItemBody>
                        <div>Just another block</div>
                    </AccordionItem>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('can dynamically set expanded prop', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }) => (
            <Provider inject={[accordionStore]}>
                <AccordionItem expanded={expanded}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );
        const wrapper = mount(<Wrapper expanded={false} />);
        wrapper.setProps({ expanded: true });

        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(1);
    });

    it('can dynamically unset expanded prop', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }) => (
            <Provider inject={[accordionStore]}>
                <AccordionItem expanded={expanded}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );
        const wrapper = mount(<Wrapper expanded={true} />);
        wrapper.setProps({ expanded: undefined });

        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(0);
    });

    it('dynamically changing arbitrary props does not affect expanded state', () => {
        const Wrapper = ({ className }: { className: string }) => (
            <Provider inject={[accordionStore]}>
                <AccordionItem className={className}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );
        const wrapper = mount(<Wrapper className="foo" />);
        wrapper.setProps({ className: 'bar' });

        expect(
            accordionStore.items.filter(item => item.expanded === true).length,
        ).toEqual(0);
    });

    it('does not render if its uuid is not registered in accordionStore', () => {
        // prevent AccordionItem from being able to register itself, for the sake of testing.
        accordionStore.addItem = jest.fn();

        const wrapper = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem>Fake Title</AccordionItem>
            </Provider>,
        );

        expect(
            wrapper.find(AccordionItem).find('div.accordion__item').length,
        ).toEqual(0);
    });

    it('can manually reset the uuid', () => {
        const wrapperOne = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem />
            </Provider>,
        );
        resetNextUuid();
        const wrapperTwo = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem />
            </Provider>,
        );
        expect(
            wrapperOne
                .find(Provider)
                .last()
                .props().uuid,
        ).toEqual(
            wrapperTwo
                .find(Provider)
                .last()
                .props().uuid,
        );
    });

    it('can manually reset the uuid', () => {
        const wrapperOne = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem />
            </Provider>,
        );
        resetNextUuid();
        const wrapperTwo = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem />
            </Provider>,
        );
        expect(
            wrapperOne
                .find(Provider)
                .last()
                .props().uuid,
        ).toEqual(
            wrapperTwo
                .find(Provider)
                .last()
                .props().uuid,
        );
    });

    it('correctly unregisters itself on unmount', () => {
        const wrapper = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>,
        );

        expect(accordionStore.items.length).toEqual(1);

        wrapper.unmount();

        expect(accordionStore.items.length).toEqual(0);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(
            <Provider inject={[accordionStore]}>
                <AccordionItem lang="en" />
            </Provider>,
        );

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });
});
