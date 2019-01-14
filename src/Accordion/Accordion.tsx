import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    accordion: boolean;
};

const Accordion = ({ accordion, ...rest }: AccordionProps): JSX.Element => {
    return <div {...rest} />;
};

export default Accordion;
