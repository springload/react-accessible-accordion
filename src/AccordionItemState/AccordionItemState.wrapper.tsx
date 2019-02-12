import * as React from 'react';
import {
    AccordionContext,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
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
        accordionContext: AccordionContext,
        itemContext: ItemContext,
    ): JSX.Element => {
        const { uuid } = itemContext;
        const { children } = this.props;
        const expanded = accordionContext.isItemExpanded(uuid);

        return <AccordionItemState expanded={expanded} children={children} />;
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
