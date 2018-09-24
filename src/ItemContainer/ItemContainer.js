// @flow
import { Component, type Node } from 'react';
import consecutive from 'consecutive';

type UUID = string | number;

export type ProviderProps = {
    children: Node,
    uuid?: UUID,
};

export type ProviderState = {
    uuid: UUID,
};

export type ItemContainer = {
    uuid: UUID,
    setUuid: UUID => void,
};

let nextUuid = consecutive();
export function resetNextUuid() {
    nextUuid = consecutive();
}

// Arbitrary, but ought to be unique to avoid context namespace clashes.
const CONTEXT_KEY = 'react-accessible-accordion@ItemContainer';

export class Provider extends Component<ProviderProps, ProviderState> {
    static defaultProps = {
        uuid: nextUuid(),
    };

    static childContextTypes = {
        // Empty anonymous callback is a hacky 'wildcard' workaround for bypassing prop-types.
        [CONTEXT_KEY]: () => null,
    };

    getChildContext() {
        const { uuid } = this.state;
        const { setUuid } = this;
        const context: ItemContainer = {
            uuid,
            setUuid,
        };

        return {
            [CONTEXT_KEY]: context,
        };
    }

    state = {
        uuid: this.props.uuid !== undefined ? this.props.uuid : nextUuid(),
    };

    setUuid(uuid: UUID) {
        return this.setState({
            uuid,
        });
    }

    render() {
        return this.props.children;
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
