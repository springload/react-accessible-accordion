import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

const defaultProps = {
    accordion: true,
    expanded: false,
    onClick: () => {},
    className: 'accordion__item',
};

const propTypes = {
    accordion: PropTypes.bool,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
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
            const itemProps = {
                expanded: expanded,
            };

            if (item.type.accordionElementName === 'AccordionItemTitle') {
                itemProps.key = 'title';
                itemProps.id = `accordion__title-${itemUuid}`;
                itemProps.ariaControls = `accordion__body-${itemUuid}`;
                itemProps.onClick = onClick;
                itemProps.role = accordion ? 'tab' : 'button';
            } else if (item.type.accordionElementName === 'AccordionItemBody') {
                itemProps.key = 'body';
                itemProps.id = `accordion__body-${itemUuid}`;
                itemProps.role = accordion ? 'tabpanel' : '';
            }

            return React.cloneElement(item, itemProps);
        });
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.renderChildren()}
            </div>
        );
    }

}

AccordionItem.propTypes = propTypes;
AccordionItem.defaultProps = defaultProps;

export default AccordionItem;
