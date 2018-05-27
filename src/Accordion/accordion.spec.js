// @flow

import React from 'react';
import { mount } from 'enzyme';
import Accordion from './accordion-wrapper'; // eslint-disable-line
import AccordionItem from '../AccordionItem/accordion-item-wrapper';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title-wrapper';
import { Container } from 'unstated';

describe('Accordion', () => {
    let setStateSpy;

    beforeEach(() => {
        setStateSpy = jest.spyOn(Container.prototype, 'setState');
    });

    function completeSetStateChanges() {
        return Promise.all(setStateSpy.mock.results);
    }

    async function mountComplete(node) {
        const mounted = mount(node);

        await completeSetStateChanges();

        mounted.update();

        return mounted;
    }

    it('renders correctly with min params', async () => {
        const tree = await mountComplete(<Accordion />);
        expect(tree.find('div').props().role).toEqual('tablist');
    });

    it('renders correctly with accordion false', async () => {
        const tree = await mountComplete(<Accordion accordion={false} />);
        expect(tree.find('div').props().role).toEqual(null);
    });

    it('different className', async () => {
        const tree = await mountComplete(
            <Accordion className="testCSSClass" />,
        );
        expect(tree.find('div').props().className).toEqual('testCSSClass');
    });

    describe('<Accordion accordion="true" />', () => {
        let wrapper;
        let fooTitle;
        let barTitle;

        beforeEach(async () => {
            wrapper = await mountComplete(
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
            fooTitle = wrapper.find('div.foo').first();
            barTitle = wrapper.find('div.bar').first();
        });

        it('expands a collapsed item when its title is clicked', async () => {
            fooTitle.simulate('click');
            await completeSetStateChanges();
            wrapper.update();
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it('expands a collapsed item when its title is clicked, and closes the others', async () => {
            barTitle.simulate('click');
            await completeSetStateChanges();
            wrapper.update();
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it('collapses an expanded item when its title is clicked', async () => {
            fooTitle.simulate('click'); // open
            await completeSetStateChanges();
            fooTitle.simulate('click'); // close
            await completeSetStateChanges();
            wrapper.update();
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
        let wrapper;
        let fooTitle;
        let barTitle;

        beforeEach(async () => {
            wrapper = await mountComplete(
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
            fooTitle = wrapper.find('div.foo').first();
            barTitle = wrapper.find('div.bar').first();
        });

        it('expands a collapsed item when its title is clicked', async () => {
            fooTitle.simulate('click');
            await completeSetStateChanges();
            wrapper.update();
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(1);
        });

        it("expands a collapsed item when its title is clicked, and doesn't close the others", async () => {
            fooTitle.simulate('click');
            barTitle.simulate('click');
            await completeSetStateChanges();
            wrapper.update();
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(2);
        });

        it('collapses an expanded item when its title is clicked', async () => {
            fooTitle.simulate('click'); // open
            await completeSetStateChanges();
            fooTitle.simulate('click'); // close
            await completeSetStateChanges();
            wrapper.update();
            expect(
                wrapper
                    .instance()
                    .accordionStore.state.items.filter(
                        item => item.expanded === true,
                    ).length,
            ).toEqual(0);
        });
    });

    it('does not expanded disabled items on click', async () => {
        const wrapper = await mountComplete(
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

    it('pre expanded accordion', async () => {
        const wrapper = await mountComplete(
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

    it('works with multiple pre expanded accordion. Extra expands are just ignored.', async () => {
        const hideBodyClassName = 'HIDE';
        const wrapper = await mountComplete(
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

    it('pre expanded accordion when accordion is false', async () => {
        const wrapper = await mountComplete(
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

    it('respects arbitrary user-defined props', async () => {
        const wrapper = await mountComplete(<Accordion lang="en" />);

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    it('renders correctly after update', async () => {
        const tree = await mountComplete(<Accordion accordion={false} />);
        expect(tree.find('div').props().role).toEqual(null);

        tree.setProps({ accordion: true });
        await completeSetStateChanges();
        tree.update();
        expect(tree.find('div').props().role).toEqual('tablist');
    });
});
