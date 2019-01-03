import * as React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
    accordion: boolean;
};

const Accordion = ({ accordion, ...rest }: AccordionProps) => {
    const role = accordion ? 'tablist' : undefined;

    return <div role={role} {...rest} />;
};

export default Accordion;
