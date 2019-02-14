// tslint:disable:max-classes-per-file

import * as React from 'react';
import AccordionStore, { Item } from '../AccordionStore/AccordionStore';
import { UUID } from '../ItemContext/ItemContext';

export interface ProviderProps {
    initialItems?: Item[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    onChange?(args: UUID[]): void;
}

type ProviderState = AccordionStore;

export interface AccordionContext {
    items: Item[];
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    addItem(item: Item): void;
    removeItem(uuid: UUID): void;
    setExpanded(uuid: UUID, expanded: boolean): void;
    isItemDisabled(uuid: UUID): boolean;
}

const Context = React.createContext(null as AccordionContext | null);

export class Provider extends React.PureComponent<
    ProviderProps,
    ProviderState
> {
    static defaultProps: ProviderProps = {
        allowMultipleExpanded: false,
        allowZeroExpanded: false,
    };

    state: ProviderState = new AccordionStore({
        items: this.props.initialItems,
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded,
    });

    addItem = (item: Item): void => {
        this.setState(
            (state: ProviderState): ProviderState => state.addItem(item),
        );
    };

    removeItem = (key: UUID): void => {
        this.setState((state: ProviderState) => state.removeItem(key));
    };

    setExpanded = (key: UUID, expanded: boolean): void => {
        this.setState(
            (state: ProviderState) => state.setExpanded(key, expanded),
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

    isItemDisabled = (key: UUID): boolean => {
        return this.state.isItemDisabled(key);
    };

    render(): JSX.Element {
        const { items, allowZeroExpanded, allowMultipleExpanded } = this.state;

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
    children(container: AccordionContext): React.ReactNode;
}> {
    renderChildren = (container: AccordionContext | null): React.ReactNode => {
        return container ? this.props.children(container) : null;
    };

    render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
