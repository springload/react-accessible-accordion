import { mount } from 'enzyme';
import * as React from 'react';
import { Consumer, ItemContainer, Provider } from './ItemContainer';

describe('ItemContainer', () => {
    it('Propagates uuid by context', () => {
        const mock = jest.fn(() => null);
        const uuid = 'foo';

        mount(
            <Provider uuid={uuid}>
                <Consumer>{mock}</Consumer>
            </Provider>,
        ).instance();

        expect(mock).toHaveBeenCalledWith(
            expect.objectContaining({
                uuid,
            }),
        );
    });

    it('renders Provider without children', () => {
        expect(() => mount(<Provider uuid="foo" />)).not.toThrow();
    });
});
