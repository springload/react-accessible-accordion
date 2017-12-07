// @flow

import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import type { Node } from 'react';
import { isArraysEqualShallow } from '../utils';

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

    state = {
        activeItems: this.preExpandedItems(),
        accordion: true,
    };

    accordionStore = observable({
        activeItems: [],
        setActiveItems((foo) => this.activeItems = foo),
    })

    componentWillReceiveProps(nextProps: AccordionProps) {
        if (!isArraysEqualShallow(nextProps.activeItems, this.state.activeItems)) {
            let newActiveItems;
            if (nextProps.accordion) {
                newActiveItems = nextProps.activeItems.length
                    ? [nextProps.activeItems[0]]
                    : [];
            } else {
                newActiveItems = nextProps.activeItems.slice();
            }
            this.setState({
                activeItems: newActiveItems,
            });

            nextProps.onChange(nextProps.accordion ? newActiveItems[0] : newActiveItems);
        }
    }

    preExpandedItems() {
        let activeItems = [];
        React.Children.map(this.props.children, (item, index) => {
            if (item.props.expanded) {
                if (this.props.accordion) {
                    if (activeItems.length === 0) activeItems.push(item.props.customKey || index);
                } else {
                    activeItems.push(item.props.customKey || index);
                }
            }
        });
        if (activeItems.length === 0 && this.props.activeItems.length !== 0) {
            activeItems = this.props.accordion ? [this.props.activeItems[0]] : this.props.activeItems.slice();
        }
        return activeItems;
    }

    handleClick(key: number | string) {
        let activeItems = this.state.activeItems;
        if (this.props.accordion) {
            activeItems = activeItems[0] === key ? [] : [key];
        } else {
            activeItems = [...activeItems];
            const index = activeItems.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                // remove active state
                activeItems.splice(index, 1);
            } else {
                activeItems.push(key);
            }
        }
        this.setState({
            activeItems,
        });

        this.props.onChange(this.props.accordion ? activeItems[0] : activeItems);
    }

    render() {
        const { className, accordion } = this.props;
        return (
            <div role={accordion ? 'tablist' : null} className={className}>
                <Provider accordionStore={this.accordionStore}>
                    {this.props.children}
                </Provider>
            </div>
        );
    }
}

export default Accordion;
