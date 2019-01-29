import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

const Accordion = ({ ...rest }: AccordionProps): JSX.Element => {
    return <div data-accordion-component="Accordion" {...rest} />;
};

export default Accordion;
