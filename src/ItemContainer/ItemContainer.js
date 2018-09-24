// @flow
import { Component, type Node } from 'react';
import consecutive from 'consecutive';

type UUID = string | number;

export type ProviderProps = {
    children?: ?Node,
    uuid?: UUID,
};

export type ItemContainer = {
    uuid: UUID,
};

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

// Arbitrary, but ought to be unique to avoid context namespace clashes.
const CONTEXT_KEY = 'react-accessible-accordion@ItemContainer';

export class Provider extends Component<ProviderProps> {
    static childContextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    // uuid = nextUuid();

    getChildContext() {
        const context: ItemContainer = {
            uuid: this.props.uuid !== undefined ? this.props.uuid : nextUuid(),
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
