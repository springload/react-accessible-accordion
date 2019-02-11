import * as React from 'react';
import {
    AccordionContainer,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
import { Item } from '../AccordionStore/AccordionStore';
import {
    Consumer as ItemConsumer,
    ItemContext,
} from '../ItemContext/ItemContext';

import AccordionItemState from './AccordionItemState';

type AccordionItemStateWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expanded?: boolean;
    children(expanded: boolean): JSX.Element;
};

export default class AccordionItemStateWrapper extends React.Component<
    AccordionItemStateWrapperProps
> {
    static defaultProps: AccordionItemStateWrapperProps = {
        children: (expanded: boolean): JSX.Element => null,
    };

    renderChildren = (
        accordionStore: AccordionContainer,
        itemStore: ItemContext,
    ): JSX.Element => {
        const { uuid } = itemStore;
        const { items } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];
        const { children } = this.props;

        return item ? (
            <AccordionItemState expanded={item.expanded} children={children} />
        ) : null;
    };

    render(): JSX.Element {
        return (
            <AccordionConsumer>
                {(accordionStore: AccordionContainer): JSX.Element => (
                    <ItemConsumer>
                        {(itemStore: ItemContext): JSX.Element =>
                            this.renderChildren(accordionStore, itemStore)
                        }
                    </ItemConsumer>
                )}
            </AccordionConsumer>
        );
    }
}
