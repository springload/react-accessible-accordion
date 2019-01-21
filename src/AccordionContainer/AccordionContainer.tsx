// tslint:disable:max-classes-per-file

import * as React from 'react';
import * as propTypes from '../helpers/propTypes';
import { UUID } from '../ItemContainer/ItemContainer';

// Arbitrary, but ought to be unique to avoid context namespace clashes.
export const CONTEXT_KEY = 'react-accessible-accordion@AccordionContainer';

export type Item = {
    uuid: UUID;
    expanded: boolean;
    disabled: boolean;
};

export type ProviderState = {
    items: Item[];
};

export type ProviderProps = {
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    items?: Item[];
    onChange?(args: UUID[]): void;
};

export type AccordionContainer = {
    allowMultipleExpanded: boolean;
    allowZeroExpanded?: boolean;
    items: Item[];
    addItem(item: Item): void;
    removeItem(uuid: UUID): void;
    setExpanded(uuid: UUID, expanded: boolean): void;
};

export type ConsumerProps = {
    children(
        container: { [P in keyof AccordionContainer]?: AccordionContainer[P] },
    ): React.ReactNode;
};

type ConsumerState = {};

type ConsumerContext = {
    [CONTEXT_KEY](): null;
};

export class Provider extends React.Component<ProviderProps, ProviderState> {
    static childContextTypes: { [CONTEXT_KEY](): null } = {
        [CONTEXT_KEY]: propTypes.wildcard,
    };

    state: ProviderState = {
        items: this.props.items || [],
    };

    getChildContext(): { [CONTEXT_KEY]: AccordionContainer } {
        const context: AccordionContainer = {
            items: this.state.items,
            allowMultipleExpanded: !!this.props.allowMultipleExpanded,
            allowZeroExpanded: !!this.props.allowZeroExpanded,
            addItem: this.addItem,
            removeItem: this.removeItem,
            setExpanded: this.setExpanded,
        };

        return {
            [CONTEXT_KEY]: context,
        };
    }

    addItem = (newItem: Item): void => {
        // Need to use callback style otherwise race-conditions are created by concurrent registrations.
        this.setState((state: ProviderState) => {
            let items: Item[];

            if (state.items.some((item: Item) => item.uuid === newItem.uuid)) {
                // tslint:disable-next-line:no-console
                console.error(
                    `AccordionItem error: One item already has the uuid "${
                        newItem.uuid
                    }". Uuid property must be unique. See: https://github.com/springload/react-accessible-accordion#accordionitem`,
                );
            }
            if (!this.props.allowMultipleExpanded && newItem.expanded) {
                items = [
                    ...state.items.map((item: Item) => ({
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

    removeItem = (key: UUID): void => {
        this.setState((state: ProviderState) => ({
            items: state.items.filter((item: Item) => item.uuid !== key),
        }));
    };

    setExpanded = (key: UUID, expanded: boolean): void => {
        if (
            !expanded &&
            !this.props.allowZeroExpanded &&
            this.state.items.filter((item: Item) => item.expanded).length === 1
        ) {
            // If this is an accordion that doesn't allow all items to be closed and the current item is the only one open, don't allow it to close.
            return;
        }
        this.setState(
            (state: ProviderState) => ({
                items: state.items.map((item: Item) => {
                    if (item.uuid === key) {
                        return {
                            ...item,
                            expanded,
                        };
                    }
                    if (!this.props.allowMultipleExpanded && expanded) {
                        // If this is an accordion that doesn't allow multiple expansions, we might need to collapse the other expanded item.
                        return {
                            ...item,
                            expanded: false,
                        };
                    }

                    return item;
                }),
            }),
            () => {
                if (this.props.onChange) {
                    this.props.onChange(
                        this.state.items
                            .filter((item: Item) => item.expanded)
                            .map((item: Item) => item.uuid),
                    );
                }
            },
        );
    };

    render(): React.ReactNode {
        return this.props.children || null;
    }
}

export class Consumer extends React.Component<
    ConsumerProps,
    ConsumerState,
    ConsumerContext
> {
    static contextTypes: ConsumerContext = {
        [CONTEXT_KEY]: propTypes.wildcard,
    };

    context: {
        [CONTEXT_KEY]: AccordionContainer;
    };

    render(): React.ReactNode {
        return this.props.children(this.context[CONTEXT_KEY]);
    }
}

export const getAccordionStore = <
    T extends { [CONTEXT_KEY]: AccordionContainer }
>(
    context: T,
): AccordionContainer | undefined => context[CONTEXT_KEY];
