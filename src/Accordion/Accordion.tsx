import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    accordion: boolean;
};

const Accordion = ({ accordion, ...rest }: AccordionProps) => (
    <div role={accordion ? 'tablist' : null} {...rest} />
);

export default Accordion;
