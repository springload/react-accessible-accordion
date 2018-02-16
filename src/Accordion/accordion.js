// @flow

import React, { Component, type Node } from 'react';
import { observable, action } from 'mobx';
import { Provider } from 'mobx-react';

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
        items: [],
        accordion: this.props.accordion,
        onChange: this.props.onChange,
        addItem: action.bound(function addItem(item) {
            this.items = [...this.items, item];
        }),
        removeItem: action.bound(function removeItem(key) {
            this.items = this.items.filter(item => item.itemkey !== key);
        }),
        setExpanded: action.bound(function setExpanded(
            key: string | number,
            expanded: boolean,
        ) {
            this.items = this.items.map(item => {
                if (item.itemkey === key) {
                    return {
                        ...item,
                        expanded,
                    };
                }
                return item;
            });
        }),
    });

    // componentDidUpdate() {
    //     this.accordionStore.items = this.parseItems();
    // }

    // parseItems() {
    //     let items = [];
    //     let hasOneExpanded = false;
    //     let expandsWithChildrenProperties = false;

    //     // we leave priority to children properties
    //     React.Children.map(this.props.children, (child, index) => {
    //         const item = {
    //             itemkey: child.props.customKey || index,
    //             itemUuid: nextUuid(),
    //             expanded: false,
    //         };

    //         if (this.props.accordion) {
    //             item.expanded = !hasOneExpanded && child.props.expanded;
    //             if (child.props.expanded) {
    //                 hasOneExpanded = true;
    //             }
    //         } else {
    //             item.expanded = child.props.expanded;
    //         }

    //         if (child.props.expanded) {
    //             expandsWithChildrenProperties = true;
    //         }
    //         items.push(item);
    //     });

    //     // if not using children properties to expand items we check with activeItems property
    //     if (
    //         !expandsWithChildrenProperties &&
    //         this.props.activeItems.length !== 0
    //     ) {
    //         items = items.map((item: Object) => {
    //             const resetItem = item;
    //             resetItem.expanded = false;
    //             return resetItem;
    //         });

    //         this.props.activeItems.forEach(activeItem => {
    //             const foundItem = items.find(
    //                 item => item.itemkey === activeItem,
    //             );
    //             hasOneExpanded = false;
    //             if (foundItem) {
    //                 let expanded = true;
    //                 if (this.props.accordion) {
    //                     expanded = !hasOneExpanded;
    //                     hasOneExpanded = true;
    //                 }
    //                 foundItem.expanded = expanded;
    //             }
    //         });
    //     }
    //     return items;
    // }

    // renderItems() {
    //     const { children } = this.props;

    //     return React.Children.map(children, (item, index) => {
    //         const itemkey = item.props.customKey || index;

    //         return React.cloneElement(item, {
    //             itemkey,
    //         });
    //     });
    // }

    render() {
        const { className, children } = this.props;
        const { accordion } = this.accordionStore;

        return (
            <div role={accordion ? 'tablist' : null} className={className}>
                <Provider accordionStore={this.accordionStore}>
                    <div>{children}</div>
                </Provider>
            </div>
        );
    }
}

export default Accordion;
