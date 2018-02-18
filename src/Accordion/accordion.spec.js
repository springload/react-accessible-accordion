// @flow

import React from 'react';
import { mount } from 'enzyme';
// import renderer from 'react-test-renderer';

import Accordion from './accordion';
import AccordionItem from '../AccordionItem/accordion-item';
import AccordionItemTitle from '../AccordionItemTitle/accordion-item-title';
// import AccordionItemBody from '../AccordionItemBody/accordion-item-body';

describe('Accordion', () => {
    //
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
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
            ).toEqual(1);
        });

        it('expands a collapsed item when its title is clicked, and closes the others', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
            ).toEqual(1);
        });

        it('collapses an expanded item when its title is clicked', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
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
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
            ).toEqual(1);
        });

        it("expands a collapsed item when its title is clicked, and doesn't close the others", () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
            ).toEqual(2);
        });

        it('collapses an expanded item when its title is clicked', () => {
            barTitle.simulate('click');
            expect(
                wrapper
                    .instance()
                    .accordionStore.items.filter(item => item.expanded === true)
                    .length,
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
                .accordionStore.items.filter(item => item.expanded === true)
                .length,
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
                .accordionStore.items.filter(item => item.expanded === true)
                .length,
        ).toEqual(1);
    });

    // Needs more work:
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
                .accordionStore.items.filter(item => item.expanded).length,
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
                .accordionStore.items.filter(item => item.expanded === true)
                .length,
        ).toEqual(2);
    });

    // Needs more work:
    // it('pre expand accordion via accordion props', () => {
    //     const tree = renderer
    //         .create(
    //             <Accordion activeItems={[0]}>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //             </Accordion>,
    //         )
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    // it('pre expand accordion via accordion props vs accordion item props. Expanded only second item.', () => {
    //     const tree = renderer
    //         .create(
    //             <Accordion activeItems={[0]}>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //                 <AccordionItem expanded={true}>Fake Child</AccordionItem>
    //             </Accordion>,
    //         )
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    // it('pre expand multiple accordions via accordion props', () => {
    //     const tree = renderer
    //         .create(
    //             <Accordion accordion={false} activeItems={[0, 2]}>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //                 <AccordionItem>Fake Child</AccordionItem>
    //             </Accordion>,
    //         )
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    it('pre expand accordion via accordion props with custom key', () => {
        const className = 'className';
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mount(
            <Accordion activeItems={['custom-one']}>
                <AccordionItem
                    className={className}
                    itemkey="custom-one"
                    hideBodyClassName={hideBodyClassName}
                />
                <AccordionItem
                    className={className}
                    itemkey="custom-two"
                    hideBodyClassName={hideBodyClassName}
                />
            </Accordion>,
        );
        const items = wrapper.findWhere(item => item.hasClass(className));
        expect(items.first().hasClass(hideBodyClassName)).toEqual(false);
        expect(items.last().hasClass(hideBodyClassName)).toEqual(true);
    });

    // it('expand accordion via accordion props dynamicly', () => {
    //     const wrapper = renderer.create(
    //         <Accordion activeItems={[0]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion activeItems={[1]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper.getInstance().state.activeItems).toEqual([1]);
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it('expand multiple accordions via accordion props props dynamicly', () => {
    //     const wrapper = renderer.create(
    //         <Accordion accordion={false} activeItems={[0, 2]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion accordion={false} activeItems={[1, 2]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper.getInstance().state.activeItems).toEqual([1, 2]);
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it(`expand multiple accordions via accordion props props dynamicly with default
    //     expanded on accordion items`, () => {
    //     const wrapper = renderer.create(
    //         <Accordion accordion={false}>
    //             <AccordionItem expanded={true}>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion accordion={false} activeItems={[1, 2]}>
    //             <AccordionItem expanded={true}>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper.getInstance().state.activeItems).toEqual([1, 2]);
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it('close accordions via accordion props props dynamicly', () => {
    //     const wrapper = renderer.create(
    //         <Accordion activeItems={[1]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion activeItems={[]}>
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper.getInstance().state.activeItems).toEqual([]);
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it('different className with the same activeItems prop', () => {
    //     const wrapper = renderer.create(
    //         <Accordion activeItems={[1]} className="test-1">
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion activeItems={[1]} className="test-2">
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it('different className with the same activeItems prop', () => {
    //     const wrapper = renderer.create(
    //         <Accordion activeItems={[1]} className="test-1">
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     wrapper.update(
    //         <Accordion activeItems={[1]} className="test-2">
    //             <AccordionItem>Fake Child</AccordionItem>
    //             <AccordionItem>Fake Child</AccordionItem>
    //         </Accordion>,
    //     );
    //     expect(wrapper).toMatchSnapshot();
    // });

    // it('supports controlled component inside accordion', () => {
    //     class App extends Component<*, { value: string }> {
    //         constructor(props) {
    //             super(props);

    //             this.state = {
    //                 value: '',
    //             };
    //         }

    //         handleChange = evt => {
    //             this.setState({
    //                 value: evt.target.value,
    //             });
    //         };

    //         render() {
    //             return (
    //                 <Accordion activeItems={[1]} id="accordion">
    //                     <AccordionItem id="accordion-item--1">
    //                         <AccordionItemTitle>
    //                             {`Title One`}
    //                         </AccordionItemTitle>
    //                         <AccordionItemBody>
    //                             <input
    //                                 id="controlled-input--1"
    //                                 onChange={this.handleChange}
    //                                 value={this.state.value}
    //                             />
    //                         </AccordionItemBody>
    //                     </AccordionItem>
    //                     <AccordionItem>
    //                         <AccordionItemTitle>
    //                             {`Title Two`}
    //                         </AccordionItemTitle>
    //                         <AccordionItemBody>
    //                             {`Body Two`}
    //                         </AccordionItemBody>
    //                     </AccordionItem>
    //                 </Accordion>
    //             );
    //         }
    //     }
    //     const wrapper = mount(<App />);
    //     const accordion = wrapper.find(Accordion);
    //     const input = wrapper.find('#controlled-input--1');
    //     const itemOne = wrapper.find('#accordion-item--1');

    //     expect(accordion.instance().state.activeItems).toEqual([1]);
    //     itemOne.simulate('click');
    //     expect(accordion.instance().state.activeItems).toEqual([0]);
    //     input.simulate('change', { value: 'foo' });
    //     expect(accordion.instance().state.activeItems).toEqual([0]);
    // });
});
