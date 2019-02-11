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
import AccordionItemPanel from './AccordionItemPanel';

type AccordionItemPanelWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
};

export default class AccordionItemPanelWrapper extends React.Component<
    AccordionItemPanelWrapperProps
> {
    static defaultProps: AccordionItemPanelWrapperProps = {
        className: 'accordion__panel',
        expandedClassName: 'accordion__panel--expanded',
    };

    renderChildren = (
        accordionStore: AccordionContainer,
        itemStore: ItemContext,
    ): JSX.Element => {
        const { uuid } = itemStore;
        const { items, allowMultipleExpanded } = accordionStore;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];

        return item ? (
            <AccordionItemPanel
                {...this.props}
                {...item}
                allowMultipleExpanded={allowMultipleExpanded}
            />
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
