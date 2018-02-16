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
    disabled: boolean,
    expanded: boolean,
};

class AccordionItem extends Component<AccordionItemProps, *> {
    static defaultProps = {
        className: 'accordion__item',
        hideBodyClassName: '',
        disabled: false,
        expanded: false,
    };

    customKey = this.props.itemkey || nextUuid();

    componentWillMount() {
        this.props.accordionStore.addItem({
            itemkey: this.customKey,
            itemUuid: nextUuid(),
            expanded: this.props.expanded,
            disabled: this.props.disabled,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.customKey);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentWillReceiveProps({
        expanded,
        accordionStore,
    }: AccordionItemProps) {
        if (expanded !== this.props.expanded) {
            accordionStore.setExpanded(this.customKey, expanded);
        }
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
