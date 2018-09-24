// @flow

import { Component, type Node } from 'react';

export type Item = {
    uuid: string | number,
    expanded: boolean,
    disabled: boolean,
};

export type ProviderState = {
    items: Array<Item>,
    onChange: Function,
};

export type ProviderProps = {
    accordion: boolean,
    onChange?: Function,
    children: Node,
    items?: Array<Item>,
};

export type AccordionContainer = {
    accordion: boolean,
    onChange: Function,
    items: Array<Item>,
    addItem: Item => void,
    removeItem: (string | number) => void,
    setExpanded: (key: string | number, expanded: boolean) => void,
};

export type ConsumerProps = {
    children: ($Shape<AccordionContainer>) => Node,
};

// Arbitrary, but ought to be unique to avoid context namespace clashes.
const CONTEXT_KEY = 'react-accessible-accordion@AccordionContainer';

export class Provider extends Component<ProviderProps, ProviderState> {
    static childContextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    static defaultProps = {
        items: [],
        onChange: () => {},
    };

    state = {
        items: this.props.items || [],
        accordion: true,
        onChange: this.props.onChange || (() => {}),
    };

    getChildContext() {
        const { addItem, removeItem, setExpanded, state } = this;

        const context: AccordionContainer = {
            ...state,
            addItem,
            removeItem,
            setExpanded,
            accordion: this.props.accordion,
            onChange: this.props.onChange,
        };

        return {
            [CONTEXT_KEY]: context,
        };
    }

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
            if (this.props.accordion && newItem.expanded) {
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
        this.setState(
            state => ({
                items: state.items.map(item => {
                    if (item.uuid === key) {
                        return {
                            ...item,
                            expanded,
                        };
                    }
                    if (this.props.accordion && expanded) {
                        // If this is an accordion, we might need to collapse the other expanded item.
                        return {
                            ...item,
                            expanded: false,
                        };
                    }
                    return item;
                }),
            }),
            () => {
                if (this.state.accordion) {
                    this.state.onChange(key);
                } else {
                    this.state.onChange(
                        this.state.items
                            .filter(item => item.expanded)
                            .map(item => item.uuid),
                    );
                }
            },
        );

    render() {
        return this.props.children;
    }
}

// eslint-disable-next-line react/no-multi-comp
export class Consumer extends Component<ConsumerProps> {
    static contextTypes = {
        [CONTEXT_KEY]: () => null,
    };

    render() {
        return this.props.children(this.context[CONTEXT_KEY]);
    }
}
