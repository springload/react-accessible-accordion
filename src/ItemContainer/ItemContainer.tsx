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
    static childContextTypes: { [CONTEXT_KEY](): null } = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    getChildContext(): { [CONTEXT_KEY]: ItemContainer } {
        const { uuid } = this.props;
        const context: ItemContainer = {
            uuid,
        };

        return {
            [CONTEXT_KEY]: context,
        };
    }

    render(): React.ReactNode {
        return this.props.children || null;
    }
}

type ConsumerProps = {
    children(container: ItemContainer): React.ReactNode;
};

type ConsumerState = {};

type ConsumerContext = {
    [CONTEXT_KEY](): null;
};

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
        [CONTEXT_KEY]: ItemContainer;
    };

    render(): React.ReactNode {
        return this.props.children(this.context[CONTEXT_KEY]);
    }
}

export const getItemStore = <T extends { [CONTEXT_KEY]: ItemContainer }>(
    context: T,
): ItemContainer | undefined => {
    return context[CONTEXT_KEY];
};
