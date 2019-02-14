import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { Provider as AccordionProvider } from '../AccordionContext/AccordionContext';
import { Provider as ItemProvider } from '../ItemContext/ItemContext';
import { default as AccordionItemState } from './AccordionItemState.wrapper';

describe('AccordionItemState', () => {
    function mountItem(children: JSX.Element): ReactWrapper {
        const uuid = 'foo';

        return mount(
            <AccordionProvider preExpanded={[uuid]}>
                <ItemProvider uuid={uuid}>{children}</ItemProvider>
            </AccordionProvider>,
        );
    }

    it('renders correctly with min params', () => {
        const wrapper = mountItem(
            <AccordionItemState>
                {(expanded: boolean): JSX.Element => (
                    <div>{`Expanded: ${expanded}`}</div>
                )}
            </AccordionItemState>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('does not render if no accordionContext found in context', () => {
        const wrapper = mount(
            <ItemProvider uuid="foo">
                <AccordionItemState>
                    {(expanded: boolean): JSX.Element => (
                        <div>{`Expanded: ${expanded}`}</div>
                    )}
                </AccordionItemState>
            </ItemProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('does not render if no itemContext found in context', () => {
        const wrapper = mount(
            <AccordionProvider>
                <AccordionItemState>
                    {(expanded: boolean): JSX.Element => (
                        <div>{`Expanded: ${expanded}`}</div>
                    )}
                </AccordionItemState>
            </AccordionProvider>,
        );

        expect(wrapper.find('div[data-enzyme]').length).toEqual(0);
    });

    it('renders correctly with different children prop', () => {
        const wrapper = mountItem(
            <AccordionItemState>
                {(expanded: boolean): JSX.Element => {
                    const className = expanded ? 'expanded' : 'collapsed';

                    return <div className={className} />;
                }}
            </AccordionItemState>,
        );

        expect(wrapper.find('div').hasClass('expanded')).toEqual(true);
        expect(wrapper.find('div').hasClass('collapsed')).toEqual(false);
    });

    it('renders correctly with different children prop and expanded set to false', () => {
        const uuid = 'foo';

        const wrapper = mount(
            <AccordionProvider>
                <ItemProvider uuid={uuid}>
                    <AccordionItemState>
                        {(expanded: boolean): JSX.Element => {
                            const className = expanded
                                ? 'expanded'
                                : 'collapsed';

                            return <div className={className} />;
                        }}
                    </AccordionItemState>
                </ItemProvider>
            </AccordionProvider>,
        );

        expect(wrapper.find('div').hasClass('expanded')).toEqual(false);
        expect(wrapper.find('div').hasClass('collapsed')).toEqual(true);
    });
});
