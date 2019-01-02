import { mount } from 'enzyme';
import * as React from 'react';
import {
    Consumer,
    contextTypes,
    getItemStore,
    Provider,
} from './ItemContainer';

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

    it('renders Provider without children', () => {
        expect(() => mount(<Provider uuid="foo" />)).not.toThrow();
    });

    it('fetches context with getItemStore', () => {
        expect.assertions(1);

        const Test = (props, context) => {
            const accordionStore = getItemStore(context);
            expect(accordionStore).toBeDefined();
            return null;
        };
        Test.contextTypes = contextTypes;

        mount(
            <Provider uuid="uuid">
                <Test />
            </Provider>,
        );
    });
});
