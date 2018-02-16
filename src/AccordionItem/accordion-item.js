// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import consecutive from 'consecutive';
import classNames from 'classnames';
import type { Store } from '../accordionStore/accordionStore';

const nextUuid = consecutive();

type AccordionItemProps = {
    children: Node,
    className: string,
    hideBodyClassName: string,
    itemkey: string | number,
    accordionStore: Store,
};

class AccordionItem extends Component<AccordionItemProps, *> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
    };

    customKey = this.props.itemkey || nextUuid();

    componentWillMount() {
        this.props.accordionStore.addItem({
            itemkey: this.customKey,
            itemUuid: nextUuid(),
            expanded: false,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.customKey);
    }

    render() {
        const {
            className,
            hideBodyClassName,
            children,
            accordionStore,
        } = this.props;

        const currentItem = accordionStore.items.find(
            item => item.itemkey === this.customKey,
        );

        if (!currentItem) {
            return null;
        }
        const { expanded } = currentItem;

        return (
            <Provider itemkey={this.customKey}>
                <div
                    className={classNames(className, {
                        [hideBodyClassName]: !expanded && hideBodyClassName,
                    })}
                >
                    {children}
                </div>
            </Provider>
        );
    }
}

export default inject('accordionStore')(observer(AccordionItem));
