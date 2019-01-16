import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

const Accordion = ({ ...rest }: AccordionProps): JSX.Element => {
    return <div {...rest} />;
};

export default Accordion;
