// tslint:disable:max-classes-per-file

import * as React from 'react';
import AccordionStore from '../AccordionStore/AccordionStore';
import { UUID } from '../ItemContext/ItemContext';

export interface ProviderProps {
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    onChange?(args: UUID[]): void;
}

type ProviderState = AccordionStore;

export interface AccordionContext {
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    setExpanded(uuid: UUID, expanded: boolean): void;
    isItemDisabled(uuid: UUID): boolean;
    isItemExpanded(uuid: UUID): boolean;
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
        expanded: this.props.preExpanded,
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded,
    });

    setExpanded = (key: UUID, expanded: boolean): void => {
        this.setState(
            (state: Readonly<ProviderState>) =>
                state.setExpanded(key, expanded),
            () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.expanded);
                }
            },
        );
    };

    isItemDisabled = (key: UUID): boolean => {
        return this.state.isItemDisabled(key);
    };

    isItemExpanded = (key: UUID): boolean => {
        return this.state.isItemExpanded(key);
    };

    render(): JSX.Element {
        const { allowZeroExpanded, allowMultipleExpanded } = this.state;

        return (
            <Context.Provider
                value={{
                    allowMultipleExpanded,
                    allowZeroExpanded,
                    setExpanded: this.setExpanded,
                    isItemDisabled: this.isItemDisabled,
                    isItemExpanded: this.isItemExpanded,
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
