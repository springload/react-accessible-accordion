import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { Provider } from './AccordionContext';
import { UUID } from './ItemContext';

type AccordionProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, 'onChange'>
> & {
    className?: string;
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange?(args: UUID[]): void;
};

const Accordion = ({
    className = 'accordion',
    allowMultipleExpanded,
    allowZeroExpanded,
    onChange,
    preExpanded,
    ...rest
}: AccordionProps) => {
    return (
        <Provider
            preExpanded={preExpanded}
            allowMultipleExpanded={allowMultipleExpanded}
            allowZeroExpanded={allowZeroExpanded}
            onChange={onChange}
        >
            <div
                data-accordion-component="Accordion"
                className={className}
                {...rest}
            />
        </Provider>
    );
};

export default Accordion;
