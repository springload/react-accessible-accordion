// tslint:disable:max-classes-per-file

import * as React from 'react';
import * as propTypes from '../helpers/propTypes';

export type UUID = string | number;

export type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
};

export type ItemContainer = {
    uuid: UUID;
};

const Context = React.createContext(null as ItemContainer | null);

export const Provider = ({ uuid, children }: ProviderProps): JSX.Element => (
    <Context.Provider value={{ uuid }}>{children || null}</Context.Provider>
);

type ConsumerProps = {
    children(container: ItemContainer): React.ReactNode;
};

export class Consumer extends React.PureComponent<ConsumerProps> {
    renderChildren = (container: ItemContainer): React.ReactNode => {
        return container ? this.props.children(container) : null;
    };

    render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
