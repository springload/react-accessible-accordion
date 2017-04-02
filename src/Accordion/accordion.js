import React, { Component, PropTypes } from 'react';

const defaultProps = {
    activeItems: [],
    accordion: true,
    onChange: () => {},
    className: 'accordion',
};

const propTypes = {
    accordion: PropTypes.bool,
    activeItems: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItems: props.activeItems,
            accordion: true,
        };
        this.renderItems = this.renderItems.bind(this);
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

        if (this.props.onChange) {
            this.props.onChange(this.props.accordion ? activeItems[0] : activeItems);
        }
    }

    renderItems() {
        const { accordion, children } = this.props;
        if (!children) {
            return null;
        }

        return React.Children.map(children, (item, index) => {
            const key = index;
            const expanded = (this.state.activeItems.indexOf(key) !== -1) && (!item.props.disabled);

            return React.cloneElement(item, {
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
