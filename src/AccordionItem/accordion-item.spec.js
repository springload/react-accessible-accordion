// @flow

import React from 'react';
import { Provider } from 'unstated';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title-wrapper';
import AccordionItemBody from '../AccordionItemBody/accordion-item-body-wrapper';
import AccordionItem from './accordion-item-wrapper';
import { resetNextUuid } from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import { setStateComplete, mountComplete } from '../unstated-test-helpers';

describe('AccordionItem', () => {
    let accordionContainer;

    beforeEach(() => {
        resetNextUuid();
        accordionContainer = new AccordionContainer({
            accordion: true,
        });
    });

    it('renders correctly with accordion true', async () => {
        await accordionContainer.setAccordion(true);

        const wrapper = await mountComplete(
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
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with accordion false', async () => {
        await accordionContainer.setAccordion(false);
        const wrapper = await mountComplete(
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
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with multiple AccordionItems', async () => {
        const wrapper = await mountComplete(
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

    it('still renders with no AccordionItemTitle or AccordionItemBody', async () => {
        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem>
                    <div>Fake title</div>
                    <div>Fake body</div>
                </AccordionItem>
            </Provider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('still renders with no children at all', async () => {
        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem />
            </Provider>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders with different className', async () => {
        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem className="testCSSClass" />
            </Provider>,
        );

        expect(wrapper.find('div').prop('className')).toBe('testCSSClass');
    });

    it('renders with different hideBodyClassName', async () => {
        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem
                    expanded={false}
                    className="accordion-item"
                    hideBodyClassName="accordion-item--hidden"
                />
            </Provider>,
        );

        expect(wrapper.find('div').prop('className')).toEqual(
            'accordion-item accordion-item--hidden',
        );
    });

    it('renders correctly with other blocks inside', async () => {
        await accordionContainer.setAccordion(false);
        const wrapper = await mountComplete(
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
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with other blocks inside 2', async () => {
        await accordionContainer.setAccordion(false);
        const wrapper = await mountComplete(
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
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('can dynamically set expanded prop', async () => {
        const Wrapper = ({ expanded }: { expanded: boolean }) => (
            <Provider inject={[accordionContainer]}>
                <AccordionItem expanded={expanded}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );

        const wrapper = await mountComplete(<Wrapper expanded={false} />);

        wrapper.setProps({ expanded: true });

        await setStateComplete(wrapper);

        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(1);
    });

    it('can dynamically unset expanded prop', async () => {
        const Wrapper = ({ expanded }: { expanded: boolean }) => (
            <Provider inject={[accordionContainer]}>
                <AccordionItem expanded={expanded}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );
        const wrapper = await mountComplete(<Wrapper expanded={true} />);
        wrapper.setProps({ expanded: undefined });

        await setStateComplete(wrapper);

        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('dynamically changing arbitrary props does not affect expanded state', async () => {
        const Wrapper = ({ className }: { className: string }) => (
            <Provider inject={[accordionContainer]}>
                <AccordionItem className={className}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>
        );
        const wrapper = await mountComplete(<Wrapper className="foo" />);
        wrapper.setProps({ className: 'bar' });

        await setStateComplete(wrapper);

        expect(
            accordionContainer.state.items.filter(
                item => item.expanded === true,
            ).length,
        ).toEqual(0);
    });

    it('does not render if its uuid is not registered in accordionContainer', async () => {
        // prevent AccordionItem from being able to register itself, for the sake of testing.
        // $FlowFixMe
        accordionContainer.addItem = jest.fn();

        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem>Fake Title</AccordionItem>
            </Provider>,
        );

        expect(
            wrapper.find(AccordionItem).find('div.accordion__item').length,
        ).toEqual(0);
    });

    it('can manually reset the uuid', async () => {
        const wrapperOne = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem />
            </Provider>,
        );
        resetNextUuid();

        // Needed to avoid duplicate uuid error
        accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(false);
        accordionContainer.setOnChange(jest.fn());

        const wrapperTwo = await mountComplete(
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

    it('correctly unregisters itself on unmount', async () => {
        const wrapper = await mountComplete(
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

        await setStateComplete(wrapper);

        expect(accordionContainer.state.items.length).toEqual(0);
    });

    it('respects arbitrary user-defined props', async () => {
        const wrapper = await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem lang="en" />
            </Provider>,
        );

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    it('supports custom uuid', async () => {
        const uuid = 'uniqueCustomID';
        await mountComplete(
            <Provider inject={[accordionContainer]}>
                <AccordionItem uuid={uuid}>
                    <AccordionItemTitle>
                        <div>Fake title</div>
                    </AccordionItemTitle>
                </AccordionItem>
            </Provider>,
        );

        expect(
            accordionContainer.state.items.filter(item => item.uuid === uuid)
                .length,
        ).toEqual(1);
    });
});
