// @flow

import { type ReactWrapper } from 'enzyme';
import { Container } from 'unstated';

const spy = jest.spyOn(Container.prototype, 'setState');

export function setStateComplete(wrapper: ReactWrapper) {
    return Promise.all(spy.mock.results).then(() => wrapper.update());
}
