import * as React from 'react';
import {
    AccordionContext,
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
        accordionContext: AccordionContext,
        itemContext: ItemContext,
    ): JSX.Element => {
        const { uuid } = itemContext;
        const { items, allowMultipleExpanded } = accordionContext;
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
                {(accordionContext: AccordionContext): JSX.Element => (
                    <ItemConsumer>
                        {(itemContext: ItemContext): JSX.Element =>
                            this.renderChildren(accordionContext, itemContext)
                        }
                    </ItemConsumer>
                )}
            </AccordionConsumer>
        );
    }
}
