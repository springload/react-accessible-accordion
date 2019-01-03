// tslint:disable:max-classes-per-file

import * as React from 'react';

export type UUID = string | number;

export type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
};

export type ItemContainer = {
    uuid: UUID;
};

// Arbitrary, but ought to be unique to avoid context namespace clashes.
export const CONTEXT_KEY = 'react-accessible-accordion@ItemContainer';

export class Provider extends React.Component<ProviderProps> {
    static childContextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    getChildContext() {
        const { uuid } = this.props;
        const context: ItemContainer = {
            uuid,
        };

        return {
            [CONTEXT_KEY]: context,
        };
    }

    render() {
        return this.props.children || null;
    }
}

type ConsumerProps = {
    children(container: ItemContainer): React.ReactNode;
};

export class Consumer extends React.Component<ConsumerProps> {
    static contextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    render() {
        return this.props.children(this.context[CONTEXT_KEY]);
    }
}

export const getItemStore = (context): ItemContainer | undefined => {
    return context[CONTEXT_KEY];
};
