// @flow

import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import type { Node } from 'react';
import consecutive from 'consecutive';

const nextUuid = consecutive();

type AccordionProps = {
    accordion: boolean,
    children: Node,
    activeItems: Array<string | number>,
    className: string,
    onChange: Function,
};

class Accordion extends Component<AccordionProps, *> {
    static defaultProps = {
        accordion: true,
        onChange: () => {},
        className: 'accordion',
        activeItems: [],
    };

    accordionStore = observable({
        items: this.parseItems(),
        accordion: this.props.accordion,
        onChange: this.props.onChange,
    });

    componentDidUpdate() {
        this.accordionStore.items = this.parseItems();
    }

    parseItems() {
        let items = [];
        let hasOneExpanded = false;
        let expandsWithChildrenProperties = false;

        // we leave priority to children properties
        React.Children.map(this.props.children, (child, index) => {
            const item = {
                itemkey: child.props.customKey || index,
                itemUuid: nextUuid(),
                expanded: false,
            };

            if (this.props.accordion) {
                item.expanded = !hasOneExpanded && child.props.expanded;
                if (child.props.expanded) {
                    hasOneExpanded = true;
                }
            } else {
                item.expanded = child.props.expanded;
            }

            if (child.props.expanded) {
                expandsWithChildrenProperties = true;
            }
            items.push(item);
        });

        // if not using children properties to expand items we check with activeItems property
        if (
            !expandsWithChildrenProperties &&
            this.props.activeItems.length !== 0
        ) {
            items = items.map((item: Object) => {
                const resetItem = item;
                resetItem.expanded = false;
                return resetItem;
            });

            this.props.activeItems.forEach(activeItem => {
                const foundItem = items.find(
                    item => item.itemkey === activeItem,
                );
                hasOneExpanded = false;
                if (foundItem) {
                    let expanded = true;
                    if (this.props.accordion) {
                        expanded = !hasOneExpanded;
                        hasOneExpanded = true;
                    }
                    foundItem.expanded = expanded;
                }
            });
        }
        return items;
    }

    renderItems() {
        const { children } = this.props;

        return React.Children.map(children, (item, index) => {
            const itemkey = item.props.customKey || index;

            return React.cloneElement(item, {
                itemkey,
            });
        });
    }

    render() {
        const { className } = this.props;
        const { accordion } = this.accordionStore;

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
