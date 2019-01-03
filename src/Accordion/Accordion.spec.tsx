import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from '../AccordionContainer/AccordionContainer';
import AccordionItem from '../AccordionItem/AccordionItem.wrapper';
import AccordionItemTitle from '../AccordionItemTitle/AccordionItemTitle.wrapper';
import Accordion from './Accordion.wrapper';

describe('Accordion', () => {
    it('renders correctly with min params', () => {
        const wrapper = mount(<Accordion />);
        expect(wrapper.find('div').props().role).toEqual('tablist');
    });

    it('renders correctly with accordion false', () => {
        const wrapper = mount(<Accordion accordion={false} />);
        expect(wrapper.find('div').props().role).toEqual(null);
    });

    it('different className', () => {
        const wrapper = mount(<Accordion className="testCSSClass" />);
        expect(wrapper.find('div').props().className).toEqual('testCSSClass');
    });

    describe('<Accordion accordion="true" />', () => {
        let wrapper;
        let fooTitle;
        let barTitle;

        beforeEach(() => {
            wrapper = mount(
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

        it('expands a collapsed item when its title is clicked', () => {
            fooTitle.simulate('click');

            expect(
                wrapper
                    .find(Provider)
                    .instance()
                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(1);
        });

        it('expands a collapsed item when its title is clicked, and closes the others', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .find(Provider)
                    .instance()
                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(1);
        });

        it('collapses an expanded item when its title is clicked', () => {
            fooTitle.simulate('click'); // open
            fooTitle.simulate('click'); // close
            expect(
                wrapper
                    .find(Provider)
                    .instance()
                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(0);
        });
    });

    describe('<Accordion accordion="false" />', () => {
        let wrapper;
        let fooTitle;
        let barTitle;

        beforeEach(() => {
            wrapper = mount(
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

        it('expands a collapsed item when its title is clicked', () => {
            fooTitle.simulate('click');
            expect(
                wrapper
                    .find(Provider)
                    .instance()

                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(1);
        });

        it("expands a collapsed item when its title is clicked, and doesn't close the others", () => {
            fooTitle.simulate('click');
            barTitle.simulate('click');
            expect(
                wrapper
                    .find(Provider)
                    .instance()
                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(2);
        });

        it('collapses an expanded item when its title is clicked', () => {
            fooTitle.simulate('click'); // open
            fooTitle.simulate('click'); // close
            expect(
                wrapper
                    .find(Provider)
                    .instance()
                    .state.items.filter(item => item.expanded === true).length,
            ).toEqual(0);
        });
    });

    it('does not expanded disabled items on click', () => {
        const wrapper = mount(
            <Accordion accordion={false}>
                <AccordionItem disabled={true}>
                    <AccordionItemTitle className="foo">
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
                .find(Provider)
                .instance()
                .state.items.filter(item => item.expanded === true).length,
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
                .find(Provider)
                .instance()
                .state.items.filter(item => item.expanded === true).length,
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
                .find(Provider)
                .instance()
                .state.items.filter(item => item.expanded).length,
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
                .find(Provider)
                .instance()
                .state.items.filter(item => item.expanded === true).length,
        ).toEqual(2);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mount(<Accordion lang="en" />);

        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    it('renders correctly after update', () => {
        const wrapper = mount(<Accordion accordion={false} />);
        expect(wrapper.find('div').props().role).toEqual(null);

        wrapper.setProps({ accordion: true });
        expect(wrapper.find('div').props().role).toEqual('tablist');
    });
});
