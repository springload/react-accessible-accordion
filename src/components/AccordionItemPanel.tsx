import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { assertValidHtmlId } from '../helpers/id';
import { Consumer as ItemConsumer, ItemContext } from './ItemContext';

type Props = DivAttributes & { region?: boolean; className?: string };

const AccordionItemPanel = ({
    className = 'accordion__panel',
    region,
    id,
    ...rest
}: Props): JSX.Element => {
    const renderChildren = ({ panelAttributes }: ItemContext): JSX.Element => {
        if (id) {
            assertValidHtmlId(id);
        }

        const attrs = {
            ...panelAttributes,
            'aria-labelledby': region
                ? panelAttributes['aria-labelledby']
                : undefined,
        };

        return (
            <div
                data-accordion-component="AccordionItemPanel"
                className={className}
                {...rest}
                {...attrs}
                role={region ? 'region' : undefined}
            />
        );
    };

    return <ItemConsumer>{renderChildren}</ItemConsumer>;
};

export default AccordionItemPanel;
