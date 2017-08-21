import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isArraysEqual } from '../utils';

const defaultProps = {
    accordion: true,
    onChange: () => {},
    className: 'accordion',
    activeItems: [],
};

const propTypes = {
    accordion: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.object,
    ]).isRequired,
    activeItems: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

class Accordion extends Component {
    constructor(props) {
        super(props);
        const activeItems = this.preExpandedItems();
        this.state = {
            activeItems: activeItems,
            accordion: true,
        };
        this.renderItems = this.renderItems.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isArraysEqual(nextProps.activeItems, this.state.activeItems)) {
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

    handleClick(key) {
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
            activeItems: activeItems,
        });

        this.props.onChange(this.props.accordion ? activeItems[0] : activeItems);
    }

    renderItems() {
        const { accordion, children } = this.props;

        return React.Children.map(children, (item, index) => {
            const key = item.props.customKey || index;
            const expanded = (this.state.activeItems.indexOf(key) !== -1) && (!item.props.disabled);

            return React.cloneElement(item, {
                disabled: item.props.disabled,
                accordion: accordion,
                expanded: expanded,
                key: `accordion__item-${key}`,
                onClick: this.handleClick.bind(this, key),
            });
        });
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.renderItems()}
            </div>
        );
    }

}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
