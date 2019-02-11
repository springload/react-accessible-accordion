import * as React from 'react';

import {
    AccordionContainer,
    Consumer as AccordionConsumer,
} from '../AccordionContext/AccordionContext';
import { nextUuid } from '../helpers/uuid';
import { Provider as ItemProvider } from '../ItemContext/ItemContext';
import AccordionItem from './AccordionItem';

type AccordionItemWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName?: string;
    expanded?: boolean;
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
        expanded: false,
        uuid: undefined,
    };

    id: number = nextUuid();

    renderChildren = (accordionStore: AccordionContainer): JSX.Element => {
        const { uuid, ...rest } = this.props;
        const itemUuid = uuid !== undefined ? uuid : this.id;

        return (
            <ItemProvider uuid={itemUuid}>
                <AccordionItem
                    {...rest}
                    uuid={itemUuid}
                    accordionStore={accordionStore}
                />
            </ItemProvider>
        );
    };

    render(): JSX.Element {
        return <AccordionConsumer>{this.renderChildren}</AccordionConsumer>;
    }
}
