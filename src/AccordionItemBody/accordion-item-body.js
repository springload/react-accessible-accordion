import React, { PropTypes } from 'react';
import classNames from 'classnames';

const defaultProps = {
    id: '',
    expanded: false,
    className: 'accordion__body',
    prefixCss: 'accordion__body',
    role: '',
};

const propTypes = {
    id: PropTypes.string,
    expanded: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    className: PropTypes.string,
    prefixCss: PropTypes.string,
    role: PropTypes.string,
};

const AccordionItemBody = ({ id, expanded, children, className, prefixCss, role }) => {
    const bodyClass = classNames(
        className,
        {
            [`${prefixCss}--hidden`]: !expanded,
        },
    );
    const ariaHidden = !expanded;
    return (
        <div
            id={id}
            className={bodyClass}
            aria-hidden={ariaHidden}
            role={role}
        >
            {children}
        </div>
    );
};

AccordionItemBody.propTypes = propTypes;
AccordionItemBody.defaultProps = defaultProps;

export default AccordionItemBody;
