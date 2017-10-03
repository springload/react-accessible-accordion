// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';

type AccordionItemProps = {
    accordion: boolean,
    expanded: boolean,
    onClick: Function,
    children: Node,
    className: string,
    hideBodyClassName: string,
};

type AccordionItemState = {
    itemUuid: string,
};

class AccordionItem extends Component<AccordionItemProps, AccordionItemState> {
    static defaultProps = {
        accordion: true,
        expanded: false,
        onClick: () => {},
        className: 'accordion__item',
        hideBodyClassName: '',
    };

    state = {
        itemUuid: uuid.v4(),
    };

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

    renderChildren = this.renderChildren.bind(this);

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

export default AccordionItem;
