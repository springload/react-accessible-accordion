import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

const Accordion = ({ ...rest }: AccordionProps): JSX.Element => {
    return <div data-accordion {...rest} />;
};

export default Accordion;
