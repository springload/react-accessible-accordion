// @flow

import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import consecutive from 'consecutive';
import classNames from 'classnames';
import type { Store } from '../accordionStore/accordionStore';

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

type AccordionItemProps = {
    children: Node,
    className: string,
    hideBodyClassName: string,
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

    uuid = nextUuid();

    componentWillMount() {
        const { accordionStore, disabled } = this.props;

        accordionStore.addItem({
            uuid: this.uuid,
            expanded: this.props.expanded || false,
            disabled,
        });
    }

    componentWillUnmount() {
        this.props.accordionStore.removeItem(this.uuid);
    }

    // This is here so that the user can dynamically set the 'expanded' state using the 'expanded' prop.
    componentWillReceiveProps({
        expanded,
        accordionStore,
    }: AccordionItemProps) {
        if (expanded !== this.props.expanded) {
            accordionStore.setExpanded(this.uuid, expanded);
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
            item => item.uuid === this.uuid,
        );

        if (!currentItem) {
            return null;
        }
        const { expanded } = currentItem;

        return (
            <Provider uuid={this.uuid}>
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
