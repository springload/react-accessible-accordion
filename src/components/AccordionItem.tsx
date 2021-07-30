import * as React from 'react';
import { useState } from 'react';
import DisplayName from '../helpers/DisplayName';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId, nextUuid } from '../helpers/uuid';
import {
    Consumer as ItemConsumer,
    ItemContext,
    Provider as ItemProvider,
    UUID,
} from './ItemContext';

type Props = DivAttributes & {
    uuid?: UUID;
    activeClassName?: string;
    dangerouslySetExpanded?: boolean;
};

const AccordionItem = ({
    uuid: customUuid,
    dangerouslySetExpanded,
    className = 'accordion__item',
    activeClassName,
    ...rest
}: Props): JSX.Element => {
    const [instanceUuid] = useState<UUID>(nextUuid());
    const uuid = customUuid ?? instanceUuid;

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

    assertValidHtmlId(uuid);
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

AccordionItem.displayName = DisplayName.AccordionItem;

export default AccordionItem;
