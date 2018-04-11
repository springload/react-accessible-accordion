// @flow

import React from 'react';
import { mount } from 'enzyme';
import Accordion from './accordion-wrapper'; // eslint-disable-line
import AccordionItem from '../AccordionItem/accordion-item-wrapper';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title-wrapper';

describe('Accordion', () => {
    it('renders correctly with min params', () => {
        const tree = mount(<Accordion />);
        expect(tree.find('div').props().role).toEqual('tablist');
    });

    it('renders correctly with accordion false', () => {
        const tree = mount(<Accordion accordion={false} />);
        expect(tree.find('div').props().role).toEqual(null);
    });

    it('different className', () => {
        const tree = mount(<Accordion className="testCSSClass" />);
        expect(tree.find('div').props().className).toEqual('testCSSClass');
    });

    describe('<Accordion accordion="true" />', () => {
        const wrapper = mount(
            <Accordion accordion={true}>
                <AccordionItem>
                    <AccordionItemTitle className="foo">
                        Foo Title
                    </AccordionItemTitle>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemTitle className="bar">
                        Foo Title
                    </AccordionItemTitle>
                </AccordionItem>
            </Accordion>,
        );
        const fooTitle = wrapper.find('div.foo').first();
        const barTitle = wrapper.find('div.bar').first();

        it('expands a collapsed item when its title is clicked', () => {
            fooTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it('expands a collapsed item when its title is clicked, and closes the others', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it('collapses an expanded item when its title is clicked', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(0);
        });
    });

    describe('<Accordion accordion="false" />', () => {
        const wrapper = mount(
            <Accordion accordion={false}>
                <AccordionItem>
                    <AccordionItemTitle className="foo">
                        Foo Title
                    </AccordionItemTitle>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemTitle className="bar">
                        Foo Title
                    </AccordionItemTitle>
                </AccordionItem>
            </Accordion>,
        );
        const fooTitle = wrapper.find('div.foo').first();
        const barTitle = wrapper.find('div.bar').first();

        it('expands a collapsed item when its title is clicked', () => {
            fooTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it("expands a collapsed item when its title is clicked, and doesn't close the others", () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(2);
        });

        it('collapses an expanded item when its title is clicked', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });
    });

    it('does not expanded disabled items on click', () => {
        const wrapper = mount(
            <Accordion accordion={false}>
                <AccordionItem disabled>
                    <AccordionItemTitle className="foo" disabled>
                        Foo Title
                    </AccordionItemTitle>
                </AccordionItem>
            </Accordion>,
        );
        wrapper
            .find('.foo')
            .first()
            .simulate('click');
        expect(
            wrapper
                .instance()
                .accordionStore.state.items.filter(
                    item => item.expanded === true,
                ).length,
        ).toEqual(0);
    });

    it('pre expanded accordion', () => {
        const wrapper = mount(
            <Accordion>
                <AccordionItem expanded={true}>Fake Child</AccordionItem>
                <AccordionItem>Fake Child</AccordionItem>
            </Accordion>,
        );

        expect(
            wrapper
                .instance()
                .accordionStore.state.items.filter(
                    item => item.expanded === true,
                ).length,
        ).toEqual(1);
    });

    it('works with multiple pre expanded accordion. Extra expands are just ignored.', () => {
        const hideBodyClassName = 'HIDE';
        const wrapper = mount(
            <Accordion accordion={true}>
                <AccordionItem
                    expanded={true}
                    hideBodyClassName={hideBodyClassName}
                >
                    Fake Child
                </AccordionItem>
                <AccordionItem
                    expanded={true}
                    hideBodyClassName={hideBodyClassName}
                >
                    Fake Child
                </AccordionItem>
            </Accordion>,
        );

        expect(
            wrapper
                .instance()
                .accordionStore.state.items.filter(item => item.expanded)
                .length,
        ).toEqual(1);
        expect(
            wrapper.findWhere(item => item.hasClass(hideBodyClassName)).length,
        ).toEqual(1);
    });

    it('pre expanded accordion when accordion is false', () => {
        const wrapper = mount(
            <Accordion accordion={false}>
                <AccordionItem expanded={true}>Fake Child</AccordionItem>
                <AccordionItem expanded={true}>Fake Child</AccordionItem>
            </Accordion>,
        );

        expect(
            wrapper
                .instance()
                .accordionStore.state.items.filter(
                    item => item.expanded === true,
                ).length,
        ).toEqual(2);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(<Accordion lang="en" />);

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });
});
