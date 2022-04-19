import * as React from 'react';
import { DivAttributes } from '../helpers/types';
import { Provider } from './AccordionContext';
import { ID } from './ItemContext';

type AccordionProps = Pick<
    DivAttributes,
    Exclude<keyof DivAttributes, 'onChange'>
> & {
    className?: string;
    preExpanded?: ID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    onChange?(args: ID[]): void;
};

const Accordion = ({
    className = 'accordion',
    allowMultipleExpanded,
    allowZeroExpanded,
    onChange,
    preExpanded,
    ...rest
}: AccordionProps): JSX.Element => {
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
