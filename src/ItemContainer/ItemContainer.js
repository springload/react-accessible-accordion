// @flow
import { Component, type Node } from 'react';

export type UUID = string | number;

export type ProviderProps = {
    children?: ?Node,
    uuid: UUID,
};

export type ItemContainer = {
    uuid: UUID,
};

// Arbitrary, but ought to be unique to avoid context namespace clashes.
const CONTEXT_KEY = 'react-accessible-accordion@ItemContainer';

export class Provider extends Component<ProviderProps> {
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
    children: ($Shape<ItemContainer>) => Node,
};

// eslint-disable-next-line react/no-multi-comp
export class Consumer extends Component<ConsumerProps> {
    static contextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    render() {
        return this.props.children(this.context[CONTEXT_KEY]);
    }
}
