// @flow

import React from 'react';
import { mount } from 'enzyme';
import { Provider, Consumer } from './ItemContainer';

describe('ItemContainer', () => {
    let mock;
    beforeEach(() => {
        mock = jest.fn(() => null);
    });

    it('Propagates uuid by context', () => {
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
});
