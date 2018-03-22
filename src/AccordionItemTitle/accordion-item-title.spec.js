// @flow

import React from 'react';
import renderer from 'react-test-renderer';
// import { mount } from 'enzyme';
import { Provider } from 'unstated';
import AccordionItemTitle from './accordion-item-title';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';

describe('AccordionItemTitle', () => {
    let accordionStore;
    let itemStore;
    // let onChange;

    beforeEach(() => {
        // onChange = jest.fn();

        const itemContainer = new ItemContainer();
        itemContainer.resetNextUuid();
        const accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(false);
        accordionContainer.setOnChange(jest.fn());
        accordionStore = accordionContainer;
        itemStore = itemContainer;

        accordionStore.addItem({
            uuid: 'item-one-uuid',
            expanded: false,
            disabled: false,
        });
        accordionStore.addItem({
            uuid: 'item-two-uuid',
            expanded: true,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore, itemStore]}>
                    <AccordionItemTitle>
                        <div>Fake Title</div>
                    </AccordionItemTitle>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('renders correctly with different className', () => {
    //     const className = 'className';
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             className={className}
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //         />,
    //     );
    //     expect(wrapper.find('div').hasClass(className)).toEqual(true);
    // });

    // it('renders with different hideBodyClassName', () => {
    //     const hideBodyClassName = 'hideBodyClassName';
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             hideBodyClassName={hideBodyClassName}
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //         />,
    //     );
    //     expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    // });

    // it("doesn't present hideBodyClassName when collapsed", () => {
    //     const hideBodyClassName = 'hideBodyClassName';
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             hideBodyClassName={hideBodyClassName}
    //             accordionStore={accordionStore}
    //             uuid="item-two-uuid"
    //         />,
    //     );
    //     expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(false);
    // });

    // it('renders correctly when pressing enter', async () => {
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //         >
    //             Fake Title
    //         </AccordionItemTitle>,
    //     );

    //     wrapper.find('div').simulate('keypress', { charCode: 13 });

    //     expect(onChange.mock.calls.length).toEqual(1);
    //     expect(
    //         accordionStore.items.filter(item => item.expanded === true).length,
    //     ).toEqual(2);
    // });

    // it('renders correctly when pressing space', async () => {
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //         >
    //             Fake Title
    //         </AccordionItemTitle>,
    //     );

    //     wrapper.find('div').simulate('keypress', { charCode: 32 });

    //     expect(onChange.mock.calls.length).toEqual(1);
    //     expect(
    //         accordionStore.items.filter(item => item.expanded === true).length,
    //     ).toEqual(2);
    // });

    // it('renders correctly when pressing another key', async () => {
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //         >
    //             Fake Title
    //         </AccordionItemTitle>,
    //     );

    //     wrapper.find('div').simulate('keypress', { charCode: 35 });

    //     expect(onChange.mock.calls.length).toEqual(0);
    //     expect(
    //         accordionStore.items.filter(item => item.expanded === true).length,
    //     ).toEqual(1);
    // });

    // it('renders null if an associated AccordionItem is not registered in accordionStore', () => {
    //     const className = 'className';
    //     const wrapper = mount(
    //         <Provider accordionStore={accordionStore} uuid="foo">
    //             <AccordionItemTitle className={className}>
    //                 <div>Fake body</div>
    //             </AccordionItemTitle>
    //         </Provider>,
    //     );

    //     expect(
    //         wrapper.findWhere(item => item.className === className).length,
    //     ).toEqual(0);
    // });

    // it('respects arbitrary user-defined props', () => {
    //     const wrapper = mount(
    //         <AccordionItemTitle
    //             accordionStore={accordionStore}
    //             uuid="item-one-uuid"
    //             lang="en"
    //         >
    //             Fake Title
    //         </AccordionItemTitle>,
    //     );

    //     expect(wrapper.find('div').instance().lang).toEqual('en');
    // });
});
