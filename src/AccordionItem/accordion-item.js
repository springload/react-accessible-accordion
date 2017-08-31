import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';

const defaultProps = {
    accordion: true,
    expanded: false,
    onClick: () => {},
    className: 'accordion__item',
    hideBodyClassName: null,
};

const propTypes = {
    accordion: PropTypes.bool,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    hideBodyClassName: PropTypes.string,
};

class AccordionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemUuid: uuid.v4(),
        };
        this.renderChildren = this.renderChildren.bind(this);
    }

    renderChildren() {
        const { accordion, expanded, onClick, children } = this.props;
        const { itemUuid } = this.state;

        return React.Children.map(children, (item) => {
            const itemProps = {};

            if (item.type.accordionElementName === 'AccordionItemTitle') {
                itemProps.expanded = expanded;
                itemProps.key = 'title';
                itemProps.id = `accordion__title-${itemUuid}`;
                itemProps.ariaControls = `accordion__body-${itemUuid}`;
                itemProps.onClick = onClick;
                itemProps.role = accordion ? 'tab' : 'button';

                return React.cloneElement(item, itemProps);
            } else if (item.type.accordionElementName === 'AccordionItemBody') {
                itemProps.expanded = expanded;
                itemProps.key = 'body';
                itemProps.id = `accordion__body-${itemUuid}`;
                itemProps.role = accordion ? 'tabpanel' : null;

                return React.cloneElement(item, itemProps);
            }

            return item;
        });
    }

    render() {
        const { className, expanded, hideBodyClassName } = this.props;

        const itemClassName = classNames(
            className,
            {
                [hideBodyClassName]: (!expanded && hideBodyClassName),
            },
        );

        return (
            <div className={itemClassName}>
                {this.renderChildren()}
            </div>
        );
    }

}

AccordionItem.propTypes = propTypes;
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
