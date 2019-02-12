import * as React from 'react';
import {
    AccordionContext,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
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
        const { allowMultipleExpanded, isItemExpanded } = accordionContext;
        const expanded = isItemExpanded(uuid);

        return (
            <AccordionItemPanel
                {...this.props}
                uuid={uuid}
                expanded={expanded}
                allowMultipleExpanded={allowMultipleExpanded}
            />
        );
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
