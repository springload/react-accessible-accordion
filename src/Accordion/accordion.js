// @flow

import React, { type ElementProps } from 'react';

type AccordionProps = ElementProps<'div'> & {
    accordion: ?boolean,
};

const accordionDefaultProps = {
    accordion: true,
};

const Accordion = ({ accordion, ...rest }: AccordionProps) => (
    <div role={accordion ? 'tablist' : null} {...rest} />
);
Accordion.defaultProps = accordionDefaultProps;

export default Accordion;
