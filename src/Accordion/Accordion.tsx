import * as React from 'react';

type AccordionProps = React.HTMLProps<HTMLDivElement> & {
	accordion?: boolean;
};

const Accordion = ({ accordion = true, ...rest }: AccordionProps) => (
	<div role={accordion ? 'tablist' : null} {...rest} />
);

export default Accordion;
