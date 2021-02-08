import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId } from '../helpers/uuid';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes & { className?: string };

const AccordionItemPanel = ({
    className = 'accordion__panel',
    id,
    ...rest
}: Props): JSX.Element => {
    const renderChildren = ({ panelAttributes }: ItemContext): JSX.Element => {
        if (id) {
            assertValidHtmlId(id);
        }

        return (
            <div
                data-accordion-component="AccordionItemPanel"
                className={className}
                {...rest}
                {...panelAttributes}
            />
        );
    };

    return <ItemConsumer>{renderChildren}</ItemConsumer>;
};

export default AccordionItemPanel;
