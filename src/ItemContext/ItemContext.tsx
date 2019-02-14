// tslint:disable:max-classes-per-file

import * as React from 'react';

export type UUID = string | number;

export type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
};

export type ItemContext = {
    uuid: UUID;
};

const Context = React.createContext(null as ItemContext | null);

export const Provider = ({ uuid, children }: ProviderProps): JSX.Element => (
    <Context.Provider value={{ uuid }}>{children || null}</Context.Provider>
);

type ConsumerProps = {
    children(container: ItemContext): React.ReactNode;
};

export class Consumer extends React.PureComponent<ConsumerProps> {
    renderChildren = (container: ItemContext): React.ReactNode => {
        return container ? this.props.children(container) : null;
    };

    render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
