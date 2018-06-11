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

    setAccordion = (accordion: boolean) => {
        if (accordion !== this.state.accordion) {
            return this.setState({ accordion });
        }
        return null;
    };

    setOnChange = (onChange: Function) => {
        if (onChange !== this.state.onChange) {
            return this.setState({ onChange });
        }
        return null;
    };

    addItem = (newItem: Item) => {
        // Need to use callback style otherwise race-conditions are created by concurrent registrations.
        this.setState(state => {
            let items;

            if (state.items.some(item => item.uuid === newItem.uuid)) {
                // eslint-disable-next-line no-console
                console.error(
                    `AccordionItem error: One item already has the uuid "${
                        newItem.uuid
                    }". Uuid property must be unique. See: https://github.com/springload/react-accessible-accordion#accordionitem`,
                );
            }
            if (state.accordion && newItem.expanded) {
                // If this is a true accordion and the new item is expanded, then the others must be closed.
                items = [
                    ...state.items.map(item => ({
                        ...item,
                        expanded: false,
                    })),
                    newItem,
                ];
            } else {
                items = [...state.items, newItem];
            }
            return {
                items,
            };
        });
    };

    removeItem = (key: string | number) =>
        this.setState(state => ({
            items: state.items.filter(item => item.uuid !== key),
        }));

    setExpanded = (key: string | number, expanded: boolean) =>
        this.setState(state => ({
            items: state.items.map(item => {
                if (item.uuid === key) {
                    return {
                        ...item,
                        expanded,
                    };
                } else if (state.accordion && expanded) {
                    // If this is an accordion, we might need to collapse the other expanded item.
                    return {
                        ...item,
                        expanded: false,
                    };
                }
                return item;
            }),
        })).then(() => {
            if (this.state.accordion) {
                this.state.onChange(key);
            } else {
                this.state.onChange(
                    this.state.items
                        .filter(item => item.expanded)
                        .map(item => item.uuid),
                );
            }
        });
}

export default AccordionContainer;
