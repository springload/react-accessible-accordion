// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer, Provider } from 'mobx-react';

import classNames from 'classnames';
import { observable } from 'mobx';

type AccordionItemProps = {
    items: Array<Object>,
    children: Node,
    className: string,
    hideBodyClassName: string,
    itemkey: string | number,
    accordionStore: Object,
};

class AccordionItem extends Component<AccordionItemProps, *> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
    };

    renderChildren() {
        const { children, itemkey } = this.props;

        return React.Children.map(children, item =>
            React.cloneElement(item, {
                itemkey,
            }),
        );
    }

    render() {
        const { className, hideBodyClassName } = this.props;
        const itemProperties = this.props.accordionStore.items.find(
            item => item.itemkey === this.props.itemkey,
        );

        if (!itemProperties) return null;
        const { expanded } = itemProperties;

        const itemClassName = classNames(className, {
            [hideBodyClassName]: !expanded && hideBodyClassName,
        });

        return <div className={itemClassName}>{this.renderChildren()}</div>;
    }
}

export default inject('accordionStore')(observer(AccordionItem));
