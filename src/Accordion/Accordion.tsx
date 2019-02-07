import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

const Accordion: React.SFC = ({ ...rest }: AccordionProps): JSX.Element => {
    return <div data-accordion-component="Accordion" {...rest} />;
};

export default Accordion;
