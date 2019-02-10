// tslint:disable:max-classes-per-file

import * as React from 'react';
import { UUID } from '../ItemContainer/ItemContainer';

export type Item = {
    uuid: UUID;
    expanded: boolean;
};

interface ProviderProps {
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    initialItems?: Item[];
    onChange?(args: UUID[]): void;
}

interface ProviderState {
    items: Item[];
}

export interface AccordionContainer {
    items: Item[];
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    addItem(item: Item): void;
    removeItem(uuid: UUID): void;
    setExpanded(uuid: UUID, expanded: boolean): void;
    isItemDisabled(uuid: UUID): boolean;
}

const Context = React.createContext(null as AccordionContainer | null);

export class Provider extends React.PureComponent<
    ProviderProps,
    ProviderState
> {
    static defaultProps: ProviderProps = {
        allowMultipleExpanded: false,
        allowZeroExpanded: false,
    };

    state: ProviderState = {
        items: this.props.initialItems || [],
    };

    addItem = (newItem: Item): void => {
        // Need to use callback style otherwise race-conditions are created by concurrent registrations.
        this.setState((state: AccordionContainer) => {
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
        this.setState((state: AccordionContainer) => ({
            items: state.items.filter((item: Item) => item.uuid !== key),
        }));
    };

    setExpanded = (key: UUID, expanded: boolean): void => {
        if (this.isItemDisabled(key)) {
            return;
        }
        this.setState(
            (state: AccordionContainer) => ({
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

    /*
     * From the spec:
     *
     * “If the accordion panel associated with an accordion header is visible,
     * and if the accordion does not permit the panel to be collapsed, the
     * header button element has aria-disabled set to true.”
     */
    isItemDisabled = (key: UUID): boolean => {
        const item = this.state.items.find(
            ({ uuid }: Item): boolean => uuid === key,
        );
        const expandedItems = this.state.items.filter(
            ({ expanded }: Item) => expanded,
        );

        return (
            item.expanded &&
            !this.props.allowZeroExpanded &&
            expandedItems.length === 1
        );
    };

    render(): JSX.Element {
        const { items } = this.state;
        const { allowMultipleExpanded, allowZeroExpanded } = this.props;

        return (
            <Context.Provider
                value={{
                    items,
                    allowMultipleExpanded,
                    allowZeroExpanded,
                    addItem: this.addItem,
                    removeItem: this.removeItem,
                    setExpanded: this.setExpanded,
                    isItemDisabled: this.isItemDisabled,
                }}
            >
                {this.props.children || null}
            </Context.Provider>
        );
    }
}

export class Consumer extends React.PureComponent<{
    children(container: AccordionContainer): React.ReactNode;
}> {
    renderChildren = (
        container: AccordionContainer | null,
    ): React.ReactNode => {
        return container ? this.props.children(container) : null;
    };

    render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
