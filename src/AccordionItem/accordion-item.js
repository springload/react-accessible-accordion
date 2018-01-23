// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import consecutive from 'consecutive';
import classNames from 'classnames';
import { observable } from 'mobx';

const nextUuid = consecutive();

type AccordionItemProps = {
    expanded: boolean,
    children: Node,
    className: string,
    hideBodyClassName: string,
    itemKey: string | number,
};

type AccordionItemState = {
    itemUuid: string,
};

class AccordionItem extends Component<AccordionItemProps, AccordionItemState> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
    };

    accordionItemStore = observable({
        itemKey: this.props.itemKey,
        itemUuid: nextUuid(),
        expanded: this.props.expanded,
    });

    render() {
        const { className, expanded, hideBodyClassName } = this.props;

        const itemClassName = classNames(className, {
            [hideBodyClassName]: !expanded && hideBodyClassName,
        });

        return (
            <Provider accordionItemStore={this.accordionItemStore}>
                <div className={itemClassName}>{this.props.children}</div>
            </Provider>
        );
    }
}

export default inject('accordionStore')(observer(AccordionItem));
