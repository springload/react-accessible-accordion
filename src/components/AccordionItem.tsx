import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId, nextUuid } from '../helpers/uuid';
import {
    Consumer as ItemConsumer,
    ItemContext,
    Provider as ItemProvider,
    UUID,
} from './ItemContext';

type Props = DivAttributes & {
    className?: string;
    uuid?: UUID;
    activeClassName?: string;
    dangerouslySetExpanded?: boolean;
};

const AccordionItem = ({
    uuid = nextUuid(),
    className = 'accordion__item',
    activeClassName,
    dangerouslySetExpanded,
    ...rest
}: Props) => {
    const renderChildren = (itemContext: ItemContext): JSX.Element => {
        const { expanded } = itemContext;
        const cx = expanded && activeClassName ? activeClassName : className;

        return (
            <div
                data-accordion-component="AccordionItem"
                className={cx}
                {...rest}
            />
        );
    };

    if (rest.id) {
        assertValidHtmlId(rest.id);
    }

    return (
        <ItemProvider
            uuid={uuid}
            dangerouslySetExpanded={dangerouslySetExpanded}
        >
            <ItemConsumer>{renderChildren}</ItemConsumer>
        </ItemProvider>
    );
};

export default AccordionItem;
