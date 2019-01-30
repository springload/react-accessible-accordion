import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
    Item,
    Provider as AccordionProvider,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { default as AccordionItemState } from './AccordionItemState.wrapper';

describe('AccordionItemState', () => {
    function mountItem(children: React.ReactNode): ReactWrapper {
        const item: Item = {
            uuid: 0,
            expanded: true,
        };

        return mount(
            <AccordionProvider items={[item]}>
                <ItemProvider uuid={item.uuid}>{children}</ItemProvider>
            </AccordionProvider>,
        );
    }

    it('renders correctly with min params', () => {
        const wrapper = mountItem(
            <AccordionItemState>
                <div>Fake body</div>
            </AccordionItemState>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('does not render if no accordionStore found in context', () => {
        const wrapper = mount(
            <ItemProvider uuid="foo">
                <AccordionItemState>
                    <div data-enzyme={true}>Hello World</div>
                </AccordionItemState>
            </ItemProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('does not render if no itemStore found in context', () => {
        const wrapper = mount(
            <AccordionProvider allowMultipleExpanded={false} items={[]}>
                <AccordionItemState>
                    <div data-enzyme={true}>Hello World</div>
                </AccordionItemState>
            </AccordionProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });
});
