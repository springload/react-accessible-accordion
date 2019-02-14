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
        accordionContext: AccordionContext,
        itemContext: ItemContext,
    ): JSX.Element => {
        const { uuid } = itemContext;
        const { items, allowZeroExpanded, isItemDisabled } = accordionContext;
        const item = items.filter(
            (stateItem: Item) => stateItem.uuid === uuid,
        )[0];
        const disabled = isItemDisabled(uuid);

        return (
            <AccordionItemHeading
                {...this.props}
                {...item}
                disabled={disabled}
                setExpanded={accordionContext.setExpanded}
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
