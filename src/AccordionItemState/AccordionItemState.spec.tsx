import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
    Item,
    Provider as AccordionProvider,
} from '../AccordionContainer/AccordionContainer';
import { Provider as ItemProvider } from '../ItemContainer/ItemContainer';
import { default as AccordionItemState } from './AccordionItemState.wrapper';

describe('AccordionItemState', () => {
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
        const wrapper = mountItem(<AccordionItemState />);
        expect(wrapper).toMatchSnapshot();
    });

    it('does not render if no accordionStore found in context', () => {
        const wrapper = mount(
            <ItemProvider uuid="foo">
                <AccordionItemState />
            </ItemProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('does not render if no itemStore found in context', () => {
        const wrapper = mount(
            <AccordionProvider initialItems={[]}>
                <AccordionItemState />
            </AccordionProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('renders correctly with different children prop', () => {
        const renderPropComponent: React.SFC<boolean> = (
            expanded: boolean,
        ): JSX.Element =>
            expanded ? (
                <div className="expanded" />
            ) : (
                <div className="collapsed" />
            );

        const wrapper = mountItem(
            <AccordionItemState children={renderPropComponent} />,
        );

        expect(wrapper.find('div').hasClass('expanded')).toEqual(true);
        expect(wrapper.find('div').hasClass('collapsed')).toEqual(false);
    });

    it('renders correctly with different children prop and expanded set to false', () => {
        function mountExpandedFalse(children: JSX.Element): ReactWrapper {
            const item: Item = {
                uuid: 0,
                expanded: false,
            };

            return mount(
                <AccordionProvider initialItems={[item]}>
                    <ItemProvider uuid={item.uuid}>{children}</ItemProvider>
                </AccordionProvider>,
            );
        }

        const renderPropComponent: React.SFC<boolean> = (
            expanded: boolean,
        ): JSX.Element =>
            expanded ? (
                <div className="expanded" />
            ) : (
                <div className="collapsed" />
            );

        const wrapper = mountExpandedFalse(
            <AccordionItemState children={renderPropComponent} />,
        );

        expect(wrapper.find('div').hasClass('expanded')).toEqual(false);
        expect(wrapper.find('div').hasClass('collapsed')).toEqual(true);
    });
});
