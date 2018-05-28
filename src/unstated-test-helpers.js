// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, type ReactWrapper } from 'enzyme';
import { type Node } from 'react';
import { Container } from 'unstated';

const spy = jest.spyOn(Container.prototype, 'setState');

/*
 * Keeps a ledger of *all* calls to unstated's `setState` method, and resolves when they all do.
 */
export async function setStateComplete(wrapper: ReactWrapper) {
    // $FlowFixMe
    await Promise.all(spy.mock.results);

    wrapper.update();
}

/*
 * To be used instead of 'mount'. Waits until all `setState` calls have resolved before returning the node.
 */
export async function mountComplete(node: Node) {
    const mounted = mount(node);

    await setStateComplete(mounted);

    return mounted;
}

