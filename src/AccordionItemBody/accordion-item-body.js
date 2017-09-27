// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';

const defaultProps = {
    id: '',
    expanded: false,
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
    role: '',
};

type AccordionItemBodyProps = {
    id: string,
    expanded: boolean,
    children: Node,
    className: string,
    hideBodyClassName: string,
    role: string,
};

const AccordionItemBody = (props: AccordionItemBodyProps) => {
    const { id, expanded, children, className, hideBodyClassName, role } = props;
    const bodyClass = classNames(
        className,
        {
            [hideBodyClassName]: !expanded,
        },
    );
    const ariaHidden = !expanded;
    return (
        <div
            id={id}
            className={bodyClass}
            aria-hidden={ariaHidden}
            aria-labelledby={id.replace('accordion__body-', 'accordion__title-')}
            role={role}
        >
            {children}
        </div>
    );
};

AccordionItemBody.defaultProps = defaultProps;
// We need this to be able to assign correct params to element.
// Minifiers modify component name
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default AccordionItemBody;
