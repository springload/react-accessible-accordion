// tslint:disable:max-classes-per-file

import * as React from 'react';
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
    accordion?: boolean;
    children?: React.ReactNode;
    items?: Item[];
    onChange?(args: UUID | UUID[]): void;
};

export type AccordionContainer = {
    accordion: boolean;
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
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    state: ProviderState = {
        items: this.props.items || [],
    };

    getChildContext(): { [CONTEXT_KEY]: AccordionContainer } {
        const context: AccordionContainer = {
            items: this.state.items,
            accordion: !!this.props.accordion,
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
        this.setState(state => {
            let items: Item[];

            if (state.items.some(item => item.uuid === newItem.uuid)) {
                // tslint:disable-next-line:no-console
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

    removeItem = (key: UUID): void => {
        this.setState(state => ({
            items: state.items.filter(item => item.uuid !== key),
        }));
    };

    setExpanded = (key: UUID, expanded: boolean): void => {
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
                if (this.props.onChange) {
                    this.props.onChange(
                        this.props.accordion
                            ? key
                            : this.state.items
                                  .filter(item => item.expanded)
                                  .map(item => item.uuid),
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
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
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
