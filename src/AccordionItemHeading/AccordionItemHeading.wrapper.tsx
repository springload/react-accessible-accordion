import * as React from 'react';
import {
    AccordionContainer,
    Consumer as AccordionConsumer,
    Item,
} from '../AccordionContainer/AccordionContainer';
import {
    Consumer as ItemConsumer,
    ItemContainer,
} from '../ItemContainer/ItemContainer';
import { default as AccordionItemHeading } from './AccordionItemHeading';

type AccordionItemHeadingWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
};

type AccordionItemHeadingWrapperState = {};

export default class AccordionItemHeadingWrapper extends React.Component<
    AccordionItemHeadingWrapperProps,
    AccordionItemHeadingWrapperState
> {
    static defaultProps: AccordionItemHeadingWrapperProps = {
        className: 'accordion__heading',
        expandedClassName: '',
    };

    renderChildren = (
        accordionStore: AccordionContainer,
        itemStore: ItemContainer,
    ): JSX.Element => {
        const { uuid } = itemStore;
        const { items, allowZeroExpanded, isItemDisabled } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];
        const disabled = isItemDisabled(uuid);

        return (
            <AccordionItemHeading
                {...this.props}
                {...item}
                disabled={disabled}
                setExpanded={accordionStore.setExpanded}
            />
        );
    };

    render(): JSX.Element {
        return (
            <AccordionConsumer>
                {(accordionStore: AccordionContainer): JSX.Element => (
                    <ItemConsumer>
                        {(itemStore: ItemContainer): JSX.Element =>
                            this.renderChildren(accordionStore, itemStore)
                        }
                    </ItemConsumer>
                )}
            </AccordionConsumer>
        );
    }
}
