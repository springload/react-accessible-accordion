// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import consecutive from 'consecutive';
import classNames from 'classnames';

const nextUuid = consecutive();

type AccordionItemProps = {
    accordion: boolean,
    expanded: boolean,
    onClick: Function,
    children: Node,
    className: string,
    hideBodyClassName: string,
    level: number,
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
        level: 0,
    };

    state = {
        itemUuid: nextUuid(),
    };

    renderChildren() {
        const { accordion, expanded, onClick, children, level } = this.props;
        const { itemUuid } = this.state;

        return React.Children.map(children, item => {
            const itemProps = {};

            if (item.type.accordionElementName === 'AccordionItemTitle') {
                itemProps.expanded = expanded;
                itemProps.key = 'title';
                itemProps.id = `accordion__title-${itemUuid}`;
                itemProps.ariaControls = `accordion__body-${itemUuid}`;
                itemProps.onClick = onClick;
                itemProps.role = accordion ? 'heading' : 'button';
                itemProps.level = level;

                return React.cloneElement(item, itemProps);
            } else if (item.type.accordionElementName === 'AccordionItemBody') {
                itemProps.expanded = expanded;
                itemProps.key = 'body';
                itemProps.id = `accordion__body-${itemUuid}`;
                itemProps.role = accordion ? 'region' : null;

                return React.cloneElement(item, itemProps);
            }

            return item;
        });
    }

    renderChildren = this.renderChildren.bind(this);

    render() {
        const { className, expanded, hideBodyClassName } = this.props;

        const itemClassName = classNames(className, {
            [hideBodyClassName]: !expanded && hideBodyClassName,
        });

        return <div className={itemClassName}>{this.renderChildren()}</div>;
    }
}

export default AccordionItem;
