// @flow

import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import { Provider, Consumer, resetNextUuid } from './ItemContainer';

describe('ItemContainer', () => {
    let mock;
    beforeEach(() => {
        mock = jest.fn(() => null);
    });

    it('can initialize uuid by prop', () => {
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

    it('generated uuids are different', () => {
        mount(
            <Fragment>
                <Provider>
                    <Consumer>{mock}</Consumer>
                </Provider>
                <Provider>
                    <Consumer>{mock}</Consumer>
                </Provider>
            </Fragment>,
        );
        const { calls } = mock.mock;
        expect(calls[0][0]).toBeDefined();
        expect(calls[1][0]).toBeDefined();
        expect(calls[0][0]).not.toEqual(calls[1][0]);
    });

    it('reset uuids works', () => {
        const doMount = () =>
            mount(
                <Provider>
                    <Consumer>{mock}</Consumer>
                </Provider>,
            );

        resetNextUuid();
        doMount();
        resetNextUuid();
        doMount();

        const { calls } = mock.mock;
        expect(calls[0][0]).toBeDefined();
        expect(calls[1][0]).toBeDefined();
        expect(calls[0][0]).toEqual(calls[1][0]);
    });
});
