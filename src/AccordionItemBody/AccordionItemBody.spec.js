// @flow

import React from 'react';
import { mount } from 'enzyme';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import {
    Provider as AccordionProvider,
    type Item,
} from '../AccordionContainer/AccordionContainer';
import AccordionItemBody from './AccordionItemBody.wrapper';

describe('AccordionItemBody', () => {
    function mountItem(Node) {
        const item: Item = {
            uuid: 0,
            expanded: false,
            disabled: false,
        };
        return mount(
            <AccordionProvider accordion items={[item]}>
                <ItemProvider uuid={item.uuid}>{Node}</ItemProvider>
            </AccordionProvider>,
        );
    }

    it('renders correctly with min params', () => {
        const wrapper = mountItem(
            <AccordionItemBody>
                <div>Fake body</div>
            </AccordionItemBody>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mountItem(<AccordionItemBody className={className} />);
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders correctly with different hideBodyClassName', () => {
        const hideBodyClassName = 'hideBodyClassName';
        const wrapper = mountItem(
            <AccordionItemBody hideBodyClassName={hideBodyClassName} />,
        );
        expect(wrapper.find('div').hasClass(hideBodyClassName)).toEqual(true);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mountItem(<AccordionItemBody lang="en" />);
        expect(wrapper.find('div').instance().lang).toEqual('en');
    });

    it('does not render if no associated item found in context', () => {
        const wrapper = mount(
            <AccordionProvider accordion items={[]}>
                <ItemProvider uuid="foo">
                    <AccordionItemBody>
                        <div data-enzyme>Hello World</div>
                    </AccordionItemBody>
                </ItemProvider>
            </AccordionProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });
});
