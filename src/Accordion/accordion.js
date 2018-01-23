// @flow

import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import type { Node } from 'react';
// import { isArraysEqualShallow } from '../utils';

type AccordionProps = {
    accordion: boolean,
    children: Node,
    activeItems: Array<string | number>,
    className: string,
    onChange: Function,
};

type AccordionState = {
    activeItems: Array<string | number>,
};

class Accordion extends Component<AccordionProps, AccordionState> {
    static defaultProps = {
        accordion: true,
        onChange: () => {},
        className: 'accordion',
        activeItems: [],
    };

    accordionStore = observable({
        activeItems: this.preExpandedItems(),
        accordion: this.props.accordion,
        onChange: this.props.onChange,
    });

    preExpandedItems() {
        let activeItems = [];
        React.Children.map(this.props.children, (item, index) => {
            if (item.props.expanded) {
                if (this.props.accordion) {
                    if (activeItems.length === 0)
                        activeItems.push(item.props.customKey || index);
                } else {
                    activeItems.push(item.props.customKey || index);
                }
            }
        });
        if (activeItems.length === 0 && this.props.activeItems.length !== 0) {
            activeItems = this.props.accordion
                ? [this.props.activeItems[0]]
                : this.props.activeItems.slice();
        }
        return activeItems;
    }

    renderItems() {
        const { children } = this.props;
        const { accordion, activeItems } = this.accordionStore;

        return React.Children.map(children, (item, index) => {
            const itemKey = item.props.customKey || index;
            const expanded =
                activeItems.indexOf(itemKey) !== -1 && !item.props.disabled;

            return React.cloneElement(item, {
                accordion,
                expanded,
                itemKey,
            });
        });
    }

    render() {
        const { className, accordion } = this.props;
        return (
            <div role={accordion ? 'tablist' : null} className={className}>
                <Provider accordionStore={this.accordionStore}>
                    <div>{this.renderItems()}</div>
                </Provider>
            </div>
        );
    }
}

export default Accordion;
