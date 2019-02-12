import * as React from 'react';
import {
    AccordionContext,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
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
        const disabled = accordionContext.isItemDisabled(uuid);
        const expanded = accordionContext.isItemExpanded(uuid);

        return (
            <AccordionItemHeading
                {...this.props}
                uuid={uuid}
                expanded={expanded}
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
