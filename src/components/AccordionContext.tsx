// tslint:disable:max-classes-per-file

import * as React from 'react';
import AccordionStore, {
    InjectedButtonAttributes,
    InjectedHeadingAttributes,
    InjectedPanelAttributes,
} from '../helpers/AccordionStore';
import { UUID } from './ItemContext';

export interface ProviderProps {
    preExpanded?: UUID[];
    expanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    onChange?(args: UUID[]): void;
}

type ProviderState = AccordionStore;

export interface AccordionContext {
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    toggleExpanded(uuid: UUID): void;
    isItemDisabled(uuid: UUID): boolean;
    isItemExpanded(uuid: UUID): boolean;
    getPanelAttributes(uuid: UUID): InjectedPanelAttributes;
    getHeadingAttributes(uuid: UUID): InjectedHeadingAttributes;
    getButtonAttributes(uuid: UUID): InjectedButtonAttributes;
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
        expanded:
            'expanded' in this.props
                ? this.props.expanded
                : this.props.preExpanded,
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded,
    });

    static getDerivedStateFromProps(
        nextProps: ProviderProps,
        state: ProviderState,
    ): AccordionStore | undefined {
        if ('expanded' in nextProps) {
            return state.updateExpanded(nextProps.expanded);
        }
    }

    toggleExpanded = (key: UUID): void => {
        if ('expanded' in this.props) {
            if (this.props.onChange) {
                this.props.onChange(this.state.toggleExpanded(key).expanded);
            }
        } else {
            this.setState(
                (state: Readonly<ProviderState>) => state.toggleExpanded(key),
                () => {
                    if (this.props.onChange) {
                        this.props.onChange(this.state.expanded);
                    }
                },
            );
        }
    };

    isItemDisabled = (key: UUID): boolean => {
        return this.state.isItemDisabled(key);
    };

    isItemExpanded = (key: UUID): boolean => {
        return this.state.isItemExpanded(key);
    };

    getPanelAttributes = (key: UUID): InjectedPanelAttributes => {
        return this.state.getPanelAttributes(key);
    };

    getHeadingAttributes = (key: UUID): InjectedHeadingAttributes => {
        return this.state.getHeadingAttributes(key);
    };

    getButtonAttributes = (key: UUID): InjectedButtonAttributes => {
        return this.state.getButtonAttributes(key);
    };

    render(): JSX.Element {
        const { allowZeroExpanded, allowMultipleExpanded } = this.state;

        return (
            <Context.Provider
                value={{
                    allowMultipleExpanded,
                    allowZeroExpanded,
                    toggleExpanded: this.toggleExpanded,
                    isItemDisabled: this.isItemDisabled,
                    isItemExpanded: this.isItemExpanded,
                    getPanelAttributes: this.getPanelAttributes,
                    getHeadingAttributes: this.getHeadingAttributes,
                    getButtonAttributes: this.getButtonAttributes,
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
