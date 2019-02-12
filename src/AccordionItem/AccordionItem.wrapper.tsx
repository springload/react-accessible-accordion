import * as React from 'react';

import {
    AccordionContext,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
import { nextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContext/ItemContext';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName?: string;
    uuid?: string;
};

type AccordionItemWrapperState = {};

export default class AccordionItemWrapper extends React.Component<
    AccordionItemWrapperProps,
    AccordionItemWrapperState
> {
    static defaultProps: AccordionItemWrapperProps = {
        className: 'accordion__item',
        expandedClassName: '',
        uuid: undefined,
    };

    id: number = nextUuid();

    renderChildren = (accordionContext: AccordionContext): JSX.Element => {
        const { uuid = this.id, ...rest } = this.props;

        const expanded = accordionContext.isItemExpanded(uuid);

        return (
            <ItemProvider uuid={uuid}>
                <AccordionItem {...rest} expanded={expanded} />
            </ItemProvider>
        );
    };

    render(): JSX.Element {
        return <AccordionConsumer>{this.renderChildren}</AccordionConsumer>;
    }
}
