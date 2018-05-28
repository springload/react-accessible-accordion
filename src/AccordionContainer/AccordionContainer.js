// @flow

import { Container } from 'unstated';

export type Item = {
    uuid: string | number,
    expanded: boolean,
    disabled: boolean,
};
export type StoreState = {
    items: Array<Item>,
    accordion: boolean,
    onChange: Function,
};

class AccordionContainer extends Container<StoreState> {
    constructor(args: $Shape<StoreState> = {}) {
        super();
        this.state = {
            items: [],
            accordion: true,
            onChange: () => {},
            ...args,
        };
    }

    setAccordion(accordion: boolean) {
        if (accordion !== this.state.accordion) {
            this.setState({ accordion });
        }
    }

    setOnChange(onChange: Function) {
        if (onChange !== this.state.onChange) {
            this.setState({ onChange });
        }
    }

    addItem(newItem: Item) {
        let items;
        if (this.state.accordion && newItem.expanded) {
            // If this is a true accordion and the new item is expanded, then the others must be closed.
            items = [
                ...this.state.items.map(item => ({ ...item, expanded: false })),
                newItem,
            ];
        } else {
            items = [...this.state.items, newItem];
        }
        this.setState({
            items,
        });
    }

    removeItem(key: string | number) {
        this.setState({
            items: this.state.items.filter(item => item.uuid !== key),
        });
    }

    setExpanded(key: string | number, expanded: boolean) {
        this.setState({
            items: this.state.items.map(item => {
                if (item.uuid === key) {
                    return {
                        ...item,
                        expanded,
                    };
                } else if (this.state.accordion && expanded) {
                    // If this is an accordion, we might need to collapse the other expanded item.
                    return {
                        ...item,
                        expanded: false,
                    };
                }
                return item;
            }),
        });
    }
}

export default AccordionContainer;
