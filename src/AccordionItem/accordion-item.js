// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer } from 'mobx-react';
import consecutive from 'consecutive';

import classNames from 'classnames';

const nextUuid = consecutive();

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

    customKey = this.props.itemkey || nextUuid();

    componentDidMount() {
        this.props.accordionStore.addItem({
            itemkey: this.customKey,
            itemUuid: nextUuid(),
            expanded: false,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.customKey);
    }

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
