// @flow

import React from 'react';
import renderer from 'react-test-renderer';
// import { mount } from 'enzyme';
import { Provider } from 'unstated';
import ItemContainer from '../ItemContainer/ItemContainer';
import AccordionContainer from '../AccordionContainer/AccordionContainer';
import AccordionItemBody from './accordion-item-body';

describe('AccordionItemBody', () => {
    let accordionStore;
    let itemStore;
    // let onChange;

    beforeEach(() => {
        // onChange = jest.fn();

        const itemContainer = new ItemContainer();
        itemContainer.resetNextUuid();
        const accordionContainer = new AccordionContainer();
        accordionContainer.setAccordion(true);
        accordionContainer.setOnChange(jest.fn());
        accordionStore = accordionContainer;
        itemStore = itemContainer;

        accordionStore.addItem({
            uuid: 'item-one-uuid',
            expanded: false,
            disabled: false,
        });
    });

    it('renders correctly with min params', () => {
        const tree = renderer
            .create(
                <Provider inject={[accordionStore, itemStore]}>
                    <AccordionItemBody>
                        <div>Fake body</div>
                    </AccordionItemBody>
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('renders correctly with different className', () => {
    //     const className = 'className';
    //     const wrapper = mount(
    //         <Provider accordionStore={accordionStore} uuid={uuid}>
    //             <AccordionItemBody className={className} />
    //         </Provider>,
    //     );
    //     expect(wrapper.find('div').hasClass(className)).toEqual(true);
    // });

    // it('renders correctly with different hideBodyClassName', () => {
    //     const hideBodyClassName = 'hideBodyClassName';
    //     const wrapper = mount(
    //         <Provider accordionStore={accordionStore} uuid={uuid}>
    //             <AccordionItemBody hideBodyClassName={hideBodyClassName} />
    //         </Provider>,
    //     );
    //     expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    // });

    // it('renders null if an associated AccordionItem is not registered in accordionStore', () => {
    //     const className = 'className';
    //     const wrapper = mount(
    //         <Provider accordionStore={accordionStore} uuid="foo">
    //             <AccordionItemBody className={className}>
    //                 <div>Fake body</div>
    //             </AccordionItemBody>
    //         </Provider>,
    //     );

    //     expect(
    //         wrapper.findWhere(item => item.className === className).length,
    //     ).toEqual(0);
    // });

    // it('respects arbitrary user-defined props', () => {
    //     const wrapper = mount(
    //         <Provider accordionStore={accordionStore} uuid={uuid}>
    //             <AccordionItemBody lang="en" />
    //         </Provider>,
    //     );
    //     expect(wrapper.find('div').instance().lang).toEqual('en');
    // });
});
