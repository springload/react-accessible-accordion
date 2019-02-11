import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider as AccordionProvider } from '../AccordionContext/AccordionContext';
import { Item } from '../AccordionStore/AccordionStore';
import { Provider as ItemProvider } from '../ItemContext/ItemContext';
import { default as AccordionItemPanel } from './AccordionItemPanel.wrapper';

describe('AccordionItemPanel', () => {
    function mountItem(children: JSX.Element): ReactWrapper {
        const item: Item = {
            uuid: 0,
            expanded: true,
        };

        return mount(
            <AccordionProvider initialItems={[item]}>
                <ItemProvider uuid={item.uuid}>{children}</ItemProvider>
            </AccordionProvider>,
        );
    }

    it('renders correctly with min params', () => {
        const wrapper = mountItem(
            <AccordionItemPanel>
                <div>Fake body</div>
            </AccordionItemPanel>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with different className', () => {
        const className = 'className';
        const wrapper = mountItem(<AccordionItemPanel className={className} />);
        expect(wrapper.find('div').hasClass(className)).toEqual(true);
    });

    it('renders correctly with different expandedClassName when item is expanded', () => {
        const expandedClassName = 'expandedClassName';
        const wrapper = mountItem(
            <AccordionItemPanel expandedClassName={expandedClassName} />,
        );
        expect(wrapper.find('div').hasClass(expandedClassName)).toEqual(true);
    });

    it('respects arbitrary user-defined props', () => {
        const wrapper = mountItem(<AccordionItemPanel lang="en" />);
        const div = wrapper.find('div').getDOMNode();

        expect(div.getAttribute('lang')).toEqual('en');
    });

    it('does not render if no accordionContext found in context', () => {
        const wrapper = mount(
            <ItemProvider uuid="foo">
                <AccordionItemPanel>
                    <div data-enzyme={true}>Hello World</div>
                </AccordionItemPanel>
            </ItemProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('does not render if no itemContext found in context', () => {
        const wrapper = mount(
            <AccordionProvider allowMultipleExpanded={false} initialItems={[]}>
                <AccordionItemPanel>
                    <div data-enzyme={true}>Hello World</div>
                </AccordionItemPanel>
            </AccordionProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });
});
