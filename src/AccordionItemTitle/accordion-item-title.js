import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const defaultProps = {
    id: '',
    expanded: false,
    onClick: () => {},
    ariaControls: '',
    className: 'accordion__title',
    hideBodyClassName: null,
    role: '',
};

const propTypes = {
    id: PropTypes.string,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
    ariaControls: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    className: PropTypes.string,
    hideBodyClassName: PropTypes.string,
    role: PropTypes.string,
};

class AccordionItemTitle extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(evt) {
        const { onClick } = this.props;
        if (evt.charCode === 13 || evt.charCode === 32) {
            onClick();
        }
    }

    render() {
        const { id, expanded, ariaControls, onClick, children, className, role, hideBodyClassName } = this.props;
        const titleClassName = classNames(
            className,
            {
                [hideBodyClassName]: (hideBodyClassName && !expanded),
            },
        );

        if (role === 'tab') {
            return (
                <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                    id={id}
                    aria-selected={expanded}
                    aria-controls={ariaControls}
                    className={titleClassName}
                    onClick={onClick}
                    role={role}
                    tabIndex="0"
                    onKeyPress={this.handleKeyPress}
                >
                    {children}
                </div>
            );
        }
        return (
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={titleClassName}
                onClick={onClick}
                role={role}
                tabIndex="0"
                onKeyPress={this.handleKeyPress}
            >
                {children}
            </div>
        );
    }
}

AccordionItemTitle.propTypes = propTypes;
AccordionItemTitle.defaultProps = defaultProps;
// We need this to be able to assign correct params to element.
// Minifiers modify component name
AccordionItemTitle.accordionElementName = 'AccordionItemTitle';

export default AccordionItemTitle;
