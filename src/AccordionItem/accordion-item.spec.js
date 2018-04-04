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
    let accordionContainer;
    let itemContainer;

    beforeEach(() => {
        resetNextUuid();
        itemContainer = new ItemContainer();
        accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(false);
        accordionContainer.setOnChange(jest.fn());
    });

    it('renders correctly with accordion true', () => {
        accordionContainer.setAccordion(true);
        const tree = renderer
            .create(
                <Provider inject={[accordionContainer, itemContainer]}>
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
        accordionContainer.setAccordion(false);
        const tree = renderer
            .create(
                <Provider inject={[accordionContainer]}>
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
            <Provider inject={[accordionContainer]}>
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
                <Provider inject={[accordionContainer]}>
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
                <Provider inject={[accordionContainer]}>
                    <AccordionItem />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with different className', () => {
        const tree = renderer.create(
            <Provider inject={[accordionContainer]}>
                <AccordionItem className="testCSSClass" />
            </Provider>,
        );
        expect(tree.root.findByType('div').props.className).toEqual(
            'testCSSClass',
        );
    });

    it('renders with different hideBodyClassName', () => {
        const tree = renderer.create(
            <Provider inject={[accordionContainer]}>
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
                <Provider inject={[accordionContainer]}>
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
                <Provider inject={[accordionContainer]}>
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
            <Provider inject={[accordionContainer]}>
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
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(1);
    });

    it('can dynamically unset expanded prop', () => {
        const Wrapper = ({ expanded }: { expanded: boolean }) => (
            <Provider inject={[accordionContainer]}>
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
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('dynamically changing arbitrary props does not affect expanded state', () => {
        const Wrapper = ({ className }: { className: string }) => (
            <Provider inject={[accordionContainer]}>
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
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('does not render if its uuid is not registered in accordionContainer', () => {
        // prevent AccordionItem from being able to register itself, for the sake of testing.
        // $FlowFixMe
        accordionContainer.addItem = jest.fn();

        const wrapper = mount(
            <Provider inject={[accordionContainer]}>
                <AccordionItem>Fake Title</AccordionItem>
            </Provider>,
        );

        expect(
            wrapper.find(AccordionItem).find('div.accordion__item').length,
        ).toEqual(0);
    });

    it('can manually reset the uuid', () => {
        const wrapperOne = mount(
            <Provider inject={[accordionContainer]}>
                <AccordionItem />
            </Provider>,
        );
        resetNextUuid();
        const wrapperTwo = mount(
            <Provider inject={[accordionContainer]}>
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
            <Provider inject={[accordionContainer]}>
                <AccordionItem />
            </Provider>,
        );
        resetNextUuid();
        const wrapperTwo = mount(
            <Provider inject={[accordionContainer]}>
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
            <Provider inject={[accordionContainer]}>
                <AccordionItem>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>,
        );

        expect(accordionContainer.state.items.length).toEqual(1);

        wrapper.unmount();

        expect(accordionContainer.state.items.length).toEqual(0);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(
            <Provider inject={[accordionContainer]}>
                <AccordionItem lang="en" />
            </Provider>,
        );

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });
});
