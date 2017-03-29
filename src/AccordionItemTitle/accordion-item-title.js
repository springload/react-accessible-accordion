import React, { Component, PropTypes } from 'react';

const defaultProps = {
    id: '',
    expanded: false,
    onClick: () => {},
    ariaControls: '',
    className: 'accordion__title',
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
        const { id, expanded, ariaControls, onClick, children, className, role } = this.props;
        return (
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={className}
                onClick={() => onClick()}
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

export default AccordionItemTitle;
