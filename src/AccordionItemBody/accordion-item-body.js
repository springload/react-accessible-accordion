import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const defaultProps = {
    id: '',
    expanded: false,
    className: 'accordion__body',
    hideBodyClassName: 'accordion__body--hidden',
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
    hideBodyClassName: PropTypes.string,
    role: PropTypes.string,
};

const AccordionItemBody = ({ id, expanded, children, className, hideBodyClassName, role }) => {
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

AccordionItemBody.propTypes = propTypes;
AccordionItemBody.defaultProps = defaultProps;
// We need this to be able to assign correct params to element.
// Minifiers modify component name
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default AccordionItemBody;
